import React, { ReactNode, useState, createContext, useContext } from "react";

interface TranslationProviderProps {
  children: ReactNode;
  localesPath: string;
  defaultLang: string;
}

interface TranslationContextProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  localesPath: string;
  defaultLang: string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export const TranslationProvider = ({
  children,
  localesPath,
  defaultLang = "en",
}: TranslationProviderProps) => {
  const [language, setLanguage] = useState(defaultLang);

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage, localesPath, defaultLang }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("Context is not provided");
  }

  return context;
};
