import { useEffect, useState } from "react";
import { useTranslationContext } from "../context/TranslationProvider";

export const useTranslation = () => {
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );
  const { defaultLang, language, setLanguage, localesPath } =
    useTranslationContext();

  useEffect(() => {
    const loadTranslations = async () => {
      const path = `${localesPath}/${language}.js`;
      try {
        const module = await import(path);
        setTranslations(module.default);
      } catch (error) {
        console.error(
          `Error loading translations for language: ${language}`,
          error
        );
      }
    };

    loadTranslations();
  }, [language, defaultLang]);

  const t = (key: string) => translations[key] || [];

  return { t, setLanguage, language };
};
