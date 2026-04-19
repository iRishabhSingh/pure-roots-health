import { Type, Minus, Plus, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFontScale } from "@/hooks/use-font-scale";

/**
 * Slim utility bar above the Navbar — gives older / accessibility-needing visitors
 * an immediately visible way to scale text site-wide. Persisted in localStorage.
 */
const AccessibilityBar = () => {
  const { t } = useTranslation();
  const { scale, dec, inc, reset, canDec, canInc } = useFontScale();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] border-b border-border/50 bg-background/95 backdrop-blur-xl"
      role="region"
      aria-label={t("a11y.region")}
    >
      <div className="container-section h-9 flex items-center justify-end gap-3 text-foreground">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-body text-[11px] font-medium tracking-wide text-muted-foreground">
          <Type size={11} />
          {t("a11y.text_size")}
        </span>
        <div className="inline-flex items-center rounded-full border border-border bg-card/70 overflow-hidden">
          <button
            type="button"
            onClick={dec}
            disabled={!canDec}
            aria-label={t("a11y.decrease")}
            className="px-2.5 py-1 text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={12} />
          </button>
          <span className="px-2 font-body text-[11px] font-semibold tabular-nums text-muted-foreground border-x border-border min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={inc}
            disabled={!canInc}
            aria-label={t("a11y.increase")}
            className="px-2.5 py-1 text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={12} />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label={t("a11y.reset")}
            className="px-2.5 py-1 text-foreground hover:bg-muted transition-colors border-l border-border"
          >
            <RotateCcw size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityBar;
