import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import kidneyImg from "@/assets/medicine-kidney.jpg";
import bloodImg from "@/assets/medicine-blood.jpg";
import digestiveImg from "@/assets/medicine-digestive.jpg";
import urinaryImg from "@/assets/medicine-urinary.jpg";

interface Medicine {
  name: string;
  hindi: string;
  tagline: string;
  image: string;
  details: string;
  benefits: string[];
}

const medicines: Medicine[] = [
  {
    name: "Nephrocare Syrup",
    hindi: "नेफ्रोकेयर सिरप",
    tagline: "Kidney health support",
    image: kidneyImg,
    details: "A proprietary Ayurvedic formulation with Punarnava, Gokshura, and Varun Bark to support healthy kidney function and renal wellness.",
    benefits: ["Supports natural kidney function", "Promotes healthy urine output", "Helps maintain electrolyte balance", "100% natural herbal ingredients"],
  },
  {
    name: "Raktashodhak Syrup",
    hindi: "रक्तशोधक सिरप",
    tagline: "Blood purification support",
    image: bloodImg,
    details: "Traditional blood purification formula with Neem, Manjistha, and Sariva supporting the body's natural detoxification and skin health.",
    benefits: ["Supports natural blood purification", "Promotes healthy, clear skin", "Aids detoxification processes", "Rich in antioxidant herbs"],
  },
  {
    name: "Digestocare Tonic",
    hindi: "डाइजेस्टोकेयर टॉनिक",
    tagline: "Digestive wellness",
    image: digestiveImg,
    details: "Ayurvedic digestive tonic with Triphala, Amla, and Haritaki for healthy digestion, nutrient absorption, and gut wellness.",
    benefits: ["Supports healthy digestion", "Promotes nutrient absorption", "Gentle on the stomach", "Enhances overall vitality"],
  },
  {
    name: "Urostan Syrup",
    hindi: "यूरोस्टान सिरप",
    tagline: "Urinary tract support",
    image: urinaryImg,
    details: "Specialized Ayurvedic formula with Varun, Gokhru, and Pashanbhed for urinary tract wellness and healthy kidney stone management.",
    benefits: ["Supports urinary tract health", "Natural diuretic support", "Promotes comfortable function", "GMP-certified quality"],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const MedicinesSection = () => {
  const [selected, setSelected] = useState<Medicine | null>(null);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="medicines" className="py-section bg-secondary/40">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="label-tag">Our Medicines</p>
          <h2 className="heading-lg mt-3 text-foreground">
            <em className="italic">Proprietary</em> formulations
          </h2>
          <p className="body-lg mt-4">
            GMP-certified Ayurvedic medicines crafted for purity, potency, and results.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {medicines.map((med, i) => (
            <div
              key={med.name}
              className={`card-glass overflow-hidden group cursor-pointer transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setSelected(med)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={med.image}
                  alt={med.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5">
                <p className="text-[11px] text-accent font-body font-semibold tracking-wider uppercase">{med.tagline}</p>
                <h3 className="font-display text-xl text-foreground mt-1">{med.name}</h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{med.hindi}</p>
                <button className="mt-4 flex items-center gap-1.5 font-body text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(160 15% 12% / 0.6)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <img src={selected.image} alt={selected.name} className="w-full h-52 object-cover rounded-t-3xl" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur rounded-full flex items-center justify-center"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-7">
                <p className="label-tag">{selected.tagline}</p>
                <h3 className="font-display text-2xl text-foreground mt-1">{selected.name}</h3>
                <p className="font-body text-sm text-muted-foreground">{selected.hindi}</p>
                <p className="body-lg mt-5 text-sm">{selected.details}</p>
                <div className="mt-6">
                  <p className="font-body font-semibold text-sm text-foreground mb-3">Key Benefits</p>
                  <div className="space-y-2.5">
                    {selected.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="font-body text-sm text-muted-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/8 rounded-xl border border-accent/15">
                  <p className="font-body text-xs text-muted-foreground">
                    ⚠️ Consult a qualified healthcare practitioner before use. Not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
                <a href="#contact" onClick={() => setSelected(null)} className="btn-primary w-full mt-6 justify-center">
                  Consult About This Medicine
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MedicinesSection;
