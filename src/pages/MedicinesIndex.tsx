import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { medicines, issueChips, whatsappConsultUrl, type IssueKey } from "@/data/medicines";

type ChipKey = IssueKey | "all";

const MedicinesIndex = () => {
  const { t } = useTranslation();
  const [issue, setIssue] = useState<ChipKey>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return medicines.filter((m) => {
      if (issue !== "all" && m.category !== issue) return false;
      if (!q) return true;
      return [m.name, m.hindi ?? "", m.tagline].some((s) => s.toLowerCase().includes(q));
    });
  }, [query, issue]);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/30">
        <div className="container-section py-6 flex items-center justify-between gap-4">
          <Link
            to=".."
            relative="path"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> {t("medicines.back_home", "Back to home")}
          </Link>
          <p className="font-body text-xs text-muted-foreground tabular-nums">
            {t("medicines.count", { shown: filtered.length, total: medicines.length })}
          </p>
        </div>
      </header>

      <section className="container-section py-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <p className="label-tag">{t("medicines.tag")}</p>
          <h1 className="heading-lg mt-3 text-foreground">
            <em className="italic">{t("medicines.all_title_em", "Complete")}</em>{" "}
            {t("medicines.all_title", "formulary")}
          </h1>
          <p className="body-lg mt-4">
            {t("medicines.all_subtitle", "Browse every GMP-certified formulation crafted in-house since 2009.")}
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 max-w-3xl mx-auto">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("medicines.search_placeholder")}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-card/80 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-body text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {issueChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => setIssue(chip.key)}
                className={`px-4 py-1.5 rounded-full font-body text-xs font-medium tracking-wide transition-all duration-300 border ${
                  issue === chip.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/60 text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {t(`medicines.issues.${chip.key}`, chip.label)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto">
            <p className="font-body text-sm text-muted-foreground">{t("medicines.empty")}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((med) => (
              <article key={med.slug} className="card-glass overflow-hidden flex flex-col group">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={med.image}
                    alt={med.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[11px] text-accent font-body font-semibold tracking-wider uppercase">{med.tagline}</p>
                  <h3 className="font-display text-xl text-foreground mt-1">{med.name}</h3>
                  {med.hindi && <p className="font-body text-xs text-muted-foreground mt-0.5">{med.hindi}</p>}
                  <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed flex-1">{med.details}</p>
                  <a
                    href={whatsappConsultUrl(med)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full mt-5 justify-center text-sm"
                  >
                    <MessageCircle size={15} />
                    {t("medicines.consult_short", "Consult on WhatsApp")}
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="text-center font-body text-xs text-muted-foreground/70 mt-10 max-w-xl mx-auto">
          {t("medicines.vaidya_note")}
        </p>
      </section>
    </main>
  );
};

export default MedicinesIndex;
