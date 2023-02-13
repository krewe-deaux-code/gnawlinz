import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('app')).render(
//   <App />
// );

const domNode = document.getElementById('app');
const root = createRoot(domNode as HTMLElement);
root.render(<App />);
