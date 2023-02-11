import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Suspense fallback = {<div>LOADING...</div>}>
      <h1>ROUTES WILL LIVE HERE</h1>
    </Suspense>
  </BrowserRouter> 
)

export default App;
