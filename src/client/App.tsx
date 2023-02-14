import React, { Suspense } from "react"; //lazy
import { BrowserRouter } from 'react-router-dom'; //Routes, Route, Navigate

const App = () => (
  <BrowserRouter>
    <Suspense fallback = {<div>LOADING...</div>}>
      <h1>... TypeScript!</h1>
    </Suspense>
  </BrowserRouter>
);

export default App;
