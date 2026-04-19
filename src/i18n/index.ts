import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import bn from "./locales/bn.json";
import gu from "./locales/gu.json";
import mr from "./locales/mr.json";
import pa from "./locales/pa.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import kn from "./locales/kn.json";
import ml from "./locales/ml.json";
import bho from "./locales/bho.json";
import mai from "./locales/mai.json";
import raj from "./locales/raj.json";
import hr from "./locales/hr.json"; // Haryanvi (uses 'bgc' BCP-47; we expose as 'hr' in UI for simplicity)

export const SUPPORTED_LANGS = [
  "en",
  "hi",
  "pa", // Punjabi
  "raj", // Rajasthani
  "hr", // Haryanvi
  "gu", // Gujarati
  "mr", // Marathi
  "bn", // Bengali
  "bho", // Bhojpuri
  "mai", // Maithili
  "ta", // Tamil
  "te", // Telugu
  "kn", // Kannada
  "ml", // Malayalam
] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
  pa: "ਪੰਜਾਬੀ",
  raj: "राजस्थानी",
  hr: "हरियाणवी",
  gu: "ગુજરાતી",
  mr: "मराठी",
  bn: "বাংলা",
  bho: "भोजपुरी",
  mai: "मैथिली",
  ta: "தமிழ்",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
};

// Map BCP-47 base codes coming from the browser to our internal Lang.
// Browsers commonly emit 'bgc' for Haryanvi and 'rajasthani'/'mwr' families for Rajasthani.
const BROWSER_TO_LANG: Record<string, Lang> = {
  en: "en", hi: "hi", pa: "pa", gu: "gu", mr: "mr", bn: "bn",
  ta: "ta", te: "te", kn: "kn", ml: "ml",
  bho: "bho", mai: "mai",
  bgc: "hr", hry: "hr",
  raj: "raj", mwr: "raj", hne: "raj",
};

// Bump this when detection logic changes — wipes stale cached lang once.
const DETECTOR_VERSION = "v3";

const isSupported = (l: string): l is Lang =>
  (SUPPORTED_LANGS as readonly string[]).includes(l);

const pickFromList = (list: readonly string[]): Lang | undefined => {
  for (const raw of list) {
    if (!raw) continue;
    const base = raw.toLowerCase().split("-")[0];
    if (isSupported(base)) return base;
    if (BROWSER_TO_LANG[base]) return BROWSER_TO_LANG[base];
  }
  return undefined;
};

const detectFromBrowser = (): Lang => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "en";

  const navList: string[] = (navigator.languages as string[] | undefined) ?? [];
  const fromNav = pickFromList(navList);
  if (fromNav) return fromNav;

  const single = pickFromList([navigator.language ?? ""]);
  if (single) return single;

  try {
    const intlLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
    const fromIntl = pickFromList([intlLocale]);
    if (fromIntl) return fromIntl;
  } catch {
    /* ignore */
  }

  const html = document?.documentElement?.lang ?? "";
  const fromHtml = pickFromList([html]);
  if (fromHtml) return fromHtml;

  return "en";
};

if (typeof window !== "undefined") {
  try {
    const v = sessionStorage.getItem("lang_detector_v");
    if (v !== DETECTOR_VERSION) {
      sessionStorage.removeItem("lang");
      sessionStorage.removeItem("lang_prompt_handled");
      sessionStorage.setItem("lang_detector_v", DETECTOR_VERSION);
    }
  } catch {
    /* sessionStorage may be unavailable */
  }
}

const initialDetected = detectFromBrowser();

if (typeof window !== "undefined" && typeof console !== "undefined") {
  // eslint-disable-next-line no-console
  console.info(
    "[i18n] navigator.languages:",
    (navigator.languages as string[] | undefined) ?? [navigator.language],
    "→ resolved:",
    initialDetected,
  );
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      pa: { translation: pa },
      raj: { translation: raj },
      hr: { translation: hr },
      gu: { translation: gu },
      mr: { translation: mr },
      bn: { translation: bn },
      bho: { translation: bho },
      mai: { translation: mai },
      ta: { translation: ta },
      te: { translation: te },
      kn: { translation: kn },
      ml: { translation: ml },
    },
    fallbackLng: "en",
    lng: initialDetected,
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    lowerCaseLng: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ["sessionStorage", "navigator", "htmlTag"],
      caches: ["sessionStorage"],
      lookupSessionStorage: "lang",
    },
  });

export default i18n;
