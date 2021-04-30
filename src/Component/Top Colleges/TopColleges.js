import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import Country from './Country';

import { Switch, Route, Link } from 'react-router-dom';
import { Context } from '../../Providers/TopCollegeProvider';

function Visible(name) {
    // console.log(name);
    let subtag = document.getElementById(name);
    if (subtag.classList.contains('dn')) subtag.classList.remove('dn');
    else subtag.classList.add('dn');
}

function TopColleges() {
    const { informations } = useContext(Context);
    return (
        <div>
            <Navbar />
            <div className='ph-96 pv-32'>
                <div>
                    <h3 className='fw-400'>College</h3>
                    <h1 className='c-secondary fs-40 fw-400'>Top Colleges</h1>
                </div>
                <div className='flex-row mt-32'>
                    <div className='w15 bt-border-1'>
                        {informations.map((info) => {
                            return (
                                <div>
                                    <h1
                                        onClick={() => Visible(info.header)}
                                        className='bb-border-1 fs-20 pa-8 fw-400'
                                    >
                                        {info.header}
                                    </h1>
                                    <div
                                        id={info.header}
                                        className='subtag ml-16'
                                    >
                                        {info.countries.map((country) => {
                                            console.log(country.name);
                                            return (
                                                <Link
                                                    to={`/top-colleges/${country.name}`}
                                                    className='a-style'
                                                >
                                                    <h2 className='bb-border-1 fs-20 pa-8 fw-400'>
                                                        {country.name}
                                                    </h2>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='br-border-1 ml-128 bradius-16'>
                        {informations.map((info) => (
                            <Switch>
                                {info.countries.map((country) => {
                                    return (
                                        <Route
                                            exact
                                            path={`/top-colleges/${country.name}`}
                                        >
                                            <Country data={country} />
                                        </Route>
                                    );
                                })}
                            </Switch>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopColleges;
