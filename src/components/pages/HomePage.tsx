import Header from "../Home/Header";
import Hero from "../Home/Hero";
import ProductGrid from "../Home/ProductGrid";
import Features from "../Home/Features";
import Reviews from "../Home/Review";

const HomePage = () => {
    return(
        <>
            <Header />
            <Hero />
            <ProductGrid/>
            <Features />
            <Reviews/>
        </>
    );
}
export default HomePage;
