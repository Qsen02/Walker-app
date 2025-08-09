import { useState } from "react";
import { getLanguageData, setLanguageData } from "../utils/userHelper";
import { Language } from "../types/UserAndTheme";

export function usePresistedLanguageState(initialValues: "english") {
    const [language, setLanguage] = useState<Language>(() => {
        const language = getLanguageData();
        if (language) {
            return language;
        }
        return initialValues;
    });

    function changeLanguage(value: Language) {
        setLanguage(value);
        setLanguageData(value);
    }

    return {
        language,changeLanguage
    }
}