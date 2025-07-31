const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  image: {
    type: String,
    default: null
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parent: 1 });
categorySchema.index({ isActive: 1 });

// Virtual for full path (breadcrumb)
categorySchema.virtual('fullPath').get(function() {
  return this.parent ? `${this.parent.fullPath} > ${this.name}` : this.name;
});

// Static method to find active categories
categorySchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
};

// Static method to find root categories
categorySchema.statics.findRoots = function() {
  return this.find({ parent: null, isActive: true }).sort({ sortOrder: 1, name: 1 });
};

module.exports = mongoose.model('Category', categorySchema); 