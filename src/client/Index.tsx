import 'file-loader?name=[name].[ext]!../../index.html';
import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './App'; //RETURN HERE IF ISSUES ARISE

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
