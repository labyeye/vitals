const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vitals-iu4r.onrender.com';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface CreateOrderResponse {
  success: boolean;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    orderNumber: string;
    customerDetails: {
      name: string;
      email: string;
      phone: string;
    };
  };
  message: string;
}

interface VerifyPaymentResponse {
  success: boolean;
  data: {
    orderId: string;
    orderNumber: string;
    paymentId: string;
    amount: number;
    status: string;
    pointsEarned: number;
  };
  message: string;
}

interface RazorpayKeyResponse {
  success: boolean;
  data: {
    key: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open(): void;
    };
  }
}

export const paymentService = {
  // Get Razorpay key
  async getRazorpayKey(): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/razorpay-key`);
      const data: RazorpayKeyResponse = await response.json();
      
      if (data.success) {
        return data.data.key;
      }
      
      throw new Error('Failed to get Razorpay key');
    } catch (error) {
      console.error('Error fetching Razorpay key:', error);
      throw error;
    }
  },

  // Create payment order
  async createOrder(orderId: string, token: string): Promise<CreateOrderResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const data: CreateOrderResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment order');
      }
      
      return data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  },

  // Verify payment
  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    orderId: string,
    token: string
  ): Promise<VerifyPaymentResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          orderId,
        }),
      });

      const data: VerifyPaymentResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify payment');
      }
      
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },

  // Handle payment failure
  async handlePaymentFailure(orderId: string, error: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payments/payment-failed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, error }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to record payment failure');
      }
    } catch (error) {
      console.error('Error handling payment failure:', error);
      throw error;
    }
  },

  // Load Razorpay script
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  // Initialize Razorpay payment
  async initiatePayment(
    orderId: string,
    token: string,
    onSuccess: (response: VerifyPaymentResponse) => void,
    onFailure: (error: string) => void
  ): Promise<void> {
    try {
      // Load Razorpay script
      const isScriptLoaded = await this.loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Get Razorpay key
      const razorpayKey = await this.getRazorpayKey();

      // Create payment order
      const orderData = await this.createOrder(orderId, token);

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Thryv Nutrition',
        description: `Order #${orderData.data.orderNumber}`,
        order_id: orderData.data.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verificationResult = await this.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              orderId,
              token
            );
            onSuccess(verificationResult);
          } catch (error) {
            onFailure(error instanceof Error ? error.message : 'Payment verification failed');
          }
        },
        prefill: {
          name: orderData.data.customerDetails.name,
          email: orderData.data.customerDetails.email,
          contact: orderData.data.customerDetails.phone,
        },
        theme: {
          color: '#688F4E',
        },
        modal: {
          ondismiss: () => {
            onFailure('Payment cancelled by user');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Error initiating payment:', error);
      onFailure(error instanceof Error ? error.message : 'Payment initiation failed');
    }
  },
};

export type { CreateOrderResponse, VerifyPaymentResponse, RazorpayResponse };
