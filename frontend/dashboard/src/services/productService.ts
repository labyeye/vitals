import axios from 'axios';

const API_URL = 'https://vitals-iu4r.onrender.com/api/admin/products';

// Create axios instance with auth interceptor
const apiClient = axios.create({
  timeout: 10000,
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dashboard_token');
    console.log('Auth token:', token ? 'Token exists' : 'No token found');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface Product {
  _id: string;
  sku: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  comparePrice?: number;
  category: {
    _id: string;
    name: string;
  };
  brand: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  stock: {
    quantity: number;
    lowStockThreshold: number;
    trackStock: boolean;
  };
  variants?: Array<{
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
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  profit: number;
  status: string;
  category: string;
  image: string;
  lowStockThreshold: number;
}

// Get all products for dashboard
export const getDashboardProducts = async (): Promise<DashboardProduct[]> => {
  try {
    const response = await apiClient.get(API_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data?.data?.products) {
      throw new Error('Invalid API response structure');
    }

    return response.data.data.products.map((product: Product) => {
      // Calculate stock status
      let stockStatus = 'In Stock';
      if (product.stock.quantity === 0) {
        stockStatus = 'Out of Stock';
      } else if (product.stock.quantity <= product.stock.lowStockThreshold) {
        stockStatus = 'Low Stock';
      }

      // Get primary image
      const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                         product.images?.[0]?.url || '';

      // Calculate profit margin (assuming 30% default if not available)
      const profitMargin = product.comparePrice 
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 30;

      return {
        id: product._id,
        sku: product.sku,
        name: product.name,
        price: product.price,
        stock: product.stock.quantity,
        sales: 0, // This would come from sales data in a real system
        profit: profitMargin,
        status: stockStatus,
        category: product.category.name,
        image: primaryImage,
        lowStockThreshold: product.stock.lowStockThreshold
      };
    });
  } catch (error: any) {
    console.error('Error fetching dashboard products:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Products not found');
      } else if (error.response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw new Error('Failed to fetch products. Please try again.');
  }
};

// Get product statistics
export const getProductStats = async () => {
  try {
    const products = await getDashboardProducts();
    
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.status === 'In Stock').length;
    const lowStockProducts = products.filter(p => p.status === 'Low Stock').length;
    const outOfStockProducts = products.filter(p => p.status === 'Out of Stock').length;
    
    return {
      totalProducts,
      inStockProducts,
      lowStockProducts,
      outOfStockProducts,
      inStockPercentage: totalProducts > 0 ? Math.round((inStockProducts / totalProducts) * 100) : 0
    };
  } catch (error: any) {
    console.error('Error fetching product stats:', error);
    throw error;
  }
};

// Get single product by ID
export const getProduct = async (productId: string): Promise<Product> => {
  try {
    const response = await apiClient.get(`${API_URL}/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data?.data) {
      throw new Error('Product not found');
    }

    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching product:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Product not found');
      } else if (error.response.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }

    throw new Error(error.message || 'Failed to fetch product');
  }
};

// Create new product
export const createProduct = async (productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await apiClient.post(API_URL, productData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await apiClient.put(`${API_URL}/${id}`, productData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return response.data.data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`${API_URL}/${id}`);
  } catch (error: any) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
