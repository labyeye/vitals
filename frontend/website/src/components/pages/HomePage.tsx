import React, { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { getProducts, Product } from "../../services/productService";
import Hero from "../Home/Hero";
import ProductGrid from "../Home/ProductGrid";
import Features from "../Home/Features";
import Reviews from "../Home/Review";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCartContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (
        productId: string,
        quantity: number,
        packSize: number
    ) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = {
                id: product.id,
                name: product.name,
                packSize: packSize,
                quantity: quantity,
                price: product.prices[packSize] || 0,
                image: product.image
            };
            addToCart(cartItem);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#688F4E] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
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
        <>
            <Hero />
            <ProductGrid products={products} onAddToCart={handleAddToCart} />
            <Features />
            <Reviews />
        </>
    );
}

export default HomePage;