import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useTranslation } from "react-i18next";

const milestones = [
  { year: "1995", key: "1995" },
  { year: "1996", key: "1996" },
  { year: "1998", key: "1998" },
  { year: "1999", key: "1999" },
  { year: "2002–2007", key: "2002" },
  { year: "2009", key: "2009" },
  { year: "2009–2017", key: "2009b" },
  { year: "2011–2018", key: "2011" },
  { year: "Today", key: "today" },
];

const JourneySection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="journey" className="py-section bg-secondary/30">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="label-tag">{t("journey.tag")}</p>
          <h2 className="heading-lg mt-3 text-foreground">
            {t("journey.title_1")} <em className="italic">{t("journey.title_em")}</em>
          </h2>
          <p className="body-lg mt-4">{t("journey.subtitle")}</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" aria-hidden />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={m.key}
                  className={`relative flex md:items-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />

                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <p className="label-tag">{m.year}</p>
                    <h3 className="font-display text-xl md:text-2xl text-foreground mt-1">
                      {t(`journey.items.${m.key}.title`)}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                      {t(`journey.items.${m.key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
