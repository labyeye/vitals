const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const paymentService = require('../utils/paymentService');
const { protect } = require('../middleware/auth');

// Create Razorpay order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Find the order
    const order = await Order.findById(orderId).populate('customer');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this order'
      });
    }

    // Check if order is already paid
    if (order.payment.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Order is already paid'
      });
    }

    // Create Razorpay order
    const razorpayOrder = await paymentService.createOrder(
      order.total,
      'INR',
      `order_${order.orderNumber}`
    );

    if (!razorpayOrder.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create payment order',
        error: razorpayOrder.error
      });
    }

    // Update order with Razorpay order ID
    order.payment.razorpayOrderId = razorpayOrder.data.id;
    order.payment.method = 'razorpay';
    await order.save();

    res.json({
      success: true,
      data: {
        orderId: razorpayOrder.data.id,
        amount: razorpayOrder.data.amount,
        currency: razorpayOrder.data.currency,
        orderNumber: order.orderNumber,
        customerDetails: {
          name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
          email: order.shippingAddress.email,
          phone: order.shippingAddress.phone
        }
      },
      message: 'Payment order created successfully'
    });

  } catch (error) {
    console.error('Error creating payment order:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Verify payment and update order
router.post('/verify-payment', protect, async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      orderId
    } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment verification data'
      });
    }

    // Find the order
    const order = await Order.findById(orderId).populate('customer');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this order'
      });
    }

    // Verify payment signature
    const isValidSignature = paymentService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }

    // Get payment details from Razorpay
    const paymentDetails = await paymentService.getPaymentDetails(razorpayPaymentId);

    if (!paymentDetails.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to verify payment details'
      });
    }

    // Update order with payment details
    order.payment.status = 'paid';
    order.payment.razorpayPaymentId = razorpayPaymentId;
    order.payment.razorpaySignature = razorpaySignature;
    order.payment.transactionId = razorpayPaymentId;
    order.payment.paidAt = new Date();
    order.status = 'confirmed'; // Change order status to confirmed

    await order.save();

    // Update user's Evolv points (if applicable)
    if (order.customer) {
      const pointsEarned = Math.floor(order.total * 0.01); // 1% of order value as points
      await User.findByIdAndUpdate(order.customer._id, {
        $inc: { 'loyaltyProgram.evolvPoints': pointsEarned }
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        paymentId: razorpayPaymentId,
        amount: order.total,
        status: order.status,
        pointsEarned: Math.floor(order.total * 0.01)
      },
      message: 'Payment verified and order confirmed successfully'
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Handle payment failure
router.post('/payment-failed', protect, async (req, res) => {
  try {
    const { orderId, error } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to access this order'
      });
    }

    // Update order payment status
    order.payment.status = 'failed';
    await order.save();

    res.json({
      success: true,
      message: 'Payment failure recorded',
      data: {
        orderId: order._id,
        orderNumber: order.orderNumber,
        status: order.status
      }
    });

  } catch (error) {
    console.error('Error handling payment failure:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get Razorpay key for frontend
router.get('/razorpay-key', (req, res) => {
  res.json({
    success: true,
    data: {
      key: process.env.RAZORPAY_KEY_ID
    }
  });
});

module.exports = router;
