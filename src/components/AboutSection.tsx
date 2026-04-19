import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Sprout, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import founderImg from "@/assets/founder-portrait.jpg";

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const pillars = [
    { icon: Sprout, key: "roots" },
    { icon: ShieldCheck, key: "gmp" },
    { icon: HeartHandshake, key: "trust" },
  ];

  return (
    <section id="about" className="py-section">
      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait — left, sticky on desktop */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative lg:sticky lg:top-28">
              <div className="rounded-3xl overflow-hidden bg-muted">
                <img
                  src={founderImg}
                  alt="Dr. Kamleshwar — Founder, Kamleshwar Ayurvedic Pharmacy"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-5 right-5 md:left-auto md:right-5 md:max-w-[260px] card-glass p-5 shadow-xl">
                <p className="font-display text-lg italic text-foreground leading-tight">
                  {t("about.founder_name")}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  {t("about.founder_title")}
                </p>
              </div>
            </div>
          </div>

          {/* Story — right */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="label-tag">{t("about.tag")}</p>
            <h2 className="heading-lg mt-3 text-foreground">
              {t("about.title_1")} <em className="italic">{t("about.title_em")}</em>
            </h2>

            <div className="mt-6 space-y-5 font-body text-base sm:text-[17px] leading-relaxed text-muted-foreground max-w-xl">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>

            <a
              href="#certifications"
              className="inline-flex items-center gap-2 mt-7 text-sm font-body font-medium text-primary group"
            >
              {t("about.view_certs")}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <div className="grid sm:grid-cols-3 gap-5 mt-10 pt-10 border-t border-border/60">
              {pillars.map(({ icon: Icon, key }) => (
                <div key={key}>
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-body font-semibold text-sm text-foreground">
                    {t(`about.pillars.${key}.title`)}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {t(`about.pillars.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
