#!/bin/bash

# Test script for Razorpay integration
echo "🧪 Testing Vitals Backend with Razorpay Integration"
echo "=================================================="

# Start backend server
echo "📡 Starting backend server..."
cd /Users/labh/Desktop/Projects/vitals/backend

# Check if .env has Razorpay keys
echo "🔑 Checking environment configuration..."
if grep -q "RAZORPAY_KEY_ID" .env; then
    echo "✅ Razorpay key ID found in .env"
else
    echo "❌ Razorpay key ID not found in .env"
    echo "Please add your Razorpay test keys to .env file:"
    echo "RAZORPAY_KEY_ID=your_test_key_id"
    echo "RAZORPAY_KEY_SECRET=your_test_key_secret"
fi

# Start the server in background
echo "🚀 Starting server on port 3500..."
npm start &
SERVER_PID=$!

# Wait for server to start
echo "⏳ Waiting for server to initialize..."
sleep 5

# Test health endpoint
echo "🏥 Testing health endpoint..."
curl -s http://localhost:3500/api/health | jq '.' || echo "Health check failed"

# Test Razorpay key endpoint
echo "🔐 Testing Razorpay key endpoint..."
curl -s http://localhost:3500/api/payments/razorpay-key | jq '.' || echo "Razorpay key endpoint failed"

# Test heroes endpoint
echo "🦸 Testing heroes endpoint..."
curl -s http://localhost:3500/api/heroes | jq '.' || echo "Heroes endpoint failed"

echo ""
echo "✅ Backend testing complete!"
echo "📝 Server is running with PID: $SERVER_PID"
echo "🛑 To stop the server, run: kill $SERVER_PID"
echo ""
echo "🎯 Next steps:"
echo "1. Add your Razorpay test keys to .env file"
echo "2. Test the checkout flow in the frontend"
echo "3. Verify payment integration end-to-end"
