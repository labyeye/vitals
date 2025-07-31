import Hero from "../Home/Hero";
import ProductGrid from "../Home/ProductGrid";
import Features from "../Home/Features";
import Reviews from "../Home/Review";

const HomePage = () => {
    const handleAddToCart = (
        productId: string,
        quantity: number,
        packSize: number
    ) => {
        // This will be handled by the parent component
        console.log(`Added ${quantity} of product ${productId} (pack size: ${packSize})`);
    };

    return (
        <>
            <Hero />
            <ProductGrid onAddToCart={handleAddToCart} />
            <Features />
            <Reviews />
        </>
    );
}

export default HomePage;