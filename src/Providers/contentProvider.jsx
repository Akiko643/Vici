import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useCol } from '../Hooks/firebase';
export const Context = createContext({
    informations: [],
    collegePrep: [],
});
export const Provider = ({ children }) => {
    const informations = useCol('content').data;
    const {data: collegePrep} = useCol(`/content/contents/College-prep`);
    return (
        <Context.Provider value={{ informations, collegePrep }}>{children}</Context.Provider>
    );
};
