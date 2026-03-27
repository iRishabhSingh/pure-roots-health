import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import kidneyImg from "@/assets/medicine-kidney.jpg";
import bloodImg from "@/assets/medicine-blood.jpg";
import digestiveImg from "@/assets/medicine-digestive.jpg";
import urinaryImg from "@/assets/medicine-urinary.jpg";

interface Medicine {
  name: string;
  hindi: string;
  shortDesc: string;
  image: string;
  details: string;
  benefits: string[];
}

const medicines: Medicine[] = [
  {
    name: "Nephrocare Syrup",
    hindi: "नेफ्रोकेयर सिरप",
    shortDesc: "Supports kidney health and natural renal function",
    image: kidneyImg,
    details: "A proprietary Ayurvedic formulation designed to support healthy kidney function. Made with Punarnava, Gokshura, and Varun Bark — herbs traditionally used to promote renal wellness.",
    benefits: ["Supports natural kidney function", "Promotes healthy urine output", "Helps maintain electrolyte balance", "Made with 100% natural herbs"],
  },
  {
    name: "Raktashodhak Syrup",
    hindi: "रक्तशोधक सिरप",
    shortDesc: "Ayurvedic blood purification support",
    image: bloodImg,
    details: "A traditional blood purification formula with Neem, Manjistha, and Sariva. Supports the body's natural detoxification processes and promotes clear, healthy skin.",
    benefits: ["Supports natural blood purification", "Promotes healthy skin", "Aids the body's detox processes", "Rich in antioxidant herbs"],
  },
  {
    name: "Digestocare Tonic",
    hindi: "डाइजेस्टोकेयर टॉनिक",
    shortDesc: "Complete digestive health and wellness tonic",
    image: digestiveImg,
    details: "An Ayurvedic digestive tonic formulated with Triphala, Amla, and Haritaki. Supports healthy digestion, nutrient absorption, and overall gut wellness.",
    benefits: ["Supports healthy digestion", "Promotes nutrient absorption", "Gentle on the stomach", "Enhances overall vitality"],
  },
  {
    name: "Urostan Syrup",
    hindi: "यूरोस्टान सिरप",
    shortDesc: "Urinary health and kidney stone support",
    image: urinaryImg,
    details: "A specialized Ayurvedic formula with Varun, Gokhru, and Pashanbhed for urinary tract wellness. Supports healthy urinary function and helps maintain comfort.",
    benefits: ["Supports urinary tract health", "Promotes healthy kidney stone management", "Natural diuretic support", "GMP-certified formulation"],
  },
];

const MedicinesSection = () => {
  const [selected, setSelected] = useState<Medicine | null>(null);

  return (
    <section id="medicines" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">Our Medicines</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Proprietary Formulas</h2>
          <p className="mt-4 text-muted-foreground">Authentic Ayurvedic medicines crafted with GMP-certified processes for purity and efficacy.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((med, i) => (
            <motion.div
              key={med.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated overflow-hidden group"
            >
              <div className="aspect-square overflow-hidden">
                <img src={med.image} alt={med.name} loading="lazy" width={512} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-foreground">{med.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{med.hindi}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{med.shortDesc}</p>
                <button
                  onClick={() => setSelected(med)}
                  className="mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  Learn More →
                </button>
              </div>
            </motion.div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <img src={selected.image} alt={selected.name} className="w-full h-56 object-cover rounded-t-2xl" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-background/80 backdrop-blur rounded-full p-2"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.hindi}</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">{selected.details}</p>
                <h4 className="mt-5 font-semibold text-foreground">Benefits</h4>
                <ul className="mt-2 space-y-2">
                  {selected.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-accent/10 rounded-xl">
                  <p className="text-xs text-muted-foreground italic">
                    ⚠️ Disclaimer: Consult a qualified healthcare practitioner before use. This product is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MedicinesSection;
