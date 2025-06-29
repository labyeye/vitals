import Header from "../Header";
import Hero from "../Hero";
import Footer from "../Footer";
import ProductGrid from "../ProductGrid";
import Features from "../Features";
import Reviews from "../Review";

const HomePage = () => {
    return(
        <>
            <Header />
            <Hero />
            <ProductGrid/>
            <Features />
            <Reviews/>
            <Footer />
        </>
    );
}
export default HomePage;
