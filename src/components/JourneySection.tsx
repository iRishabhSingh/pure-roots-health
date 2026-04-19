import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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

const ease = [0.16, 1, 0.3, 1] as const;

const JourneySection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-milestone]");
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section id="journey" className="py-section bg-secondary/30 overflow-hidden">
      <div className="container-section" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="label-tag">{t("journey.tag")}</p>
            <h2 className="heading-lg mt-3 text-foreground">
              {t("journey.title_1")} <em className="italic">{t("journey.title_em")}</em>
            </h2>
            <p className="body-lg mt-4">{t("journey.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 rounded-full border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
              aria-label={t("journey.prev")}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-11 h-11 rounded-full border border-border bg-background flex items-center justify-center hover:bg-card transition-colors"
              aria-label={t("journey.next")}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal strip (full bleed for edge fade) */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-none mask-fade-x pb-4"
        >
          <div className="flex gap-6 px-5 sm:px-8 lg:px-12 snap-x snap-mandatory">
            {/* spacer to allow last card to snap nicely */}
            <div className="flex-shrink-0" aria-hidden style={{ width: "max(0px, calc((100vw - 1280px) / 2))" }} />
            {milestones.map((m, i) => (
              <motion.article
                key={m.key}
                data-milestone
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, ease, delay: Math.min(i * 0.06, 0.5) }}
                className="snap-start flex-shrink-0 w-[260px] sm:w-[300px] card-glass p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="label-tag !text-primary">{m.year}</span>
                </div>
                <h3 className="font-display text-xl text-foreground leading-snug">
                  {t(`journey.items.${m.key}.title`)}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
                  {t(`journey.items.${m.key}.desc`)}
                </p>
              </motion.article>
            ))}
            <div className="flex-shrink-0" aria-hidden style={{ width: "max(0px, calc((100vw - 1280px) / 2))" }} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default JourneySection;
