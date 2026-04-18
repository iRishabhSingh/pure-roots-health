import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  const { t } = useTranslation();
  const stats = [
    { value: "30+", label: t("hero.stat_years") },
    { value: "80,000+", label: t("hero.stat_patients") },
    { value: "GMP", label: t("hero.stat_certified") },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Ayurvedic medicine preparation"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />
      </div>

      <div className="relative z-10 container-section pb-16 md:pb-24 pt-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="label-tag text-secondary/80 mb-6"
          >
            {t("hero.tag")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="heading-xl text-primary-foreground"
          >
            {t("hero.title_1")} <em className="italic">{t("hero.title_em")}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "hsl(38 30% 80%)" }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a href="#contact" className="btn-primary bg-accent text-accent-foreground hover:bg-accent/90">
              {t("hero.cta_consult")}
              <ArrowRight size={16} />
            </a>
            <a href="#medicines" className="btn-outline border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10">
              {t("hero.cta_explore")}
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mt-16 flex gap-10 md:gap-16 border-t pt-8"
          style={{ borderColor: "hsl(0 0% 100% / 0.12)" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl sm:text-3xl text-primary-foreground">{s.value}</p>
              <p className="font-body text-xs sm:text-sm mt-1" style={{ color: "hsl(38 20% 65%)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
