import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import cert1 from "@/assets/cert-placeholder-1.jpg";
import cert2 from "@/assets/cert-placeholder-2.jpg";
import cert3 from "@/assets/cert-placeholder-3.jpg";
import cert4 from "@/assets/cert-placeholder-4.jpg";
import cert5 from "@/assets/cert-placeholder-5.jpg";
import cert6 from "@/assets/cert-placeholder-6.jpg";

const certs = [
  { image: cert1, title: "BAMS Medical Degree", subtitle: "Bachelor of Ayurvedic Medicine & Surgery" },
  { image: cert2, title: "GMP Certification", subtitle: "Good Manufacturing Practices — since 2009" },
  { image: cert3, title: "University Recognition", subtitle: "Accredited Ayurvedic Practitioner" },
  { image: cert4, title: "Excellence Award", subtitle: "Ayurvedic Service Recognition" },
  { image: cert5, title: "Government Approval", subtitle: "Ministry of AYUSH compliance" },
  { image: cert6, title: "Patent Research", subtitle: "Charak Samhita-based formulations" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const CertificationsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i - 1 + certs.length) % certs.length)),
    []
  );
  const next = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i + 1) % certs.length)),
    []
  );

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, close, prev, next]);

  const active = activeIdx !== null ? certs[activeIdx] : null;

  return (
    <section id="certifications" className="py-section">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="label-tag">Certifications & Recognition</p>
          <h2 className="heading-lg mt-3 text-foreground">
            <em className="italic">Verified</em> credentials you can trust
          </h2>
          <p className="body-lg mt-4">
            GMP-certified manufacturing, government approvals, and decades of formal medical training.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setActiveIdx(i)}
              className={`card-glass overflow-hidden text-left group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 flex items-start gap-3">
                <Award size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display text-lg text-foreground leading-tight">{c.title}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-1">{c.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(160 15% 12% / 0.85)", backdropFilter: "blur(8px)" }}
            onClick={close}
          >
            <motion.div
              key={activeIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-display text-xl text-primary-foreground">{active.title}</h3>
                <p className="font-body text-sm text-primary-foreground/70 mt-1">{active.subtitle}</p>
                <p className="font-body text-xs text-primary-foreground/40 mt-2">
                  {(activeIdx ?? 0) + 1} / {certs.length}
                </p>
              </div>

              <button
                onClick={close}
                className="absolute top-2 right-2 w-10 h-10 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <button
                onClick={prev}
                className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Previous certificate"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Next certificate"
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
