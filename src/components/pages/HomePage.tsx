import Header from "../Home/Header";
import Hero from "../Home/Hero";
import ProductGrid from "../Home/ProductGrid";
import Features from "../Home/Features";
import Reviews from "../Home/Review";
import { useState } from "react";

const HomePage = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleAddToCart = (
        productId: string,
        quantity: number,
        packSize: number // Changed to match ProductGridProps
    ) => {
        // Implement your add to cart logic here
        setCartCount(prev => prev + quantity);
        console.log(`Added ${quantity} of product ${productId} (pack size: ${packSize})`);
    };

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <>
            <Header 
                cartCount={cartCount} 
                onCartClick={handleCartClick} 
            />
            <Hero />
            <ProductGrid onAddToCart={handleAddToCart} />
            <Features />
            <Reviews />
        </>
    );
}

export default HomePage;