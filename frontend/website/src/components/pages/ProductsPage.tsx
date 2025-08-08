import React, { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import ProductGrid from "../Home/ProductGrid";
import Reviews from "../Home/Review";
import { getProducts } from "../../services/productService";
import { CartItem } from "../Home/Cart";
interface Product {
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

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCartContext();

  // Filter states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError('');
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Unique categories (flavors)
  const uniqueCategories = Array.from(new Set(products.map(p => p.flavor).filter(Boolean)));

  // Filtering logic
  const getFilteredProducts = () => {
    let filtered = [...products];
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(p => p.flavor === category);
    }
    if (minPrice) {
      filtered = filtered.filter(p => {
        const min = Number(minPrice);
        return Object.values(p.prices).some(price => price >= min);
      });
    }
    if (maxPrice) {
      filtered = filtered.filter(p => {
        const max = Number(maxPrice);
        return Object.values(p.prices).some(price => price <= max);
      });
    }
    if (sort) {
      if (sort === 'priceLowHigh') {
        filtered.sort((a, b) => Math.min(...Object.values(a.prices)) - Math.min(...Object.values(b.prices)));
      } else if (sort === 'priceHighLow') {
        filtered.sort((a, b) => Math.max(...Object.values(b.prices)) - Math.max(...Object.values(a.prices)));
      } else if (sort === 'nameAZ') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'nameZA') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
  };

  const handleAddToCart = (productId: string, quantity: number, packSize: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const price = product.prices[packSize] || 0;
    const cartItem = {
      id: productId,
      name: product.name,
      packSize,
      quantity,
      price,
      image: product.image
    };
    addToCart(cartItem);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#688F4E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#688F4E] text-white px-4 py-2 rounded hover:bg-[#2B463C] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F4F1E9]/30 to-white mt-40">
      <main className="max-w-7xl mx-auto px-4">
        {/* Filter Panel Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            className="bg-[#688F4E] text-white px-4 py-2 rounded hover:bg-[#2B463C] transition-colors"
            onClick={() => setShowFilters(f => !f)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name or description"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border px-2 py-1 rounded w-48"
            />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border px-2 py-1 rounded w-40"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="border px-2 py-1 rounded w-28"
              min="0"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="border px-2 py-1 rounded w-28"
              min="0"
            />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="border px-2 py-1 rounded w-40"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="nameAZ">Name: A-Z</option>
              <option value="nameZA">Name: Z-A</option>
            </select>
            <button
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <span className="ml-auto text-gray-500">{filteredProducts.length} results</span>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
};

export default ProductPage;