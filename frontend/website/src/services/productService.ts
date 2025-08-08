import axios from 'axios';

const API_URL = 'http://localhost:3500/api/products';

export interface Product {
  _id: string;
  id: string;
  name: string;
  flavor: string;
  description: string;
  image: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  prices: Record<number, number>;
  features: string[];
  gradient: string;
  bgGradient: string;
}
// Update the getProducts function
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data?.data?.products) {
      throw new Error('Invalid API response structure');
    }

    return response.data.data.products.map((product: any) => {
      const flavorAttr = product.attributes?.find((attr: any) => attr.name === 'Flavor')?.value || '';
      const primaryImage = product.images?.find((img: any) => img.isPrimary)?.url || 
                         product.images?.[0]?.url || '';
      
      // Get all images or fallback to single image
      const allImages = product.images || [];

      // Create price mapping from variants
      const priceObj: Record<number, number> = {};
      
      if (product.variants && product.variants.length > 0 && product.variants[0].prices) {
        product.variants[0].prices.forEach((priceItem: any) => {
          priceObj[priceItem.size] = priceItem.price;
        });
      } else {
        // Fallback to root level price if no variants
        priceObj[1] = product.price;
      }

      const features = product.attributes?.map((attr: any) => 
        `${attr.name}: ${attr.value}`
      ) || [];

      return {
        _id: product._id || '',
        id: product._id || '',
        name: product.name || '',
        flavor: flavorAttr,
        description: product.description || '',
        image: primaryImage,
        images: allImages,
        prices: priceObj,
        features,
        gradient: getGradient(flavorAttr),
        bgGradient: getBgGradient(flavorAttr)
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Handle specific error types
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else if (error.response && error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        throw new Error('Cannot connect to server. Please check if the backend is running.');
      }
    }
    
    throw error;
  }
};

// Update the getProductById function similarly
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const product = response.data?.data?.product;
    
    if (!product) {
      throw new Error('Product not found');
    }

    const flavorAttr = product.attributes?.find((attr: any) => attr.name === 'Flavor')?.value || '';
    const primaryImage = product.images?.find((img: any) => img.isPrimary)?.url || 
                       product.images?.[0]?.url || '';

    // Get all images or fallback to single image
    const allImages = product.images || [];

    // Create price mapping from variants
    const priceObj: Record<number, number> = {};
    
    if (product.variants && product.variants.length > 0 && product.variants[0].prices) {
      product.variants[0].prices.forEach((priceItem: any) => {
        priceObj[priceItem.size] = priceItem.price;
      });
    } else {
      // Fallback to root level price if no variants
      priceObj[1] = product.price;
    }

    const features = product.attributes?.map((attr: any) => 
      `${attr.name}: ${attr.value}`
    ) || [];

    return {
      _id: product._id || '',
      id: product._id || '',
      name: product.name || '',
      flavor: flavorAttr,
      description: product.description || '',
      image: primaryImage,
      images: allImages,
      prices: priceObj,
      features,
      gradient: getGradient(flavorAttr),
      bgGradient: getBgGradient(flavorAttr)
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Get bestseller products
export const getBestsellers = async (limit: number = 4): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/bestsellers?limit=${limit}`, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data?.data?.products) {
      throw new Error('Invalid API response structure');
    }

    return response.data.data.products.map((product: any) => {
      const flavorAttr = product.attributes?.find((attr: any) => attr.name === 'Flavor')?.value || '';
      const primaryImage = product.images?.find((img: any) => img.isPrimary)?.url || 
                         product.images?.[0]?.url || '';

      // Use the existing prices from the transformed product
      const priceObj = product.prices || { 1: product.price };
      
      // Get all images or fallback to single image
      const allImages = product.images || [];

      const features = product.attributes?.map((attr: any) => 
        `${attr.name}: ${attr.value}`
      ) || [];

      return {
        _id: product._id,
        id: product._id,
        name: product.name,
        flavor: flavorAttr,
        description: product.description || product.shortDescription || '',
        image: primaryImage,
        images: allImages,
        prices: priceObj,
        features,
        gradient: getGradient(flavorAttr),
        bgGradient: getBgGradient(flavorAttr)
      };
    });
  } catch (error) {
    console.error('Error fetching bestsellers:', error);
    throw error;
  }
};

const getGradient = (flavor: string): string => {
  switch (flavor.toLowerCase()) {
    case 'strawberry':
      return 'from-pink-400 to-red-400';
    case 'chocolate':
      return 'from-amber-600 to-amber-800';
    case 'vanilla':
      return 'from-yellow-300 to-yellow-500';
    case 'coffee':
      return 'from-amber-800 to-stone-800';
    case 'mixed':
      return 'from-purple-400 to-pink-400';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

const getBgGradient = (flavor: string): string => {
  switch (flavor.toLowerCase()) {
    case 'strawberry':
      return 'bg-gradient-to-br from-pink-50 to-red-50';
    case 'chocolate':
      return 'bg-gradient-to-br from-amber-50 to-orange-50';
    case 'vanilla':
      return 'bg-gradient-to-br from-yellow-50 to-amber-50';
    case 'coffee':
      return 'bg-gradient-to-br from-stone-50 to-amber-50';
    case 'mixed':
      return 'bg-gradient-to-br from-purple-50 to-pink-50';
    default:
      return 'bg-gradient-to-br from-gray-50 to-gray-100';
  }
};
