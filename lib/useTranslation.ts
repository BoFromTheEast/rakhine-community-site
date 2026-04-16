import en from "@/locales/en.json";
import my from "@/locales/my.json";

export type Locale = "en" | "my";

export type TranslationDict = typeof en;

const dictionaries: Record<Locale, TranslationDict> = { en, my };

function resolve(obj: unknown, key: string): string {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return key;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : key;
}

export function getTranslation(locale: Locale = "en") {
  const dict = dictionaries[locale] ?? dictionaries.en;

  function t(key: string): string {
    return resolve(dict, key);
  }

  return { t, dict, locale };
}

// Alias for use in client components
export const useTranslation = getTranslation;
