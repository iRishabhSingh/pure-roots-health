import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Shield, FlaskConical, Heart, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import clinicImg from "@/assets/clinic-interior.jpg";

const AboutSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  const pillars = [
    { icon: FlaskConical, key: "charak" },
    { icon: Shield, key: "gmp" },
    { icon: Heart, key: "patient" },
    { icon: Users, key: "trust" },
  ];

  return (
    <section id="about" className="py-section">
      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-3xl overflow-hidden">
              <img
                src={clinicImg}
                alt="Kamleshwar Ayurvedic clinic consultation"
                loading="lazy"
                width={1200}
                height={800}
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 md:right-8 card-glass p-5 pr-10 shadow-xl">
              <p className="font-display text-3xl text-primary">30+</p>
              <p className="font-body text-sm text-muted-foreground">{t("about.stat_label")}</p>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="label-tag">{t("about.tag")}</p>
            <h2 className="heading-lg mt-3 text-foreground">
              {t("about.title_1")} <em className="italic">{t("about.title_em")}</em>
            </h2>
            <p className="body-lg mt-6 max-w-lg">{t("about.body")}</p>

            <a
              href="#certifications"
              className="inline-flex items-center gap-2 mt-6 text-sm font-body font-medium text-primary hover:underline"
            >
              {t("about.view_certs")}
            </a>

            <div className="grid grid-cols-2 gap-5 mt-10">
              {pillars.map(({ icon: Icon, key }) => (
                <div key={key} className="group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-body font-semibold text-sm text-foreground">
                    {t(`about.pillars.${key}.title`)}
                  </h3>
                  <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">
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
