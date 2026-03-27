import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MedicinesSection from "@/components/MedicinesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationsSection from "@/components/LocationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <MedicinesSection />
      <TestimonialsSection />
      <LocationsSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingButtons />
  </>
);

export default Index;
