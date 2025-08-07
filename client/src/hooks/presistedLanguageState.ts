import { useState } from "react";
import { getLanguageData, setLanguageData } from "../utils/userHelper";

export function usePresistedLanguageState(initialValues: "english") {
    const [language, setLanguage] = useState<"bulgarian" | "english">(() => {
        const language = getLanguageData();
        if (language) {
            return language;
        }
        return initialValues;
    });

    function changeLanguage(value: "bulgarian" | "english") {
        setLanguage(value);
        setLanguageData(value);
    }

    return {
        language,changeLanguage
    }
}