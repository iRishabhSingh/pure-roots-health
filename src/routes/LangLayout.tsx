import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";
import { isLang, stripLang } from "@/lib/lang";

const SITE_ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "https://kamleshwarayurved.com";

/**
 * Validates the :lang segment, syncs i18n + <html lang>, and emits per-page
 * hreflang/canonical tags. All routed pages render under this layout.
 */
const LangLayout = () => {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { i18n } = useTranslation();

  // Unsupported lang in URL → bounce to English-prefixed equivalent.
  if (!isLang(lang)) {
    const remainder = stripLang(location.pathname);
    return <Navigate to={`/en${remainder === "/" ? "" : remainder}`} replace />;
  }

  useEffect(() => {
    if (i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang);
    }
    try {
      sessionStorage.setItem("lang", lang);
    } catch {
      /* sessionStorage may be unavailable */
    }
  }, [lang, i18n]);

  const pathInsideLang = stripLang(location.pathname);
  const canonical = `${SITE_ORIGIN}/${lang}${pathInsideLang === "/" ? "" : pathInsideLang}`;

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <link rel="canonical" href={canonical} />
        {SUPPORTED_LANGS.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${SITE_ORIGIN}/${l}${pathInsideLang === "/" ? "" : pathInsideLang}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_ORIGIN}/en${pathInsideLang === "/" ? "" : pathInsideLang}`}
        />
      </Helmet>
      <Outlet />
    </>
  );
};

export default LangLayout;