import React, { createContext, useState } from 'react';
export const Context = createContext({
    informations: [],
    setInformations: () => {},
});
export const TopCollegeProvider = ({ children }) => {
    const [informations, setInformations] = useState([
        {
            header: 'Asia',
            countries: [
                {
                    name: 'Mongolia',
                    ranking: [
                        {
                            rank: "1",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "2",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "3",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "4",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "5",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "6",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "7",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "8",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "9",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "10",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                    ],
                },
            ],
        },
        {
            header: 'America',
            countries: [
                {
                    name: 'Canada',
                    ranking: [
                        {
                            rank: "1",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "2",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "3",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "4",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "5",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "6",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "7",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "8",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "9",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                        {
                            rank: "10",
                            logo: "MIT.svg",
                            name: "Massachusetts Institute of Technology(MIT)",
                            location: "MA, USA",
                        },
                    ],
                },
            ],
        },
        
    ]);

    return (
        <Context.Provider value={{ informations, setInformations }}>
            {children}
        </Context.Provider>
    );
};