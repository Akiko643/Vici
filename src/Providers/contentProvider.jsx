import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useCol } from '../Hooks/firebase';
import i18n from 'i18next'
export const Context = createContext({
    collegePrep: [],
    language: [],
    changeLanguage: () => {},
});
export const Provider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    // const informations = useCol('content').data;
    const {data: collegePrep} = useCol(`/content/contents/College-prep`, language);
    const changeLanguage = () => {
        i18n.changeLanguage(language == "en" ? "mn" : "en");
        setLanguage(language == "en" ? "mn" : "en");
    }
    return (
        <Context.Provider value={{ collegePrep, language, changeLanguage }}>{children}</Context.Provider>
    );
};
