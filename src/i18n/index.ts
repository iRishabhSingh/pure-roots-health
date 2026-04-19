import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const SUPPORTED_LANGS = ["en", "hi"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
};

// Bump this when detection logic changes — wipes stale cached lang once.
const DETECTOR_VERSION = "v2";

const isSupported = (l: string): l is Lang =>
  (SUPPORTED_LANGS as readonly string[]).includes(l);

const pickFromList = (list: readonly string[]): Lang | undefined => {
  for (const raw of list) {
    if (!raw) continue;
    const base = raw.toLowerCase().split("-")[0];
    if (isSupported(base)) return base;
  }
  return undefined;
};

const detectFromBrowser = (): Lang => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "en";

  // 1. Full navigator.languages array (most reliable)
  const navList: string[] = (navigator.languages as string[] | undefined) ?? [];
  const fromNav = pickFromList(navList);
  if (fromNav) return fromNav;

  // 2. navigator.language single value
  const single = pickFromList([navigator.language ?? ""]);
  if (single) return single;

  // 3. Intl resolved locale (sometimes reflects OS settings more accurately)
  try {
    const intlLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
    const fromIntl = pickFromList([intlLocale]);
    if (fromIntl) return fromIntl;
  } catch {
    /* ignore */
  }

  // 4. <html lang>
  const html = document?.documentElement?.lang ?? "";
  const fromHtml = pickFromList([html]);
  if (fromHtml) return fromHtml;

  return "en";
};

// One-time cache invalidation: wipe stale "lang" set before this detector version.
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
  // Helps verify what the browser actually exposes in any environment.
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
