import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// ReactDOM.createRoot(document.getElementById('app')).render(
//   <App />
// );
const domNode: Element | null = document.getElementById('app');
const root = createRoot(domNode as Element);
root.render(<App />);
