const Loyalty = require('../models/Loyalty');
const User = require('../models/User');
const Order = require('../models/Order');

// Initialize loyalty account for new users
exports.initializeLoyalty = async (userId) => {
  try {
    await Loyalty.create({
      user: userId,
      points: 0,
      tier: 'bronze',
      nextTierPoints: 5000
    });
  } catch (error) {
    console.error('Error initializing loyalty account:', error);
  }
};

// Update loyalty points after order completion
exports.updateLoyaltyPoints = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate('customer', 'loyaltyPoints loyaltyTier');
    
    if (!order || order.payment.status !== 'paid') {
      return;
    }

    const loyalty = await Loyalty.findOne({ user: order.customer._id });
    if (!loyalty) {
      return;
    }

    const pointsEarned = loyalty.calculatePoints(order.total);
    if (pointsEarned <= 0) {
      return;
    }

    // Update points
    loyalty.points += pointsEarned;
    loyalty.lifetimePoints += pointsEarned;

    // Add to history
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
    await User.findByIdAndUpdate(order.customer._id, {
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

    return loyalty;
  } catch (error) {
    console.error('Error updating loyalty points:', error);
  }
};

// Get loyalty details for customer
exports.getLoyaltyDetails = async (userId) => {
  try {
    const loyalty = await Loyalty.findOne({ user: userId })
      .populate('history.order', 'orderNumber total');
    
    if (!loyalty) {
      return null;
    }

    return {
      points: loyalty.points,
      tier: loyalty.tier,
      nextTierPoints: loyalty.nextTierPoints,
      progressToNextTier: loyalty.tier === 'gold' ? 100 : 
        Math.min(100, Math.floor((loyalty.points / loyalty.nextTierPoints) * 100)),
      history: loyalty.history
    };
  } catch (error) {
    console.error('Error getting loyalty details:', error);
    return null;
  }
};

// Get all loyalty accounts for admin
exports.getAllLoyaltyAccounts = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [accounts, total] = await Promise.all([
      Loyalty.find()
        .populate('user', 'firstName lastName email')
        .sort({ points: -1 })
        .skip(skip)
        .limit(limit),
      Loyalty.countDocuments()
    ]);

    return {
      accounts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    console.error('Error getting loyalty accounts:', error);
    return null;
  }
};