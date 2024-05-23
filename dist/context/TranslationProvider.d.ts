import React, { ReactNode } from "react";
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
export declare const TranslationProvider: ({ children, localesPath, defaultLang, }: TranslationProviderProps) => React.JSX.Element;
export declare const useTranslationContext: () => TranslationContextProps;
export {};
