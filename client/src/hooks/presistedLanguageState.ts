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

    function changeLanguage() {
        if (language == "bulgarian") {
            setLanguage("english");
            setLanguageData("english");
        } else {
            setLanguage("bulgarian");
            setLanguageData("bulgarian");
        }
    }

    return {
        language,changeLanguage
    }
}