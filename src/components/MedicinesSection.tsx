import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import kidneyImg from "@/assets/medicine-kidney.jpg";
import bloodImg from "@/assets/medicine-blood.jpg";
import digestiveImg from "@/assets/medicine-digestive.jpg";
import urinaryImg from "@/assets/medicine-urinary.jpg";

interface Medicine {
  name: string;
  hindi: string;
  tagline: string;
  category: "kidney" | "blood" | "digestive" | "urinary";
  image: string;
  details: string;
  usage: string;
  purpose: string;
  timeframe: string;
  benefits: string[];
  precautions: string;
}

const medicines: Medicine[] = [
  {
    name: "Nephrocare Syrup", hindi: "नेफ्रोकेयर सिरप", tagline: "Kidney health support", category: "kidney", image: kidneyImg,
    details: "A proprietary Charak Samhita-based formulation with Punarnava, Gokshura, and Varun Bark to support healthy kidney function and renal wellness. 100% herbal, zero side-effects.",
    usage: "2 teaspoons (10 ml) twice daily, with lukewarm water, after meals.",
    purpose: "Supports kidney function, healthy creatinine levels, and overall renal wellness.",
    timeframe: "Most patients notice improvements within 4–6 weeks of consistent use.",
    benefits: ["Supports natural kidney function", "Promotes healthy urine output", "Helps maintain electrolyte balance", "100% herbal · zero side-effects"],
    precautions: "Pregnant or lactating women and children under 12 should consult a practitioner before use.",
  },
  {
    name: "Raktashodhak Syrup", hindi: "रक्तशोधक सिरप", tagline: "Blood purification support", category: "blood", image: bloodImg,
    details: "Traditional blood purification formula with Neem, Manjistha, and Sariva supporting the body's natural detoxification and skin health.",
    usage: "2 teaspoons (10 ml) twice daily after meals, ideally with water.",
    purpose: "Supports natural blood detoxification, healthy skin, and reduces toxin build-up.",
    timeframe: "Visible skin improvements typically appear within 3–8 weeks.",
    benefits: ["Supports natural blood purification", "Promotes healthy, clear skin", "Aids detoxification processes", "Rich in antioxidant herbs"],
    precautions: "Avoid during acute illness without practitioner guidance.",
  },
  {
    name: "Digestocare Tonic", hindi: "डाइजेस्टोकेयर टॉनिक", tagline: "Digestive wellness", category: "digestive", image: digestiveImg,
    details: "Ayurvedic digestive tonic with Triphala, Amla, and Haritaki for healthy digestion, nutrient absorption, and gut wellness.",
    usage: "1–2 teaspoons before meals, twice daily.",
    purpose: "Supports digestion, nutrient absorption, and a balanced gut.",
    timeframe: "Most users feel improvement within 2–3 weeks.",
    benefits: ["Supports healthy digestion", "Promotes nutrient absorption", "Gentle on the stomach", "Enhances overall vitality"],
    precautions: "Discontinue if loose stools persist; consult a practitioner.",
  },
  {
    name: "Urostan Syrup", hindi: "यूरोस्टान सिरप", tagline: "Urinary tract support", category: "urinary", image: urinaryImg,
    details: "Specialized Ayurvedic formula with Varun, Gokhru, and Pashanbhed for urinary tract wellness and healthy kidney stone management.",
    usage: "2 teaspoons (10 ml) thrice daily with plenty of water.",
    purpose: "Supports urinary tract comfort and healthy stone management.",
    timeframe: "Symptomatic relief typically within 2–4 weeks; full course 8–12 weeks.",
    benefits: ["Supports urinary tract health", "Natural diuretic support", "Promotes comfortable function", "GMP-certified quality"],
    precautions: "Increase water intake while using. Consult a practitioner for large stones.",
  },
];

const categories = ["all", "kidney", "blood", "digestive", "urinary"] as const;
type Category = (typeof categories)[number];

const ease = [0.16, 1, 0.3, 1] as const;

const MedicinesSection = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const { ref, isVisible } = useScrollReveal();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return medicines.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (!q) return true;
      return [m.name, m.hindi, m.tagline].some((s) => s.toLowerCase().includes(q));
    });
  }, [query, category]);

  return (
    <section id="medicines" className="py-section bg-secondary/40">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="label-tag">{t("medicines.tag")}</p>
          <h2 className="heading-lg mt-3 text-foreground">
            <em className="italic">{t("medicines.title_em")}</em> {t("medicines.title_1")}
          </h2>
          <p className="body-lg mt-4">{t("medicines.subtitle")}</p>
        </div>

        {/* Search + chips */}
        <div className="flex flex-col gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("medicines.search_placeholder")}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card/80 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-body text-sm"
              aria-label={t("medicines.search_placeholder")}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full font-body text-xs font-medium tracking-wide transition-all duration-300 border ${
                    category === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {t(`medicines.categories.${c}`)}
                </button>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground">
              {t("medicines.count", { shown: filtered.length, total: medicines.length })}
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto">
            <p className="font-body text-sm text-muted-foreground">{t("medicines.empty")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((med, i) => (
              <div
                key={med.name}
                className={`card-glass overflow-hidden group cursor-pointer transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setSelected(med)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={med.image}
                    alt={med.name}
                    loading="lazy"
                    width={512}
                    height={640}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] text-accent font-body font-semibold tracking-wider uppercase">{med.tagline}</p>
                  <h3 className="font-display text-xl text-foreground mt-1">{med.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">{med.hindi}</p>
                  <button className="mt-4 flex items-center gap-1.5 font-body text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                    {t("medicines.learn")} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal — unchanged */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="label-tag">{t("medicines.purpose")}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.purpose}</p>
                  </div>
                  <div>
                    <p className="label-tag">{t("medicines.timeframe")}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.timeframe}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="label-tag">{t("medicines.usage")}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.usage}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-body font-semibold text-sm text-foreground mb-3">{t("medicines.benefits")}</p>
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
                    <strong>{t("medicines.precautions_label")}:</strong> {selected.precautions} {t("medicines.precautions_full")}
                  </p>
                </div>
                <a href="#contact" onClick={() => setSelected(null)} className="btn-primary w-full mt-6 justify-center">
                  {t("medicines.consult")}
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
