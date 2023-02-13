import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; //RETURN HERE IF ISSUES ARISE

// const container = document.getElementById('app');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<App />);


ReactDOM.createRoot(document.getElementById('app')).render(
  <App />
);
