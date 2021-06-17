import React, { useState, useRef } from 'react';
import { useCol } from '../../Hooks/firebase';
import Selector from './Selector';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EducationPost from './EducationPost';
import Editor from './Editor';

function Admin() {
    const [value, setValue] = React.useState('**Hello world!!!**');

    return (
        <div className='h-vh-100 w-vw-100 flex pa-30'>
            <div className='side-elements w-vw-20 h-p-100 flex-col'>
                <Link to='/admin/Education'>Education</Link>
                <Link to='/admin/College prep'>College prep</Link>
                <Link to='/admin/Interview'>Interview</Link>
                <Link to='/admin/Blog'>Blog</Link>
            </div>
            <div>
                <Switch>
                    <Route exact path='/admin/Education'>
                        <EducationPost />
                    </Route>
                    <Route exact path='/admin/College prep'>
                        College prep input
                    </Route>
                    <Route exact path='/admin/Interview'>
                        Interview input
                    </Route>
                    <Route exact path='/admin/Blog'>
                        Blog input
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default Admin;
