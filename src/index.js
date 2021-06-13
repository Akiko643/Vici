import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthUserProvider } from './Hooks/auth-user-provider';

ReactDOM.render(
    <React.StrictMode>
        <AuthUserProvider>
            <App />
        </AuthUserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
