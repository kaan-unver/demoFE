import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import store from './base/reduxstore';

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'production') console.log = () => {};

root.render(
    <HashRouter>
        <AppWrapper></AppWrapper>
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
