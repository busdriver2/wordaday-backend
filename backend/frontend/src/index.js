import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WordContextProvider } from './context/WordContext'
import { AuthContextProvider } from './context/AuthContext'
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <AuthContextProvider>
      <WordContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </WordContextProvider>
    </AuthContextProvider>
  //</React.StrictMode>
);

