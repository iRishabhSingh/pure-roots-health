import { Leaf, Globe, Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LANG_LABELS, SUPPORTED_LANGS, type Lang } from "@/i18n";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [pickerOpen, setPickerOpen] = useState(false);
  const current = ((i18n.resolvedLanguage || i18n.language || "en").split("-")[0]) as Lang;

  const choose = (lang: Lang) => {
    i18n.changeLanguage(lang);
    sessionStorage.setItem("lang", lang);
    sessionStorage.setItem("lang_prompt_handled", "1");
    setPickerOpen(false);
  };

  const links = [
    {
      title: t("footer.navigate"),
      items: [
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.journey"), href: "#journey" },
        { label: t("nav.medicines"), href: "#medicines" },
        { label: t("nav.certifications"), href: "#certifications" },
        { label: t("nav.results"), href: "#testimonials" },
        { label: t("locations.tag"), href: "#locations" },
      ],
    },
    {
      title: t("footer.contact"),
      items: [
        { label: "+91-9414636560", href: "tel:+919414636560" },
        { label: "kamleshwarayurved@gmail.com", href: "mailto:kamleshwarayurved@gmail.com" },
        { label: "Tonk Road, Jaipur", href: "#locations" },
      ],
    },
  ];

  return (
    <footer className="py-16 md:py-20" style={{ background: "hsl(160 15% 12%)", color: "hsl(38 20% 80%)" }}>
      {/* Anchor used by the floating language pill to detach + park here */}
      <div id="language-pill-anchor" aria-hidden className="h-px" />
      <div className="container-section">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <Leaf size={22} style={{ color: "hsl(160 35% 50%)" }} />
              <span className="font-display text-xl italic" style={{ color: "hsl(38 20% 92%)" }}>
                Kamleshwar
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-sm opacity-70">{t("footer.tagline")}</p>
          </div>
          {links.map((group) => (
            <div key={group.title} className="min-w-0">
              <h4 className="font-body font-semibold text-sm mb-5" style={{ color: "hsl(38 20% 92%)" }}>
                {group.title}
              </h4>
              <nav className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 break-all sm:break-words"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <p className="font-body text-xs opacity-40">
              © {new Date().getFullYear()} Kamleshwar Ayurvedic Pharmacy. {t("footer.rights")}
            </p>

            {/* Language picker — anchored copy (always present in footer) */}
            <div className="relative">
              <button
                onClick={() => setPickerOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors"
                style={{ background: "hsl(0 0% 100% / 0.06)", color: "hsl(38 20% 92%)" }}
                aria-expanded={pickerOpen}
                aria-label={t("lang_pill")}
              >
                <Globe size={12} />
                <span className="font-body text-xs font-medium">{LANG_LABELS[current]}</span>
              </button>
              {pickerOpen && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-xl overflow-hidden min-w-[140px] shadow-xl"
                  style={{ background: "hsl(160 15% 16%)", border: "1px solid hsl(0 0% 100% / 0.08)" }}
                >
                  {SUPPORTED_LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => choose(l)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left transition-colors hover:bg-white/5"
                      style={{ color: "hsl(38 20% 88%)" }}
                    >
                      <span className="font-body text-xs">{LANG_LABELS[l]}</span>
                      {current === l && <Check size={12} style={{ color: "hsl(160 35% 60%)" }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
