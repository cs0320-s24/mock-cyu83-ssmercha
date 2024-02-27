import React from 'react';
import ReactDOM from 'react-dom/client';
import './main/mock/styles/index.css';
import App from './main/mock/components/App';

// Tim removed some boilerplate to keep things simple.
// We're using an older version of React here.

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);