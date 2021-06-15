import React, { cloneElement, useContext, useEffect, useState } from 'react';
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
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Infos = () => {
    const { informations, collegePrep } = useContext(Context);
    const [ cpData, setCpData ] = useState({});
    const location = useLocation();
    const { data } = useCol(`/content/contents/College-prep/${cpData.id}/chapters`);
    const implement = (data) => {
        let side = data;
        for (let i = 0; i < side.length; i++) {
            if (side[i].parent != "") {
                for (let j = 0; j < side.length; j++) {
                    if (i != j && side[j]?.id == side[i]?.parent) {
                        if (side[j]?.items) {
                            side[j]?.items?.push(side[i]);
                        }else {
                            side[j].items = [side[i]];
                        }
                        side.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        console.log(side);
        return side;
    }
    useEffect(() => {
        console.log(implement(data));
    }, [data])
    useEffect(() => {
        setCpData(collegePrep.find(cp => {
            if (cp.name == location.pathname.substring(1, location.pathname.length)) 
                return true;
        }));
    }, [collegePrep])
    // const { data } = useCol(`/content/contents/College-prep/IBhSmeaGmZHfUMd7rqit`)
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
            <div className='container-idk'>
                <p className='college'>College</p>
                <h1 className='headeridk'>{location.pathname.substring(1, location.pathname.length)}</h1>
            </div>
            <div className='flex container-idk'>
                <div className='mv-10 mr-10 flex flex-col'>
                    <ul className='fs-20 lh-20 list-style-none pv-20 pa-r-20 pl-0'>
                        <li className='c-dedault pb-10 bb-border-2 w-200 ma-4 bold'>
                            Course Summary
                        </li>
                        {data?.map((chapter, index) => {
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
                        <p className='fs-20 ln-25'>
                            <ReactMarkdown>
                                {data[chapterIndex]?.text}
                            </ReactMarkdown>
                        </p>
                </div>
            </div>
        </div>
    );
};
export { Infos };
