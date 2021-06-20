import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthUserProvider } from './Hooks/auth-user-provider';
import { TopCollegeProvider } from './Providers/TopCollegeProvider';
import { Provider } from './Providers/contentProvider';
ReactDOM.render(
    <React.StrictMode>
            <Provider>
        <AuthUserProvider>
                <TopCollegeProvider>
                    <App />
                </TopCollegeProvider>
        </AuthUserProvider>
        </Provider>

    </React.StrictMode>,
    document.getElementById('root')
);
