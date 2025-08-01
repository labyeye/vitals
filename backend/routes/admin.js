const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// Apply admin protection to all routes
router.use(protect, isAdmin);

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Admin only
router.get('/dashboard', async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('customer', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get low stock products
    const lowStockProducts = await Product.find({
      'stock.quantity': { $lte: 10 },
      'stock.trackStock': true
    }).limit(10);

    // Get total revenue from all orders
    const totalRevenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      }
    ]);

    const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

    // Get revenue stats (last 30 days) for recent orders
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentOrdersRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      }
    ]);

    const recentRevenueStats = recentOrdersRevenue[0] || { totalRevenue: 0, orderCount: 0 };

    // Get order status counts
    const orderStatusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalOrders,
          totalRevenue: totalRevenue,
          recentOrderCount: recentRevenueStats.orderCount
        },
        recentOrders,
        lowStockProducts,
        orderStatusCounts
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

// @desc    Get all users (customers)
// @route   GET /api/admin/users
// @access  Admin only
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = { role: 'customer' };
    
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) {
      query.isActive = status === 'active';
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
});

// @desc    Get user by ID
// @route   GET /api/admin/users/:id
// @access  Admin only
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user's orders
    const orders = await Order.find({ customer: user._id })
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        user,
        orders
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
});

// @desc    Get customer details with stats
// @route   GET /api/admin/users/:id/details
// @access  Admin only
router.get('/users/:id/details', async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Get customer order statistics
    const orderStats = await Order.aggregate([
      { $match: { customer: customer._id } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalSpent: 0,
      averageOrderValue: 0
    };

    res.status(200).json({
      success: true,
      data: {
        customer,
        stats
      }
    });
  } catch (error) {
    console.error('Get customer details error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching customer details'
    });
  }
});

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Admin only
router.put('/users/:id/status', [
  body('isActive')
    .isBoolean()
    .withMessage('isActive must be a boolean')
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

    const { isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status'
    });
  }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Admin only
router.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'shippingAddress.email': { $regex: search, $options: 'i' } }
      ];
    }

    const orders = await Order.find(query)
      .populate('customer', 'firstName lastName email')
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

// @desc    Get order details with loyalty info
// @route   GET /api/admin/orders/:id/details
// @access  Admin only
router.get('/orders/:id/details', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone loyaltyPoints loyaltyTier evolvPoints')
      .populate('items.product', 'name price images description');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Calculate loyalty points earned from this order
    const pointsEarned = Math.floor(order.total);
    const deliveryBonusPoints = order.status === 'delivered' ? Math.floor(order.total * 0.1) : 0;
    const totalPointsFromOrder = pointsEarned + deliveryBonusPoints;

    // Get loyalty information
    const loyaltyInfo = {
      pointsEarned,
      deliveryBonusPoints,
      totalPointsFromOrder,
      customerTier: order.customer.loyaltyTier || 'bronze',
      customerPoints: order.customer.loyaltyPoints || 0
    };

    res.status(200).json({
      success: true,
      data: {
        order,
        loyaltyInfo
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

// @desc    Get order by ID
// @route   GET /api/admin/orders/:id
// @access  Admin only
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone')
      .populate('items.product', 'name price images sku');

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

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Admin only
router.put('/orders/:id/status', [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
    .withMessage('Invalid order status'),
  body('notes')
    .optional()
    .isString()
    .withMessage('Notes must be a string')
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

    const { status, notes } = req.body;

    const order = await Order.findById(req.params.id).populate('customer');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    await order.updateStatus(status, notes, req.user._id);

    // Update loyalty points if order is delivered
    if (status === 'delivered' && order.customer) {
      const pointsEarned = Math.floor(order.total);
      const deliveryBonusPoints = Math.floor(order.total * 0.1);
      const totalPoints = pointsEarned + deliveryBonusPoints;

      // Update customer's loyalty points
      await User.findByIdAndUpdate(order.customer._id, {
        $inc: { 
          loyaltyPoints: totalPoints,
          evolvPoints: pointsEarned
        }
      });

      // Add to loyalty history
      await User.findByIdAndUpdate(order.customer._id, {
        $push: {
          loyaltyHistory: {
            type: 'order_completion',
            points: totalPoints,
            orderId: order._id,
            orderNumber: order.orderNumber,
            description: `Order ${order.orderNumber} completed - ${pointsEarned} points + ${deliveryBonusPoints} bonus`
          }
        }
      });

      // Recalculate tier
      const customer = await User.findById(order.customer._id);
      if (customer) {
        customer.recalculateTier();
        await customer.save();
      }
    }

    // Update product stock if order is cancelled or refunded
    if (status === 'cancelled' || status === 'refunded') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { 'stock.quantity': item.quantity }
        });
      }
    }

    // Get updated order with populated data
    const updatedOrder = await Order.findById(req.params.id)
      .populate('customer', 'firstName lastName email phone loyaltyPoints loyaltyTier evolvPoints')
      .populate('items.product', 'name price images description');

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status'
    });
  }
});

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Admin only
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
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

