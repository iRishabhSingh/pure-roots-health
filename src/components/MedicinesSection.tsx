import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { medicines, issueChips, whatsappConsultUrl, type Medicine, type IssueKey } from "@/data/medicines";

const ease = [0.16, 1, 0.3, 1] as const;
type ChipKey = IssueKey | "all";

const MedicinesSection = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Medicine | null>(null);
  const [issue, setIssue] = useState<ChipKey>("all");
  const { ref, isVisible } = useScrollReveal();

  const visible = useMemo(() => {
    const pool = issue === "all" ? medicines : medicines.filter((m) => m.category === issue);
    // Featured first, then the rest. Cap at 8 for the homepage strip.
    return [...pool].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, 8);
  }, [issue]);

  return (
    <section id="medicines" className="py-section bg-secondary/40">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="label-tag">{t("medicines.tag")}</p>
          <h2 className="heading-lg mt-3 text-foreground">
            <em className="italic">{t("medicines.title_em")}</em> {t("medicines.title_1")}
          </h2>
          <p className="body-lg mt-4">{t("medicines.subtitle")}</p>
        </div>

        {/* Storyline prompt + issue chips */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-center font-body text-sm text-muted-foreground mb-4">
            {t("medicines.prompt")}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {issueChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => setIssue(chip.key)}
                className={`px-4 py-1.5 rounded-full font-body text-xs font-medium tracking-wide transition-all duration-300 border ${
                  issue === chip.key
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card/60 text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {t(`medicines.issues.${chip.key}`, chip.label)}
              </button>
            ))}
          </div>
          <p className="text-center font-body text-xs text-muted-foreground/70 mt-3">
            {t("medicines.count", { shown: visible.length, total: medicines.length })}
          </p>
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto">
            <p className="font-body text-sm text-muted-foreground">{t("medicines.empty")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visible.map((med, i) => (
              <motion.div
                key={med.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.5, ease, delay: Math.min(i * 0.05, 0.4) }}
                className="card-glass overflow-hidden group cursor-pointer"
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
                  {med.hindi && <p className="font-body text-xs text-muted-foreground mt-0.5">{med.hindi}</p>}
                  <button className="mt-4 flex items-center gap-1.5 font-body text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-300">
                    {t("medicines.learn")} <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View-all CTA */}
        <div className="mt-10 text-center">
          <Link
            to="medicines"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/40 hover:text-primary transition-colors font-body text-sm font-medium text-foreground"
          >
            {t("medicines.view_all", { total: medicines.length })}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Modal */}
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
                {selected.hindi && <p className="font-body text-sm text-muted-foreground">{selected.hindi}</p>}
                <p className="body-lg mt-5 text-sm">{selected.details}</p>

                {(selected.purpose || selected.timeframe || selected.usage) && (
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    {selected.purpose && (
                      <div>
                        <p className="label-tag">{t("medicines.purpose")}</p>
                        <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.purpose}</p>
                      </div>
                    )}
                    {selected.timeframe && (
                      <div>
                        <p className="label-tag">{t("medicines.timeframe")}</p>
                        <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.timeframe}</p>
                      </div>
                    )}
                    {selected.usage && (
                      <div className="sm:col-span-2">
                        <p className="label-tag">{t("medicines.usage")}</p>
                        <p className="font-body text-sm text-muted-foreground mt-1.5">{selected.usage}</p>
                      </div>
                    )}
                  </div>
                )}

                {selected.benefits && selected.benefits.length > 0 && (
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
                )}

                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/15 flex items-start gap-3">
                  <MessageCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">{t("medicines.vaidya_label")}:</strong>{" "}
                    {t("medicines.vaidya_note")}
                  </p>
                </div>
                <a
                  href={whatsappConsultUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelected(null)}
                  className="btn-primary w-full mt-6 justify-center"
                >
                  <MessageCircle size={16} />
                  {t("medicines.consult_about", { name: selected.name })}
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
