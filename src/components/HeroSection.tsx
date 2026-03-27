import { motion } from "framer-motion";
import { Shield, Award, Users } from "lucide-react";
import heroImg from "@/assets/hero-ayurveda.jpg";

const badges = [
  { icon: Shield, label: "100% Natural" },
  { icon: Award, label: "GMP Certified" },
  { icon: Users, label: "100+ Verified Results" },
];

const HeroSection = () => (
  <section id="home" className="relative pt-20 md:pt-24 overflow-hidden">
    <div className="section-container section-padding">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-6">
            GMP Certified Ayurvedic Medicine
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Ancient Ayurveda.{" "}
            <span className="text-gradient-primary">Modern Healing.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            Specializing in kidney health support and blood purification through time-tested Ayurvedic formulations. A holistic and natural approach to wellness.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#contact"
              className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity text-base"
            >
              Book Consultation
            </a>
            <a
              href="https://wa.me/919414636560"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary text-primary font-semibold px-7 py-3.5 rounded-xl hover:bg-primary/5 transition-colors text-base"
            >
              Contact on WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap gap-6 mt-10">
            {badges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon size={16} className="text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={heroImg}
              alt="Traditional Ayurvedic medicine preparation with herbs and mortar"
              width={1280}
              height={768}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
