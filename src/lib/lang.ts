import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const SET = new Set<string>(SUPPORTED_LANGS as readonly string[]);

export const isLang = (v: string | undefined | null): v is Lang =>
  !!v && SET.has(v);

/** Replace (or insert) the leading /:lang segment in a path. */
export const withLang = (pathname: string, lang: Lang): string => {
  const clean = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length && isLang(parts[0])) parts[0] = lang;
  else parts.unshift(lang);
  return "/" + parts.join("/");
};

/** Strip the leading /:lang prefix, returning the remainder (always starts with "/"). */
export const stripLang = (pathname: string): string => {
  const clean = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const parts = clean.split("/").filter(Boolean);
  if (parts.length && isLang(parts[0])) parts.shift();
  return "/" + parts.join("/");
};