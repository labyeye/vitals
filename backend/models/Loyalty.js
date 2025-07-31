const mongoose = require('mongoose');

const loyaltySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  tier: {
    type: String,
    enum: ['bronze', 'silver', 'gold'],
    default: 'bronze'
  },
  history: [{
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['earned', 'redeemed', 'tier_upgrade', 'tier_downgrade']
    },
    points: Number,
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    description: String
  }],
  lifetimePoints: {
    type: Number,
    default: 0
  },
  nextTierPoints: {
    type: Number,
    default: 5000 // Points needed to reach silver
  }
}, {
  timestamps: true
});

// Calculate points based on order amount and current tier
loyaltySchema.methods.calculatePoints = function(orderAmount) {
  let pointsEarned = 0;
  
  if (this.tier === 'bronze') {
    // Bronze tier: 100 points per 1000 spent
    pointsEarned = Math.floor(orderAmount / 1000) * 100;
  } else if (this.tier === 'silver') {
    // Silver tier: 15% of order value if > 1000
    if (orderAmount > 1000) {
      pointsEarned = Math.floor(orderAmount * 0.15);
    }
  } else if (this.tier === 'gold') {
    // Gold tier: 20% of order value if > 1000
    if (orderAmount > 1000) {
      pointsEarned = Math.floor(orderAmount * 0.20);
    }
  }
  
  return pointsEarned;
};

// Check for tier upgrades
loyaltySchema.methods.checkTierUpgrade = function() {
  let newTier = this.tier;
  let nextTierPoints = this.nextTierPoints;
  
  if (this.tier === 'bronze' && this.points >= 5000) {
    newTier = 'silver';
    nextTierPoints = 10000; // Points needed to reach gold
  } else if (this.tier === 'silver' && this.points >= 10000) {
    newTier = 'gold';
    nextTierPoints = Infinity; // No higher tier
  }
  
  return { newTier, nextTierPoints };
};

module.exports = mongoose.model('Loyalty', loyaltySchema);