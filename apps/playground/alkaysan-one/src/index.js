import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlkaysanOAuthProvider } from '@noonor/alkaysan-one';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlkaysanOAuthProvider
      clientId={10}
      clientSecret="7HkfAQrJUabCFIGGYpDBfDFUCMtZ3pshMlC679Zb"
      redirectURI="https://halibut-meet-sculpin.ngrok-free.app"
      responseType="code"
    >
      <App />
    </AlkaysanOAuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
