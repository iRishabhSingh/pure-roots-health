import { Navigate } from "react-router-dom";
import i18n from "@/i18n";
import { isLang } from "@/lib/lang";

/**
 * "/" → "/{detected-lang}". Detection already ran at i18n init (browser +
 * sessionStorage). We just trust i18n.resolvedLanguage and fall back to en.
 */
const RootRedirect = () => {
  const detected = i18n.resolvedLanguage || i18n.language || "en";
  const lang = isLang(detected) ? detected : "en";
  return <Navigate to={`/${lang}`} replace />;
};

export default RootRedirect;