import React from 'react';
import SimpleMDE, { SimpleMdeReact } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import ReactDOMServer from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

const Editor = ({ value, setValue }) => {
    return (
        <>
            <SimpleMdeReact value={value} onChange={setValue} />
            {/* <ReactMarkdown>{value}</ReactMarkdown> */}
        </>
    );
};

export default Editor;
