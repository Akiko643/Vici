import React, { useState, useRef } from 'react';
import { useCol } from '../../Hooks/firebase';
import MDEditor from '@uiw/react-md-editor';
import Selector from "./Selector"
function Admin() {
    const [header, setHeader] = useState('');
    const [information, setInformation] = useState('');
    const createContent = useCol('content').createRecord;
    // const
    const post = () => {
        console.log('sent!');
        createContent(header, { header, information });
    };
    const [value, setValue] = React.useState("**Hello world!!!**");
    return (
        <div className='h-vh-100 flex-center'>
            <Selector/>
            <div className="w75">
                <MDEditor
                    value={value}
                    onChange={setValue}
                />
            </div>
            <MDEditor.Markdown source={value} />
        </div>
        
    );
}

export default Admin;
