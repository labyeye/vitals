const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vitals_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create categories
    const categories = await Category.create([
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest electronic gadgets and devices'
      },
      {
        name: 'Clothing',
        slug: 'clothing',
        description: 'Fashion and apparel for all ages'
      },
      {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home improvement and garden supplies'
      },
      {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and athletic gear'
      },
      {
        name: 'Books',
        slug: 'books',
        description: 'Books, magazines, and educational materials'
      },
      {
        name: 'Health & Beauty',
        slug: 'health-beauty',
        description: 'Health products and beauty supplies'
      }
    ]);

    console.log('Categories created:', categories.length);

    // Get admin user for product creation
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.log('No admin user found. Please run npm run create-admin first.');
      process.exit(1);
    }

    // Create sample products
    const products = await Product.create([
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        shortDescription: 'Premium wireless headphones',
        price: 99.99,
        comparePrice: 129.99,
        sku: 'WH-001',
        category: categories[0]._id, // Electronics
        brand: 'AudioTech',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Headphones',
            alt: 'Wireless Headphones',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 50,
          lowStockThreshold: 10,
          trackStock: true
        },
        tags: ['wireless', 'bluetooth', 'headphones', 'audio'],
        status: 'active',
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking watch with heart rate monitor',
        shortDescription: 'Smart fitness tracker',
        price: 199.99,
        comparePrice: 249.99,
        sku: 'SFW-002',
        category: categories[0]._id, // Electronics
        brand: 'FitTech',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Smart+Watch',
            alt: 'Smart Fitness Watch',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 25,
          lowStockThreshold: 5,
          trackStock: true
        },
        tags: ['fitness', 'smartwatch', 'health', 'tracking'],
        status: 'active',
        isBestSeller: true,
        createdBy: adminUser._id
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable organic cotton t-shirt in various colors',
        shortDescription: 'Organic cotton t-shirt',
        price: 24.99,
        comparePrice: 29.99,
        sku: 'OCT-003',
        category: categories[1]._id, // Clothing
        brand: 'EcoWear',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=T-Shirt',
            alt: 'Organic Cotton T-Shirt',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 100,
          lowStockThreshold: 20,
          trackStock: true
        },
        tags: ['organic', 'cotton', 't-shirt', 'sustainable'],
        status: 'active',
        createdBy: adminUser._id
      },
      {
        name: 'Garden Tool Set',
        description: 'Complete set of essential garden tools for home gardening',
        shortDescription: 'Complete garden tool set',
        price: 79.99,
        comparePrice: 99.99,
        sku: 'GTS-004',
        category: categories[2]._id, // Home & Garden
        brand: 'GardenPro',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Garden+Tools',
            alt: 'Garden Tool Set',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 30,
          lowStockThreshold: 8,
          trackStock: true
        },
        tags: ['garden', 'tools', 'gardening', 'outdoor'],
        status: 'active',
        isFeatured: true,
        createdBy: adminUser._id
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat made from eco-friendly materials',
        shortDescription: 'Premium yoga mat',
        price: 39.99,
        comparePrice: 49.99,
        sku: 'YM-005',
        category: categories[3]._id, // Sports
        brand: 'YogaLife',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Yoga+Mat',
            alt: 'Yoga Mat Premium',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 75,
          lowStockThreshold: 15,
          trackStock: true
        },
        tags: ['yoga', 'fitness', 'mat', 'exercise'],
        status: 'active',
        createdBy: adminUser._id
      },
      {
        name: 'Bestselling Novel Collection',
        description: 'Collection of bestselling novels from top authors',
        shortDescription: 'Bestselling novel collection',
        price: 49.99,
        comparePrice: 69.99,
        sku: 'BNC-006',
        category: categories[4]._id, // Books
        brand: 'BookWorld',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Books',
            alt: 'Bestselling Novel Collection',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 40,
          lowStockThreshold: 10,
          trackStock: true
        },
        tags: ['books', 'novels', 'bestsellers', 'reading'],
        status: 'active',
        isBestSeller: true,
        createdBy: adminUser._id
      },
      {
        name: 'Natural Face Cream',
        description: 'Hydrating face cream made with natural ingredients',
        shortDescription: 'Natural face cream',
        price: 34.99,
        comparePrice: 44.99,
        sku: 'NFC-007',
        category: categories[5]._id, // Health & Beauty
        brand: 'NaturalBeauty',
        images: [
          {
            url: 'https://via.placeholder.com/400x400?text=Face+Cream',
            alt: 'Natural Face Cream',
            isPrimary: true
          }
        ],
        stock: {
          quantity: 60,
          lowStockThreshold: 12,
          trackStock: true
        },
        tags: ['beauty', 'natural', 'face cream', 'skincare'],
        status: 'active',
        createdBy: adminUser._id
      }
    ]);

    console.log('Products created:', products.length);
    console.log('Sample data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the script
seedData(); 