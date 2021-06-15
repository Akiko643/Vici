import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Context } from '../Providers/contentProvider';
import imgrc from '../Img/Rectangle 14.png';
import Navbar from './Navbar/Navbar';
import { useDoc, useCol, useFirebase } from '../Hooks/firebase';
import { AuthStateValue } from '../Hooks/auth-user-provider';
import './infos.scss';
import img from '../Img/oceans 2.png';
import Location from '../Img/Location.svg';
import Welcome from '../Img/Welcome.svg';
import ReactMarkdown from 'react-markdown';

const Infos = () => {
    const { informations } = useContext(Context);
    useEffect(() => {
        console.log(informations)
    }, [informations])
    const [chapterIndex, setChapterIndex] = useState(0);
    return (
        <div className='ws100 hs100 font-ubuntu infos b-background'>
            <Navbar />
            <div className='heading'>
                <img
                    src={imgrc}
                    className='w100 pb-50'
                    alt='Hello world idk img here not loaded'
                />
            </div>
            <div className='flex container-idk'>
                <div className='ma-10 flex flex-col'>
                    <ul className='fs-20 lh-20 list-style-none pv-20 pa-r-20 pl-0'>
                        <li className='c-dedault pb-10 bb-border-2 w-200 ma-4 bold'>
                            Course Summary
                        </li>
                        {informations?.map((chapter, index) => {
                            return (
                                <li
                                    className={`c-default pb-10 bb-border-1 w-200 ma-4 pt-10 ${
                                        chapterIndex === index &&
                                        'active-chapter'
                                    } pointer`}
                                    onClick={() => setChapterIndex(index)}
                                >
                                    {chapter?.header}
                                </li>
                            );
                        })}
                    </ul>
                    <img src={Welcome} className='svg_images' alt='img' />
                    <img src={Location} className='svg_images' alt='img' />
                </div>
                <div className='ma-10 pa-50 b-white right-sec br-border-1'>
                    <h1 className=''>{informations[chapterIndex]?.header}</h1>
                        <p className='fs-20 ln-25'>
                            <ReactMarkdown>
                                {informations[chapterIndex]?.text}
                            </ReactMarkdown>
                        </p>
                </div>
            </div>
        </div>
    );
};
export { Infos };
