import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

const setVh = () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
};
window.addEventListener('resize', setVh);
setVh();
