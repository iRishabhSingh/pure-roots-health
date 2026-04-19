import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import cert1 from "@/assets/cert-placeholder-1.jpg";
import cert2 from "@/assets/cert-placeholder-2.jpg";
import cert3 from "@/assets/cert-placeholder-3.jpg";
import cert4 from "@/assets/cert-placeholder-4.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const certs = [
  { image: cert1, key: "bams" },
  { image: cert2, key: "gmp" },
  { image: cert3, key: "ayush" },
  { image: cert4, key: "award" },
];

/**
 * 4-card stack — symmetric fan with the active card in front.
 * Distance forward from active (wrapped) maps to a depth slot 0..3:
 *   0 = front (active), 1 = right-back, 2 = deepest, 3 = left-back
 */
const depthFor = (index: number, active: number, total: number) => {
  const fwd = (index - active + total) % total;
  // 4-card layout: 0→front, 1→right-back, 2→deepest, 3→left-back
  const map: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3 };
  return map[fwd] ?? 2;
};

const slotStyles: Record<number, { y: number; x: number; rot: number; scale: number; opacity: number }> = {
  0: { y: 0, x: 0, rot: 0, scale: 1, opacity: 1 },
  1: { y: 14, x: 26, rot: 4, scale: 0.95, opacity: 0.9 },
  2: { y: 28, x: 0, rot: 0, scale: 0.9, opacity: 0.75 },
  3: { y: 14, x: -26, rot: -4, scale: 0.95, opacity: 0.9 },
};

const CertificationsSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % certs.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + certs.length) % certs.length), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  const activeCert = certs[active];

  return (
    <section id="certifications" className="py-section bg-background">
      <div className="container-section" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — title, copy, controls */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="label-tag">{t("certs.tag")}</p>
            <h2 className="heading-lg mt-3 text-foreground">
              {t("certs.title_1")} <em className="italic">{t("certs.title_em")}</em>
            </h2>
            <p className="body-lg mt-5 max-w-md">{t("certs.subtitle")}</p>

            <div className="mt-8 p-5 rounded-2xl bg-card/60 border border-border/60 max-w-md">
              <div className="flex items-start gap-3">
                <Award size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="label-tag !text-muted-foreground">{t("certs.now_viewing")}</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCert.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <h3 className="font-display text-xl text-foreground mt-1 leading-tight">
                        {t(`certs.items.${activeCert.key}.title`)}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mt-1">
                        {t(`certs.items.${activeCert.key}.subtitle`)}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
                aria-label={t("certs.previous")}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="font-body text-sm text-muted-foreground tabular-nums min-w-[60px] text-center">
                {active + 1} / {certs.length}
              </div>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
                aria-label={t("certs.next")}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <p className="font-body text-xs text-muted-foreground/70 mt-4">{t("certs.instructions")}</p>
          </div>

          {/* RIGHT — premium stacked deck */}
          <div
            className={`relative w-full max-w-[420px] mx-auto h-[460px] sm:h-[500px] lg:h-[540px] transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ perspective: "1200px" }}
          >
            {certs.map((c, i) => {
              const slot = depthFor(i, active, certs.length);
              const isFront = slot === 0;
              const s = slotStyles[slot];

              return (
                <motion.button
                  key={c.key}
                  type="button"
                  onClick={() => {
                    if (isFront) setLightbox(true);
                    else setActive(i);
                  }}
                  initial={false}
                  animate={{
                    y: s.y,
                    x: s.x,
                    rotate: s.rot,
                    scale: s.scale,
                    opacity: s.opacity,
                    zIndex: 10 - slot,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9 }}
                  whileHover={isFront ? { y: s.y - 4, scale: s.scale * 1.01 } : { scale: s.scale * 1.02 }}
                  whileTap={{ scale: s.scale * 0.98 }}
                  className="absolute inset-0 card-glass overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-primary/40 will-change-transform"
                  style={{
                    boxShadow: isFront
                      ? "0 30px 60px -20px hsl(160 35% 12% / 0.32)"
                      : "0 14px 32px -14px hsl(160 35% 12% / 0.18)",
                    cursor: isFront ? "zoom-in" : "pointer",
                    transformStyle: "preserve-3d",
                  }}
                  aria-label={
                    isFront
                      ? `${t("certs.view")} ${t(`certs.items.${c.key}.title`)}`
                      : t(`certs.items.${c.key}.title`)
                  }
                >
                  <div className="relative w-full h-full overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={t(`certs.items.${c.key}.title`)}
                      loading="lazy"
                      width={768}
                      height={1024}
                      className="w-full h-full object-cover"
                    />
                    {isFront && (
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/85 backdrop-blur flex items-center justify-center shadow-md">
                        <Maximize2 size={14} className="text-foreground" />
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(160 15% 12% / 0.9)", backdropFilter: "blur(10px)" }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              key={active}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeCert.image}
                alt={t(`certs.items.${activeCert.key}.title`)}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl text-primary-foreground">
                  {t(`certs.items.${activeCert.key}.title`)}
                </h3>
                <p className="font-body text-sm text-primary-foreground/70 mt-1">
                  {t(`certs.items.${activeCert.key}.subtitle`)}
                </p>
                <p className="font-body text-xs text-primary-foreground/40 mt-2">
                  {active + 1} / {certs.length}
                </p>
              </div>

              <button
                onClick={() => setLightbox(false)}
                className="absolute top-2 right-2 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label={t("certs.close")}
              >
                <X size={18} />
              </button>
              <button
                onClick={prev}
                className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label={t("certs.previous")}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label={t("certs.next")}
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;
