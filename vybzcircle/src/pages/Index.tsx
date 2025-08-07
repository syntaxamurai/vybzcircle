
import Categories from "../components/Categories";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      <Hero />
      <Categories />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
