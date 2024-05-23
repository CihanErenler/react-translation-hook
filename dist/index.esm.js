import React, { createContext, useState, useContext, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const TranslationContext = createContext(undefined);
const TranslationProvider = ({ children, localesPath, defaultLang = "en", }) => {
    const [language, setLanguage] = useState(defaultLang);
    return (React.createElement(TranslationContext.Provider, { value: { language, setLanguage, localesPath, defaultLang } }, children));
};
const useTranslationContext = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error("Context is not provided");
    }
    return context;
};

const useTranslation = () => {
    const [translations, setTranslations] = useState({});
    const { defaultLang, language, setLanguage, localesPath } = useTranslationContext();
    useEffect(() => {
        const loadTranslations = () => __awaiter(void 0, void 0, void 0, function* () {
            const path = `${localesPath}/${language}.js`;
            try {
                const module = yield import(path);
                setTranslations(module.default);
            }
            catch (error) {
                console.error(`Error loading translations for language: ${language}`, error);
            }
        });
        loadTranslations();
    }, [language, defaultLang]);
    const t = (key) => translations[key] || [];
    return { t, setLanguage, language };
};

export { TranslationProvider, useTranslation };
