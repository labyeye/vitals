const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, isCustomer } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const Loyalty = require('../models/Loyalty'); // Added Loyalty model
const {getLoyaltyPoints, checkTierUpgrade} = require('../controller/loyaltyController');
const getLoyaltyDetails = async (userId) => {
  const loyalty = await Loyalty.findOne({ user: userId });
  if (!loyalty) return null;

  return {
    points: loyalty.points,
    tier: loyalty.tier,
    nextTierPoints: loyalty.nextTierPoints,
    progressToNextTier: loyalty.tier === 'gold' ? 100 : 
      Math.min(100, Math.floor((loyalty.points / loyalty.nextTierPoints) * 100))
  };
};
const router = express.Router();

// Apply customer protection to all routes
router.use(protect, isCustomer);

router.get('/loyalty', async (req, res) => {
  try {
    const loyaltyDetails = await getLoyaltyDetails(req.user._id);
    
    if (!loyaltyDetails) {
      return res.status(404).json({
        success: false,
        message: 'Loyalty account not found'
      });
    }

    res.status(200).json({
      success: true,
      data: loyaltyDetails
    });
  } catch (error) {
    console.error('Get loyalty details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching loyalty details'
    });
  }
});
router.get('/dashboard', async (req, res) => {
  try {
    // Get order statistics
    const orderStats = await Order.aggregate([
      { $match: { customer: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0]
            }
          },
          delivered: {
            $sum: {
              $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0]
            }
          },
          cancelled: {
            $sum: {
              $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Get total spent
    const totalSpent = await Order.aggregate([
      { $match: { customer: req.user._id, status: 'delivered' } },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Get loyalty details
    const loyaltyDetails = await getLoyaltyDetails(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        orderStats: orderStats[0] || { total: 0, pending: 0, delivered: 0, cancelled: 0 },
        totalSpent: totalSpent[0]?.total || 0,
        loyalty: loyaltyDetails
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
});
// @desc    Get customer profile
// @route   GET /api/customer/profile
// @access  Customer only
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// @desc    Update customer profile
// @route   PUT /api/customer/profile
// @access  Customer only
router.put('/profile', [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, phone, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// @desc    Get customer orders
// @route   GET /api/customer/orders
// @access  Customer only
router.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = { customer: req.user._id };
    
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders'
    });
  }
});

// @desc    Get customer order by ID
// @route   GET /api/customer/orders/:id
// @access  Customer only
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    }).populate('items.product', 'name price images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order'
    });
  }
});

// @desc    Cancel customer order
// @route   PUT /api/customer/orders/:id/cancel
// @access  Customer only
router.put('/orders/:id/cancel', [
  body('reason')
    .optional()
    .isString()
    .withMessage('Reason must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { reason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'confirmed'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Update order status
    order.status = 'cancelled';
    order.cancelledAt = new Date();
    order.cancelledBy = req.user._id;
    order.cancellationReason = reason || 'Cancelled by customer';
    
    // Add timeline entry
    order.timeline.push({
      status: 'cancelled',
      message: reason || 'Cancelled by customer',
      updatedBy: req.user._id
    });

    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'stock.quantity': item.quantity }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling order'
    });
  }
});

// @desc    Update order status (for delivery confirmation)
// @route   PUT /api/customer/orders/:id/status
// @access  Customer only
router.put('/orders/:id/status', [
  body('status')
    .isIn(['delivered'])
    .withMessage('Status can only be updated to delivered'),
  body('deliveryConfirmation')
    .isBoolean()
    .withMessage('Delivery confirmation is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, deliveryConfirmation } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow status update to delivered
    if (status === 'delivered' && deliveryConfirmation) {
      // Update order status
      order.status = 'delivered';
      order.deliveredAt = new Date();
      
      // Add timeline entry
      order.timeline.push({
        status: 'delivered',
        message: 'Order delivered and confirmed by customer',
        updatedBy: req.user._id
      });

      await order.save();

      // Add bonus loyalty points for delivery confirmation
      const loyalty = await Loyalty.findOne({ user: req.user._id });
      if (loyalty && order.payment.status === 'paid') {
        const bonusPoints = Math.floor(order.total / 50); // 2 points per ₹100 for delivery bonus
        loyalty.points += bonusPoints;
        loyalty.lifetimePoints += bonusPoints;
        
        loyalty.history.push({
          type: 'earned',
          points: bonusPoints,
          order: order._id,
          description: `Earned ${bonusPoints} bonus points for delivery confirmation of order #${order.orderNumber}`
        });

        // Check for tier upgrade
        const { newTier, nextTierPoints } = loyalty.checkTierUpgrade();
        if (newTier !== loyalty.tier) {
          loyalty.history.push({
            type: 'tier_upgrade',
            points: 0,
            description: `Upgraded from ${loyalty.tier} to ${newTier} tier`
          });
          loyalty.tier = newTier;
          loyalty.nextTierPoints = nextTierPoints;
        }

        await loyalty.save();

        // Update user document
        await User.findByIdAndUpdate(req.user._id, {
          loyaltyPoints: loyalty.points,
          loyaltyTier: loyalty.tier,
          $push: {
            loyaltyHistory: {
              date: new Date(),
              action: 'delivery_bonus',
              points: bonusPoints,
              order: order._id
            }
          }
        });

        return res.status(200).json({
          success: true,
          message: 'Order status updated successfully',
          data: {
            order,
            bonusPointsEarned: bonusPoints,
            newLoyaltyPoints: loyalty.points,
            newTier: loyalty.tier
          }
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        data: order
      });
    }

    res.status(400).json({
      success: false,
      message: 'Invalid status update'
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
});

// @desc    Get customer order details with loyalty info
// @route   GET /api/customer/orders/:id/details
// @access  Customer only
router.get('/orders/:id/details', async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      customer: req.user._id
    }).populate('items.product', 'name price images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get loyalty information
    const loyalty = await Loyalty.findOne({ user: req.user._id });
    const loyaltyInfo = loyalty ? {
      currentPoints: loyalty.points,
      currentTier: loyalty.tier,
      nextTierPoints: loyalty.nextTierPoints,
      progressToNextTier: loyalty.tier === 'gold' ? 100 : 
        Math.min(100, Math.floor((loyalty.points / loyalty.nextTierPoints) * 100))
    } : null;

    // Calculate points earned from this order
    const pointsEarned = Math.floor(order.total / 100);
    const deliveryBonusPoints = order.status === 'delivered' ? Math.floor(order.total / 50) : 0;

    res.status(200).json({
      success: true,
      data: {
        order,
        loyaltyInfo,
        pointsEarned,
        deliveryBonusPoints,
        totalPointsFromOrder: pointsEarned + deliveryBonusPoints
      }
    });
  } catch (error) {
    console.error('Get order details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order details'
    });
  }
});

