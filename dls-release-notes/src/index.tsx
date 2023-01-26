import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

// Type overwrites:
import './index.d';

// Hooks for dompurify
import './dompurify-hooks';

import { getOptions } from './utils/getOptions';

const container = document.getElementById("dls-release-notes-root");

ReactDOM.render(
  <React.StrictMode>
    <App options={getOptions(container)} />
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();