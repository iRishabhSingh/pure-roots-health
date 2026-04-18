import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Globe, X, Check } from "lucide-react";
import { LANG_LABELS, SUPPORTED_LANGS, type Lang } from "@/i18n";

const ease = [0.16, 1, 0.3, 1] as const;
const PILL_DURATION = 8000;

const LanguagePrompt = () => {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || "en").split("-")[0] as Lang;

  const [showModal, setShowModal] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const handled = sessionStorage.getItem("lang_prompt_handled");
    if (handled) return;
    if (current !== "en" && SUPPORTED_LANGS.includes(current)) {
      // small delay to avoid jarring on load
      const t = setTimeout(() => setShowModal(true), 700);
      return () => clearTimeout(t);
    }
  }, [current]);

  const dismissModal = (keep: boolean) => {
    sessionStorage.setItem("lang_prompt_handled", "1");
    if (!keep) {
      i18n.changeLanguage("en");
    }
    setShowModal(false);
    setShowPill(true);
    setTimeout(() => setShowPill(false), PILL_DURATION);
  };

  const choose = (lang: Lang) => {
    i18n.changeLanguage(lang);
    sessionStorage.setItem("lang", lang);
    setPickerOpen(false);
    setShowPill(false);
  };

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: "hsl(160 15% 12% / 0.6)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="bg-background rounded-2xl shadow-2xl max-w-sm w-full p-7"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground leading-snug">
                {t("lang_modal.title", { lang: LANG_LABELS[current] })}
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                {t("lang_modal.body", { lang: LANG_LABELS[current] })}
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={() => dismissModal(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t("lang_modal.switch_en")}
                </button>
                <button
                  onClick={() => dismissModal(true)}
                  className="font-body text-sm text-muted-foreground hover:text-foreground py-2.5 transition-colors"
                >
                  {t("lang_modal.keep", { lang: LANG_LABELS[current] })}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pill (after modal dismissed) */}
      <AnimatePresence>
        {showPill && !showModal && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease }}
            className="fixed bottom-5 left-5 z-40"
            onMouseEnter={() => setPickerOpen(true)}
          >
            <div className="relative">
              <button
                onClick={() => setPickerOpen((v) => !v)}
                className="flex items-center gap-2 bg-card border border-border rounded-full pl-3 pr-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
                aria-label={t("lang_pill")}
              >
                <Globe size={14} className="text-primary" />
                <span className="font-body text-xs font-medium text-foreground">
                  {LANG_LABELS[current]}
                </span>
              </button>

              <AnimatePresence>
                {pickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease }}
                    className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[140px]"
                  >
                    {SUPPORTED_LANGS.map((l) => (
                      <button
                        key={l}
                        onClick={() => choose(l)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-muted transition-colors"
                      >
                        <span className="font-body text-sm text-foreground">{LANG_LABELS[l]}</span>
                        {current === l && <Check size={14} className="text-primary" />}
                      </button>
                    ))}
                    <button
                      onClick={() => setShowPill(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left border-t border-border/50 text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <X size={12} />
                      <span className="font-body text-xs">Dismiss</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguagePrompt;