// @desc    Get available products for customer
// @route   GET /api/customer/products
// @access  Customer only
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || '';
    const category = req.query.category || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const skip = (page - 1) * limit;

    // Build query - only active products
    let query = { status: 'active' };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (category) {
      query.category = category;
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort(sortObj)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// @desc    Get product by ID for customer
// @route   GET /api/customer/products/:id
// @access  Customer only
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      status: 'active'
    }).populate('category', 'name');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// @desc    Place new order
// @route   POST /api/customer/orders
// @access  Customer only
router.post('/orders', [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress')
    .isObject()
    .withMessage('Shipping address is required'),
  body('billingAddress')
    .isObject()
    .withMessage('Billing address is required'),
  body('payment.method')
    .isIn(['credit_card', 'debit_card', 'paypal', 'stripe', 'cash_on_delivery'])
    .withMessage('Valid payment method is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { items, shippingAddress, billingAddress, payment, notes } = req.body;

    // Validate products and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product} not found`
        });
      }

      if (product.status !== 'active') {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is not available`
        });
      }

      if (product.stock.trackStock && product.stock.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal
      });
    }

    // Calculate shipping cost (simplified)
    const shippingCost = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000

    // Calculate tax (8%)
    const tax = subtotal * 0.08;

    // Calculate total
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = new Order({
      customer: req.user._id,
      items: orderItems,
      subtotal,
      tax,
      shipping: {
        cost: shippingCost,
        method: 'standard'
      },
      total,
      payment: {
        method: payment.method,
        status: payment.method === 'cash_on_delivery' ? 'pending' : 'pending'
      },
      shippingAddress,
      billingAddress,
      notes: {
        customer: notes?.customer || ''
      }
    });
    await order.save();

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'stock.quantity': -item.quantity }
      });
    }

    // Add initial timeline entry
    await order.addTimelineEntry('pending', 'Order placed successfully', req.user._id);

    // Initialize loyalty account if it doesn't exist
    const existingLoyalty = await Loyalty.findOne({ user: req.user._id });
    if (!existingLoyalty) {
      await Loyalty.create({
        user: req.user._id,
        points: 0,
        tier: 'bronze',
        nextTierPoints: 5000
      });
    }

    // Add loyalty points for order placement (small amount)
    const loyalty = await Loyalty.findOne({ user: req.user._id });
    if (loyalty) {
      const pointsEarned = Math.floor(total / 100); // 1 point per ₹100 spent
      loyalty.points += pointsEarned;
      loyalty.lifetimePoints += pointsEarned;
      
      loyalty.history.push({
        type: 'earned',
        points: pointsEarned,
        order: order._id,
        description: `Earned ${pointsEarned} points from order #${order.orderNumber}`
      });

      // Check for tier upgrade
      const { newTier, nextTierPoints } = loyalty.checkTierUpgrade();
      if (newTier !== loyalty.tier) {
        loyalty.history.push({
          type: 'tier_upgrade',
          points: 0,
          description: `Upgraded from ${loyalty.tier} to ${newTier} tier`
        });
        loyalty.tier = newTier;
        loyalty.nextTierPoints = nextTierPoints;
      }

      await loyalty.save();

      // Update user document for quick access
      await User.findByIdAndUpdate(req.user._id, {
        loyaltyPoints: loyalty.points,
        loyaltyTier: loyalty.tier,
        $push: {
          loyaltyHistory: {
            date: new Date(),
            action: 'points_earned',
            points: pointsEarned,
            order: order._id
          }
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        order,
        loyaltyPointsEarned: loyalty ? Math.floor(total / 100) : 0,
        newLoyaltyPoints: loyalty ? loyalty.points : 0,
        newTier: loyalty ? loyalty.tier : 'bronze'
      }
    });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error placing order'
    });
  }
});

// @desc    Get customer address book
// @route   GET /api/customer/addresses
// @access  Customer only
router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // For now, return the user's address
    // In a real app, you might have a separate Address model
    const addresses = user.address ? [user.address] : [];

    res.status(200).json({
      success: true,
      data: addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching addresses'
    });
  }
});

module.exports = router; 