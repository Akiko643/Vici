import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthUserProvider } from './Hooks/auth-user-provider';
import { TopCollegeProvider } from './Providers/TopCollegeProvider';
import { Provider } from './Providers/contentProvider';
ReactDOM.render(
    <React.StrictMode>
        <AuthUserProvider>
            <Provider>
                <TopCollegeProvider>
                    <App />
                </TopCollegeProvider>
            </Provider>
        </AuthUserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
