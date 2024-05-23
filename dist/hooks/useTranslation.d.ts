/// <reference types="react" />
export declare const useTranslation: () => {
    t: (key: string) => string | never[];
    setLanguage: import("react").Dispatch<import("react").SetStateAction<string>>;
    language: string;
};
