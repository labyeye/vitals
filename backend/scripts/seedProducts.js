const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));
const getAdminUserId = async () => {
    
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
        throw new Error('No admin user found in database');
    }
    return adminUser._id;
};

const seedCategories = async (adminUserId) => {
    await Category.deleteMany();

    const categories = [
        {
            name: 'Protein Shakes',
            slug: 'protein-shakes',
            description: 'Premium protein shakes for fitness enthusiasts',
            image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a',
            createdBy: adminUserId
        },
        {
            name: 'Sachet Powders',
            slug: 'sachet-powders',
            description: 'Convenient single-serving protein powder sachets',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
            createdBy: adminUserId
        },
        {
            name: 'Variety Packs',
            slug: 'variety-packs',
            description: 'Try all our flavors in one convenient pack',
            image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a',
            createdBy: adminUserId
        }
    ];

    const createdCategories = await Category.insertMany(categories);
    return {
        shakesCategory: createdCategories[0]._id,
        sachetsCategory: createdCategories[1]._id,
        varietyCategory: createdCategories[2]._id
    };
};


const seedProducts = async (categoryIds, adminUserId) => {
    await Product.deleteMany();

    const products = [
        {
            sku: 'THRYV-STRWB-001',
            name: 'Thryv Strawberry Protein Shake',
            description: 'Your daily protein fix, dressed as a treat. Tastes like dessert, performs like a pro.',
            shortDescription: 'Strawberry flavored protein shake',
            price: 149,
            comparePrice: 179,
            category: categoryIds.shakesCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Strawberry%20Shake.png?updatedAt=1754596021444',
                    alt: 'Strawberry Protein Shake',
                    isPrimary: true
                },
                {
                    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
                    alt: 'Strawberry Protein Shake - Side View',
                    isPrimary: false
                },
                {
                    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop',
                    alt: 'Strawberry Protein Shake - Ingredients',
                    isPrimary: false
                }
            ],
            stock: {
                quantity: 100,
                lowStockThreshold: 10,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '6', '12', '24'],
                  prices: [
                    { size: 1, price: 149 },
                    { size: 6, price: 799 },
                    { size: 12, price: 1499 },
                    { size: 24, price: 2799 }
                  ]
                }
              ],
            attributes: [
                { name: 'Flavor', value: 'Strawberry' },
                { name: 'Protein', value: '25g' },
                { name: 'Sugar', value: 'No Added Sugar' }
            ],
            tags: ['protein', 'shake', 'strawberry', 'fitness'],
            status: 'active',
            isFeatured: true,
            isBestSeller: true,
            weight: 500,
            dimensions: {
                length: 8,
                width: 8,
                height: 20
            },
            seo: {
                title: 'Strawberry Protein Shake | Thryv',
                description: 'Premium strawberry protein shake with 25g complete protein',
                keywords: ['protein', 'shake', 'strawberry', 'fitness']
            },
            createdBy: adminUserId
        },
        {
            sku: 'Thryv-CHOCO-001',
            name: 'Thryv Chocolate Protein Shake',
            description: 'Classic flavour, smarter fuel. Rich taste of real cocoa with 25g of clean, complete protein.',
            shortDescription: 'Chocolate flavored protein shake',
            price: 149,
            comparePrice: 179,
            category: categoryIds.shakesCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Chocolate%20Shake.png?updatedAt=1754596020886',
                    alt: 'Chocolate Protein Shake',
                    isPrimary: true
                },
                {
                    url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
                    alt: 'Chocolate Protein Shake - Side View',
                    isPrimary: false
                },
                {
                    url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=400&fit=crop',
                    alt: 'Chocolate Protein Shake - Nutritional',
                    isPrimary: false
                }
            ],
            stock: {
                quantity: 100,
                lowStockThreshold: 10,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '6', '12', '24'],
                  prices: [
                    { size: 1, price: 149 },
                    { size: 6, price: 799 },
                    { size: 12, price: 1499 },
                    { size: 24, price: 2799 }
                  ]
                }
              ],
            attributes: [
                { name: 'Flavor', value: 'Chocolate' },
                { name: 'Protein', value: '25g' },
                { name: 'Sugar', value: 'No Added Sugar' }
            ],
            tags: ['protein', 'shake', 'chocolate', 'fitness'],
            status: 'active',
            isFeatured: true,
            isBestSeller: true,
            weight: 500,
            dimensions: {
                length: 8,
                width: 8,
                height: 20
            },
            seo: {
                title: 'Chocolate Protein Shake | Thryv',
                description: 'Premium chocolate protein shake with 25g complete protein',
                keywords: ['protein', 'shake', 'chocolate', 'fitness']
            },
            createdBy: adminUserId
        },
        {
            sku: 'Thryv-VANILLA-001',
            name: 'Thryv Vanilla Protein Shake',
            description: 'Simple doesn\'t mean boring. Smooth, balanced, and endlessly drinkable everyday essential.',
            shortDescription: 'Vanilla flavored protein shake',
            price: 149,
            comparePrice: 179,
            category: categoryIds.shakesCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Vanilla%20Shake.png?updatedAt=1754596020601',
                    alt: 'Vanilla Protein Shake',
                    isPrimary: true
                }
            ],
            stock: {
                quantity: 100,
                lowStockThreshold: 10,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '6', '12', '24'],
                  prices: [
                    { size: 1, price: 149 },
                    { size: 6, price: 799 },
                    { size: 12, price: 1499 },
                    { size: 24, price: 2799 }
                  ]
                }
              ],
            attributes: [
                { name: 'Flavor', value: 'Vanilla' },
                { name: 'Protein', value: '25g' },
                { name: 'Sugar', value: 'No Added Sugar' }
            ],
            tags: ['protein', 'shake', 'vanilla', 'fitness'],
            status: 'active',
            isFeatured: true,
            isBestSeller: true,
            weight: 500,
            dimensions: {
                length: 8,
                width: 8,
                height: 20
            },
            seo: {
                title: 'Vanilla Protein Shake | Thryv',
                description: 'Premium vanilla protein shake with 25g complete protein',
                keywords: ['protein', 'shake', 'vanilla', 'fitness']
            },
            createdBy: adminUserId
        },
        {
            sku: 'Thryv-COFFEE-001',
            name: 'Thryv Coffee Protein Shake',
            description: 'Your morning brew just got an upgrade. Daily protein and caffeine kick in one smooth bottle.',
            shortDescription: 'Coffee flavored protein shake',
            price: 159,
            comparePrice: 189,
            category: categoryIds.shakesCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Coffee%20Shake.png?updatedAt=1754596021149',
                    alt: 'Coffee Protein Shake',
                    isPrimary: true
                }
            ],
            stock: {
                quantity: 100,
                lowStockThreshold: 10,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '6', '12', '24'],
                  prices: [
                    { size: 1, price: 159 },
                    { size: 6, price: 849 },
                    { size: 12, price: 1599 },
                    { size: 24, price: 2999 }
                  ]
                }
              ],
            attributes: [
                { name: 'Flavor', value: 'Coffee' },
                { name: 'Protein', value: '25g' },
                { name: 'Caffeine', value: '100mg' }
            ],
            tags: ['protein', 'shake', 'coffee', 'energy'],
            status: 'active',
            isFeatured: true,
            isBestSeller: true,
            weight: 500,
            dimensions: {
                length: 8,
                width: 8,
                height: 20
            },
            seo: {
                title: 'Coffee Protein Shake | Thryv',
                description: 'Premium coffee protein shake with 25g complete protein and 100mg caffeine',
                keywords: ['protein', 'shake', 'coffee', 'energy']
            },
            createdBy: adminUserId
        },
        {
            sku: 'THRYV-STRWB-SACHET-001',
            name: 'Thryv Strawberry Protein Sachet',
            description: 'Convenient single-serving strawberry protein powder. Perfect for on-the-go nutrition.',
            shortDescription: 'Strawberry protein powder sachet',
            price: 49,
            comparePrice: 59,
            category: categoryIds.sachetsCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Gemini_Generated_Image_eqwraqeqwraqeqwr.png?updatedAt=1754596780461',
                    alt: 'Strawberry Protein Sachet',
                    isPrimary: true
                }
            ],
            stock: {
                quantity: 200,
                lowStockThreshold: 20,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '5', '10', '30'],
                  prices: [
                    { size: 1, price: 49 },
                    { size: 5, price: 199 },
                    { size: 10, price: 349 },
                    { size: 30, price: 999 }
                  ]
                }
            ],
            attributes: [
                { name: 'Flavor', value: 'Strawberry' },
                { name: 'Protein', value: '25g' },
                { name: 'Serving Size', value: '30g' },
                { name: 'Format', value: 'Powder Sachet' }
            ],
            tags: ['protein', 'powder', 'sachet', 'strawberry', 'portable'],
            status: 'active',
            isFeatured: true,
            weight: 30,
            dimensions: {
                length: 10,
                width: 8,
                height: 1
            },
            seo: {
                title: 'Strawberry Protein Powder Sachet | Thryv',
                description: 'Convenient single-serving strawberry protein powder sachet with 25g protein',
                keywords: ['protein', 'powder', 'sachet', 'strawberry', 'portable']
            },
            createdBy: adminUserId
        },
        {
            sku: 'THRYV-CHOCO-SACHET-001',
            name: 'Thryv Chocolate Protein Sachet',
            description: 'Rich chocolate protein powder in convenient single-serving sachets. Mix with water or milk.',
            shortDescription: 'Chocolate protein powder sachet',
            price: 49,
            comparePrice: 59,
            category: categoryIds.sachetsCategory,
            brand: 'Thryv',
            images: [
                {
                    url: 'https://ik.imagekit.io/os1mzoooe/Gemini_Generated_Image_5n3okc5n3okc5n3o.png?updatedAt=1754596780335',
                    alt: 'Chocolate Protein Sachet',
                    isPrimary: true
                }
            ],
            stock: {
                quantity: 200,
                lowStockThreshold: 20,
                trackStock: true
            },
            variants: [
                {
                  name: 'Pack Size',
                  options: ['1', '5', '10', '30'],
                  prices: [
                    { size: 1, price: 49 },
                    { size: 5, price: 199 },
                    { size: 10, price: 349 },
                    { size: 30, price: 999 }
                  ]
                }
            ],
            attributes: [
                { name: 'Flavor', value: 'Chocolate' },
                { name: 'Protein', value: '25g' },
                { name: 'Serving Size', value: '30g' },
                { name: 'Format', value: 'Powder Sachet' }
            ],
            tags: ['protein', 'powder', 'sachet', 'chocolate', 'portable'],
            status: 'active',
            isFeatured: true,
            weight: 30,
            dimensions: {
                length: 10,
                width: 8,
                height: 1
            },
            seo: {
                title: 'Chocolate Protein Powder Sachet | Thryv',
                description: 'Rich chocolate protein powder sachet with 25g protein per serving',
                keywords: ['protein', 'powder', 'sachet', 'chocolate', 'portable']
            },
            createdBy: adminUserId
        },
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully');
};


const runSeed = async () => {
    try {
        const adminUserId = await getAdminUserId();
        const categoryIds = await seedCategories(adminUserId);
        await seedProducts(categoryIds, adminUserId);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

runSeed();
