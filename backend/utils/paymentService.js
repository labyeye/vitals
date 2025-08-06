const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class PaymentService {
  // Create Razorpay order
  async createOrder(amount, currency = 'INR', receipt) {
    try {
      const options = {
        amount: amount * 100, // Amount in paise (100 paise = 1 INR)
        currency,
        receipt: receipt || `order_${Date.now()}`,
        notes: {
          created_at: new Date().toISOString(),
        },
      };

      const order = await razorpay.orders.create(options);
      return {
        success: true,
        data: order,
      };
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Verify payment signature
  verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Error verifying payment signature:', error);
      return false;
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return {
        success: true,
        data: payment,
      };
    } catch (error) {
      console.error('Error fetching payment details:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount, notes = {}) {
    try {
      const refund = await razorpay.payments.refund(paymentId, {
        amount: amount * 100, // Amount in paise
        notes,
      });
      return {
        success: true,
        data: refund,
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new PaymentService();