// @desc    Create product
// @route   POST /api/admin/products
// @access  Admin only
router.post('/products', [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name is required and must be less than 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Product description is required and must be less than 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock.quantity')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer')
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

    const productData = {
      ...req.body,
      createdBy: req.user._id
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});

// @desc    Update product
// @route   PUT /api/admin/products/:id
// @access  Admin only
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Update product
    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Admin only
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});

// @desc    Get analytics data
// @route   GET /api/admin/analytics
// @access  Admin only
router.get('/analytics', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const previousStartDate = new Date(startDate);
    previousStartDate.setDate(previousStartDate.getDate() - days);

    // Get current period data
    const currentPeriodData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    // Get previous period data for comparison
    const previousPeriodData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousStartDate, $lt: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    const currentRevenue = currentPeriodData[0]?.totalRevenue || 0;
    const currentOrders = currentPeriodData[0]?.totalOrders || 0;
    const previousRevenue = previousPeriodData[0]?.totalRevenue || 0;
    const previousOrders = previousPeriodData[0]?.totalOrders || 0;

    // Calculate growth percentages
    const revenueGrowth = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;
    const orderGrowth = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders) * 100 : 0;

    // Get order status counts
    const orderStatusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments();
    const pendingOrders = orderStatusCounts.find(s => s._id === 'pending')?.count || 0;
    const deliveredOrders = orderStatusCounts.find(s => s._id === 'delivered')?.count || 0;
    const cancelledOrders = orderStatusCounts.find(s => s._id === 'cancelled')?.count || 0;

    // Get customer data
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const newCustomers = await User.countDocuments({ 
      role: 'customer', 
      createdAt: { $gte: startDate } 
    });
    const activeCustomers = await Order.distinct('customer', { createdAt: { $gte: startDate } });
    const customerGrowth = totalCustomers > 0 ? (newCustomers / totalCustomers) * 100 : 0;

    // Get product data
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.countDocuments({
      'stock.quantity': { $lte: 10 },
      'stock.trackStock': true
    });
    const outOfStockProducts = await Product.countDocuments({
      'stock.quantity': { $eq: 0 },
      'stock.trackStock': true
    });

    // Get top products by revenue
    const topProducts = await Order.aggregate([
      {
        $unwind: '$items'
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$product.name' },
          sales: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      {
        $sort: { revenue: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get top customers by spending
    const topCustomers = await Order.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: '$customer'
      },
      {
        $group: {
          _id: '$customer',
          firstName: { $first: '$customer.firstName' },
          lastName: { $first: '$customer.lastName' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' }
        }
      },
      {
        $sort: { totalSpent: -1 }
      },
      {
        $limit: 5
      }
    ]);

    // Get monthly revenue data
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      },
      {
        $limit: 12
      }
    ]);

    // Format monthly revenue data
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const formattedMonthlyRevenue = monthlyRevenue.map(item => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      revenue: item.revenue,
      orders: item.orders
    }));

    // Calculate order status distribution percentages
    const orderStatusDistribution = orderStatusCounts.map(status => ({
      status: status._id,
      count: status.count,
      percentage: totalOrders > 0 ? Math.round((status.count / totalOrders) * 100) : 0
    }));

    // Calculate daily, weekly, monthly revenue
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const dailyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneDayAgo }
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$total' }
        }
      }
    ]);

    const weeklyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$total' }
        }
      }
    ]);

    const monthlyRevenueCurrent = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: oneMonthAgo }
        }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$total' }
        }
      }
    ]);

    const analyticsData = {
      revenue: {
        total: currentRevenue,
        monthly: monthlyRevenueCurrent[0]?.revenue || 0,
        weekly: weeklyRevenue[0]?.revenue || 0,
        daily: dailyRevenue[0]?.revenue || 0,
        growth: revenueGrowth
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders,
        delivered: deliveredOrders,
        cancelled: cancelledOrders,
        growth: orderGrowth
      },
      customers: {
        total: totalCustomers,
        new: newCustomers,
        active: activeCustomers.length,
        growth: customerGrowth
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts,
        outOfStock: outOfStockProducts
      },
      topProducts,
      topCustomers,
      monthlyRevenue: formattedMonthlyRevenue,
      orderStatusDistribution
    };

    res.status(200).json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics data'
    });
  }
});

module.exports = router; 