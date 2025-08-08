import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Loader } from 'lucide-react';
import { createProduct, updateProduct, getProduct } from '../services/productService';

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string | null;
  onSuccess: () => void;
}

interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface ProductFormData {
  sku: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number;
  category: string;
  brand: string;
  images: ProductImage[];
  stock: {
    quantity: number;
    lowStockThreshold: number;
    trackStock: boolean;
  };
  variants: Array<{
    name: string;
    options: string[];
    prices: Array<{
      size: number;
      price: number;
    }>;
  }>;
  attributes: Array<{
    name: string;
    value: string;
  }>;
  tags: string[];
  status: 'active' | 'inactive' | 'draft';
  isFeatured: boolean;
  isBestSeller: boolean;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const AddProduct: React.FC<AddProductProps> = ({ isOpen, onClose, productId, onSuccess }) => {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: '',
    name: '',
    description: '',
    shortDescription: '',
    price: 0,
    comparePrice: 0,
    category: '',
    brand: '',
    images: [],
    stock: {
      quantity: 0,
      lowStockThreshold: 10,
      trackStock: true
    },
    variants: [],
    attributes: [],
    tags: [],
    status: 'active',
    isFeatured: false,
    isBestSeller: false,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(false);

  // Load product data when editing
  useEffect(() => {
    const loadProduct = async () => {
      if (productId && isOpen) {
        try {
          setLoadingProduct(true);
          const product = await getProduct(productId);
          
          setFormData({
            sku: product.sku,
            name: product.name,
            description: product.description,
            shortDescription: product.shortDescription || '',
            price: product.price,
            comparePrice: product.comparePrice || 0,
            category: typeof product.category === 'object' ? product.category.name : product.category,
            brand: product.brand,
            images: product.images.map(img => ({
              url: img.url,
              alt: img.alt,
              isPrimary: img.isPrimary
            })),
            stock: product.stock,
            variants: product.variants || [],
            attributes: product.attributes || [],
            tags: product.tags || [],
            status: product.status,
            isFeatured: product.isFeatured,
            isBestSeller: product.isBestSeller,
            weight: product.weight || 0,
            dimensions: product.dimensions || { length: 0, width: 0, height: 0 },
            seo: product.seo || { title: '', description: '', keywords: [] }
          });
        } catch (error) {
          console.error('Error loading product:', error);
          alert('Failed to load product data');
        } finally {
          setLoadingProduct(false);
        }
      } else if (!productId && isOpen) {
        // Reset form for new product
        setFormData({
          sku: '',
          name: '',
          description: '',
          shortDescription: '',
          price: 0,
          comparePrice: 0,
          category: '',
          brand: '',
          images: [],
          stock: {
            quantity: 0,
            lowStockThreshold: 10,
            trackStock: true
          },
          variants: [],
          attributes: [],
          tags: [],
          status: 'active',
          isFeatured: false,
          isBestSeller: false,
          weight: 0,
          dimensions: {
            length: 0,
            width: 0,
            height: 0
          },
          seo: {
            title: '',
            description: '',
            keywords: []
          }
        });
      }
    };

    loadProduct();
  }, [productId, isOpen]);

  const handleAddImageUrl = () => {
    if (!currentImageUrl.trim()) {
      alert('Please enter a valid image URL');
      return;
    }
    
    if (formData.images.length >= 5) {
      alert('Maximum 5 images allowed per product');
      return;
    }

    const newImage: ProductImage = {
      url: currentImageUrl.trim(),
      alt: formData.name || 'Product image',
      isPrimary: formData.images.length === 0
    };

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newImage]
    }));
    
    setCurrentImageUrl('');
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index).map((img, i) => ({
        ...img,
        isPrimary: i === 0 && prev.images.length > 1
      }))
    }));
  };

  const setPrimaryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('Please add at least one product image');
      return;
    }

    try {
      setLoading(true);
      
      // Transform data to match API expectations
      const productData = {
        sku: formData.sku,
        name: formData.name,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: formData.price,
        comparePrice: formData.comparePrice,
        category: formData.category, // Will be handled by backend to find/create category
        brand: formData.brand,
        images: formData.images.map(img => ({
          url: img.url,
          alt: img.alt,
          isPrimary: img.isPrimary
        })),
        stock: formData.stock,
        variants: formData.variants,
        attributes: formData.attributes,
        tags: formData.tags,
        status: formData.status,
        isFeatured: formData.isFeatured,
        isBestSeller: formData.isBestSeller,
        weight: formData.weight,
        dimensions: formData.dimensions,
        seo: formData.seo
      };

      if (productId) {
        await updateProduct(productId, productData as any);
      } else {
        await createProduct(productData as any);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addAttribute = () => {
    setFormData(prev => ({
      ...prev,
      attributes: [...prev.attributes, { name: '', value: '' }]
    }));
  };

  const updateAttribute = (index: number, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const removeAttribute = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {productId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {loadingProduct ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading product data...</span>
            </div>
          ) : (
            <>
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Max 5) *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                      {!image.isPrimary && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(index)}
                          className="text-white text-xs bg-blue-600 px-2 py-1 rounded"
                        >
                          Set Primary
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-white bg-red-600 p-1 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    {image.isPrimary && (
                      <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {formData.images.length < 5 && (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={currentImageUrl}
                      onChange={(e) => setCurrentImageUrl(e.target.value)}
                      placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      disabled={!currentImageUrl.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add URL
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Add up to 5 image URLs. First image will be set as primary.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Price and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compare Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData(prev => ({ ...prev, comparePrice: parseFloat(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock.quantity}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  stock: { ...prev.stock, quantity: parseInt(e.target.value) || 0 }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Attributes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Attributes
              </label>
              <button
                type="button"
                onClick={addAttribute}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Attribute</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.attributes.map((attr, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Attribute name (e.g., Flavor)"
                    value={attr.name}
                    onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Attribute value (e.g., Chocolate)"
                    value={attr.value}
                    onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Product Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' | 'draft' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="mr-2"
              />
              Featured Product
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                className="mr-2"
              />
              Bestseller
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              <span>{loading ? 'Saving...' : (productId ? 'Update Product' : 'Create Product')}</span>
            </button>
          </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;