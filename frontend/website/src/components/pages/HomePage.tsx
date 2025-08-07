import React, { useState, useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { getProducts, Product } from "../../services/productService";
import Hero from "../Home/Hero";
import ProductGrid from "../Home/ProductGrid";
import Bestsellers from "../Home/Bestsellers";
import ProductRange from "../Home/ProductRange";
import ProductFilter from "../Home/ProductFilter";
import Features from "../Home/Features";
import ReviewsNew from "../Home/Review";
import SocialProof from "../Home/SocialProof";
import WhyChooseThryv from "../Home/WhyChooseVitals";
import CompetitiveAdvantage from "../Home/CompetitiveAdvantage";
import SignupModal from "../Home/SignupModal";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'shakes' | 'sachets'>('all');
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

    // Signup Modal Logic
    useEffect(() => {
        const checkSignupModal = () => {
            const signupComplete = localStorage.getItem('vitalsSignupComplete');
            const lastShown = localStorage.getItem('vitalsModalLastShown');
            const now = Date.now();
            
            // Don't show if user already signed up
            if (signupComplete === 'true') return;
            
            // Check if 30 minutes have passed since last shown
            if (lastShown) {
                const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
                if (now - parseInt(lastShown) < thirtyMinutes) return;
            }
            
            // Show modal after 3 seconds delay
            const timer = setTimeout(() => {
                setShowSignupModal(true);
                localStorage.setItem('vitalsModalLastShown', now.toString());
            }, 3000);
            
            return () => clearTimeout(timer);
        };
        
        checkSignupModal();
    }, []);

    const handleCloseSignupModal = () => {
        setShowSignupModal(false);
    };

    // Filter products based on selected category
    const filteredProducts = products.filter(product => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'shakes') {
            return product.name.toLowerCase().includes('shake') || 
                   product.name.toLowerCase().includes('protein shake');
        }
        if (selectedCategory === 'sachets') {
            return product.name.toLowerCase().includes('sachet') || 
                   product.name.toLowerCase().includes('powder');
        }
        return true;
    });

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
            <Bestsellers onAddToCart={handleAddToCart} />
            <ProductRange />
            <ProductFilter 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
            />
                        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />

            <WhyChooseThryv />
            <CompetitiveAdvantage />
            <Features />
            <ReviewsNew />
            <SocialProof />
            
            {/* Signup Modal */}
            <SignupModal 
                isVisible={showSignupModal} 
                onClose={handleCloseSignupModal} 
            />
        </>
    );
}

export default HomePage;