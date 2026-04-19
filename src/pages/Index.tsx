import AccessibilityBar from "@/components/AccessibilityBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import MedicinesSection from "@/components/MedicinesSection";
import CertificationsSection from "@/components/CertificationsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationsSection from "@/components/LocationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import LanguagePrompt from "@/components/LanguagePrompt";

const Index = () => (
  <>
    <AccessibilityBar />
    <Navbar />
    <main>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <MedicinesSection />
      <CertificationsSection />
      <TestimonialsSection />
      <LocationsSection />
      <ContactSection />
    </main>
    <Footer />
    <FloatingButtons />
    <LanguagePrompt />
  </>
);

export default Index;
