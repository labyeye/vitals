const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'USA'
    }
  },
  loyaltyPoints: { type: Number, default: 0 },
evolvPoints: { type: Number, default: 0 },
loyaltyTier: { type: String, enum: ['bronze', 'silver', 'gold'], default: 'bronze' },
loyaltyHistory: [{
  date: Date,
  action: String,
  points: Number,
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  description: String
}],
  profileImage: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  return userObject;
};

// Static method to find by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};
userSchema.methods.getNextLoyaltyTier = function() {
  if (this.loyaltyTier === 'bronze') {
    return {
      currentTier: 'bronze',
      nextTier: 'silver',
      pointsNeeded: Math.max(0, 5000 - this.loyaltyPoints),
      progress: Math.min(100, Math.floor((this.loyaltyPoints / 5000) * 100))
    };
  } else if (this.loyaltyTier === 'silver') {
    return {
      currentTier: 'silver',
      nextTier: 'gold',
      pointsNeeded: Math.max(0, 10000 - this.loyaltyPoints),
      progress: Math.min(100, Math.floor((this.loyaltyPoints / 10000) * 100))
    };
  } else {
    // Gold is the highest tier
    return {
      currentTier: 'gold',
      nextTier: null,
      pointsNeeded: 0,
      progress: 100
    };
  }
};
userSchema.methods.addLoyaltyPoints = async function(orderTotal, order) {
  // Calculate points based on current tier
  let multiplier = 0.10; // bronze
  if (this.loyaltyTier === 'silver') multiplier = 0.15;
  if (this.loyaltyTier === 'gold') multiplier = 0.20;

  const evolvPoints = Math.floor(orderTotal * multiplier);
  const tierPoints = Math.floor(orderTotal); // 1:1 ratio for tier points

  // Update points
  this.evolvPoints += evolvPoints;
  this.loyaltyPoints += tierPoints;

  // Check for tier upgrade
  if (this.loyaltyTier === 'bronze' && this.loyaltyPoints >= 5000) {
    this.loyaltyTier = 'silver';
  } else if (this.loyaltyTier === 'silver' && this.loyaltyPoints >= 10000) {
    this.loyaltyTier = 'gold';
  }

  // Add to history
  this.loyaltyHistory.push({
    date: new Date(),
    action: 'order_points',
    points: tierPoints,
    order: order ? order._id : null, // Handle case where order might be undefined
    description: `Earned ${tierPoints} tier points and ${evolvPoints} evolv points from order`
  });

  await this.save();

  return {
    tierPoints,
    evolvPoints,
    newTier: this.loyaltyTier,
    totalPoints: this.loyaltyPoints,
    totalEvolvPoints: this.evolvPoints
  };
};

module.exports = mongoose.model('User', userSchema); 