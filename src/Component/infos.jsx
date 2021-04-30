import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Context } from '../Providers/contentProvider';
import img from '../Img/Rectangle 14.png';
import Navbar from './Navbar/Navbar';
import { useDoc, useCol, useFirebase } from '../Hooks/firebase';
import { AuthStateValue } from '../Hooks/auth-user-provider';
const Infos = () => {
    const { informations } = useContext(Context);
    // const { data } = AuthStateValue();
    // const { firebase } = useFirebase();
    // console.log(data, 'data');
    return (
        <div className='w-vw-100 h-vh-100 font-ubuntu'>
            <Navbar />
            <img
                src={img}
                className='w100'
                alt='Hello world idk img here not loaded'
            />
            <div className='flex'>
                <div className='ma-10'>
                    {/* <Link to="/">Back</Link> */}
                    <ul className='fs-20 lh-20 list-style-none pa-20 br-default-1 bradius-20'>
                        {informations.map((info) => {
                            return (
                                <li className='c-default pb-10 bb-default-1 w-130 ma-4'>
                                    <Link
                                        to={`/infos/${info.header}`}
                                        className='a-style pa-5'
                                    >
                                        {info.header}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='ma-10 pa-100 pt-1'>
                    <Switch>
                        {informations.map((info) => {
                            return (
                                <Route exact path={`/infos/${info.header}`}>
                                    <h1 className='c-secondary'>
                                        {info.header}
                                    </h1>
                                    <p className='fs-20 ln-25'>
                                        {info.information}
                                    </p>
                                </Route>
                            );
                        })}
                    </Switch>
                </div>
            </div>
        </div>
    );
};
export { Infos };
