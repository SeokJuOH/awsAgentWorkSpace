import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AmazonConnectApp } from "@amazon-connect/app";

const { provider } = AmazonConnectApp.init({
  onCreate: async(event) => {
    const { appInstanceId } = event.context;
    console.log('App initialized: ', appInstanceId);
  },
  onDestroy: async(event) => {
    console.log('App being destroyed',);
  },
});
console.log("provider",provider);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
