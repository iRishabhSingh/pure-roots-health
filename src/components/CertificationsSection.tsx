import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Award, Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import cert1 from "@/assets/cert-placeholder-1.jpg";
import cert2 from "@/assets/cert-placeholder-2.jpg";
import cert3 from "@/assets/cert-placeholder-3.jpg";
import cert4 from "@/assets/cert-placeholder-4.jpg";
import cert5 from "@/assets/cert-placeholder-5.jpg";
import cert6 from "@/assets/cert-placeholder-6.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const CertificationsSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const certs = [
    { image: cert1, key: "bams" },
    { image: cert2, key: "gmp" },
    { image: cert3, key: "uni" },
    { image: cert4, key: "award" },
    { image: cert5, key: "ayush" },
    { image: cert6, key: "patent" },
  ];

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % certs.length), [certs.length]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + certs.length) % certs.length),
    [certs.length]
  );

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
  const activeTitle = t(`certs.items.${activeCert.key}.title`);
  const activeSubtitle = t(`certs.items.${activeCert.key}.subtitle`);

  return (
    <section id="certifications" className="py-section">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="label-tag">{t("certs.tag")}</p>
          <h2 className="heading-lg mt-3 text-foreground">
            {t("certs.title_1")} <em className="italic">{t("certs.title_em")}</em>
          </h2>
          <p className="body-lg mt-4">{t("certs.subtitle")}</p>
        </div>

        {/* Stacked cards */}
        <div
          className={`relative max-w-md mx-auto h-[460px] sm:h-[520px] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {certs.map((c, i) => {
            const offset = (i - active + certs.length) % certs.length;
            // Show only top 4 in stack; rest hidden behind
            const visible = offset < 4;
            const isFront = offset === 0;
            const yOffset = offset * 14;
            const scale = 1 - offset * 0.04;
            const opacity = visible ? 1 - offset * 0.08 : 0;
            const rotate = offset === 0 ? 0 : (i % 2 === 0 ? -1 : 1) * (offset * 0.5);

            return (
              <motion.button
                key={c.key}
                onClick={() => {
                  if (isFront) setLightbox(true);
                  else setActive(i);
                }}
                animate={{
                  y: yOffset,
                  scale,
                  opacity,
                  rotate,
                  zIndex: certs.length - offset,
                }}
                transition={{ duration: 0.55, ease }}
                className="absolute inset-0 card-glass overflow-hidden text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
                style={{
                  pointerEvents: visible ? "auto" : "none",
                  boxShadow: isFront
                    ? "0 25px 50px -15px hsl(160 35% 12% / 0.25)"
                    : "0 10px 30px -10px hsl(160 35% 12% / 0.15)",
                }}
                aria-label={isFront ? `${t("certs.view")} ${t(`certs.items.${c.key}.title`)}` : t(`certs.items.${c.key}.title`)}
              >
                <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={t(`certs.items.${c.key}.title`)}
                    loading="lazy"
                    width={768}
                    height={1024}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex items-start gap-3 bg-card">
                  <Award size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-foreground leading-tight truncate">
                      {t(`certs.items.${c.key}.title`)}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mt-1 truncate">
                      {t(`certs.items.${c.key}.subtitle`)}
                    </p>
                  </div>
                  {isFront && <Maximize2 size={14} className="text-muted-foreground flex-shrink-0 mt-1" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
            aria-label={t("certs.previous")}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="font-body text-sm text-muted-foreground tabular-nums min-w-[60px] text-center">
            {active + 1} / {certs.length}
          </div>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors"
            aria-label={t("certs.next")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <p className="font-body text-xs text-muted-foreground/70 text-center mt-4">
          {t("certs.instructions")}
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                alt={activeTitle}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl text-primary-foreground">{activeTitle}</h3>
                <p className="font-body text-sm text-primary-foreground/70 mt-1">{activeSubtitle}</p>
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
