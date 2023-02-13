import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// ReactDOM.createRoot(document.getElementById('app')).render(
//   <App />
// );
const domNode: any = document.getElementById('app');
const root = createRoot(domNode);
root.render(<App />);
