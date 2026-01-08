import { Helmet } from "react-helmet-async";
import Navbar from "@/components/aapa/Navbar";
import Hero from "@/components/aapa/Hero";
import OurStory from "@/components/aapa/OurStory";
import Products from "@/components/aapa/Products";
import PreLaunchNote from "@/components/aapa/PreLaunchNote";
import Testimonials from "@/components/aapa/Testimonials";
import InstagramFeed from "@/components/aapa/InstagramFeed";
import Footer from "@/components/aapa/Footer";
import CartDrawer from "@/components/aapa/CartDrawer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The Aapa Foods - Authentic Homemade Kashmiri Aanchar.</title>
        <meta
          name="description"
          content="Handcrafted Kashmiri pickles made with 60+ years of tradition. Small-batch, natural, preservative-free anchaars from Aapa's kitchen to your table."
        />
        <meta
          name="keywords"
          content="Kashmiri pickle, anchaar, traditional food, handmade pickle, natural pickle, Indian pickle, Kashmir food"
        />
        <meta
          property="og:title"
          content="The Aapa Foods | Authentic Kashmiri Anchaar"
        />
        <meta
          property="og:description"
          content="Handcrafted Kashmiri pickles made with 60+ years of tradition. Small-batch, natural, preservative-free anchaars."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://theaapafoods.in" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <OurStory />
        <Products />
        <PreLaunchNote />
        <Testimonials />
        <InstagramFeed />
        <Footer />
        <CartDrawer />
      </main>
    </>
  );
};

export default Index;
