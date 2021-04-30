import React, { createContext, useState } from 'react';
import { useCol } from '../Hooks/firebase';
export const Context = createContext({
    informations: [],
    setInformations: () => {},
});
export const Provider = ({ children }) => {
    const informations = useCol('content').data;

    return (
        <Context.Provider value={{ informations }}>{children}</Context.Provider>
    );
};
