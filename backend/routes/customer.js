const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, isCustomer } = require('../middleware/auth');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// Apply customer protection to all routes
router.use(protect, isCustomer);

// @desc    Get customer dashboard
// @route   GET /api/customer/dashboard
// @access  Customer only
router.get('/dashboard', async (req, res) => {
  try {
    // Get customer's recent orders
    const recentOrders = await Order.find({ customer: req.user._id })
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get order statistics
    const orderStats = await Order.aggregate([
      { $match: { customer: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get total spent
    const totalSpent = await Order.aggregate([
      { 
        $match: { 
          customer: req.user._id,
          'payment.status': 'paid'
        } 
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Get wishlist items (if implemented)
    // For now, return empty array
    const wishlistItems = [];

    res.status(200).json({
      success: true,
      data: {
        recentOrders,
        orderStats,
        totalSpent: totalSpent[0]?.total || 0,
        wishlistItems
      }
    });
  } catch (error) {
    console.error('Customer dashboard error:', error);
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
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100

    // Calculate tax (simplified - 8.5%)
    const tax = subtotal * 0.085;

    // Calculate total
    const total = subtotal + shippingCost + tax;

    // Create order
    const order = await Order.create({
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

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { 'stock.quantity': -item.quantity }
      });
    }

    // Add initial timeline entry
    await order.addTimelineEntry('pending', 'Order placed successfully', req.user._id);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
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