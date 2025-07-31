const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  costPrice: {
    type: Number,
    min: [0, 'Cost price cannot be negative']
  },
  sku: {
    type: String,
    unique: true,
    trim: true,
    uppercase: true
  },
  barcode: {
    type: String,
    trim: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required']
  },
  brand: {
    type: String,
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  stock: {
    quantity: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock quantity cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, 'Low stock threshold cannot be negative']
    },
    trackStock: {
      type: Boolean,
      default: true
    }
  },
  variants: [{
    name: String,
    options: [String],
    price: Number
  }],
  attributes: [{
    name: String,
    value: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ 'stock.quantity': 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

// Virtual for in stock status
productSchema.virtual('inStock').get(function() {
  if (!this.stock.trackStock) return true;
  return this.stock.quantity > 0;
});

// Virtual for low stock status
productSchema.virtual('isLowStock').get(function() {
  if (!this.stock.trackStock) return false;
  return this.stock.quantity <= this.stock.lowStockThreshold && this.stock.quantity > 0;
});

// Method to update stock
productSchema.methods.updateStock = function(quantity, operation = 'decrease') {
  if (!this.stock.trackStock) return;
  
  if (operation === 'decrease') {
    this.stock.quantity = Math.max(0, this.stock.quantity - quantity);
  } else if (operation === 'increase') {
    this.stock.quantity += quantity;
  }
  
  return this.save();
};

// Static method to find active products
productSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Static method to find featured products
productSchema.statics.findFeatured = function() {
  return this.find({ status: 'active', isFeatured: true });
};

module.exports = mongoose.model('Product', productSchema); 