import React, { Suspense, lazy } from "react"; //lazy
import { BrowserRouter } from 'react-router-dom'; //Routes, Route, Navigate

const Title = lazy(() => import('./components/title/Title'));
// const Menu = lazy(() => import('./components/menu/Menu'));

const App = () => (
  <BrowserRouter>
    <Suspense fallback = {<div>LOADING...</div>}>
      <Title />
      {/* <Menu /> */}
      {/* <a href="/auth/google">authenticate that typescript is great</a> */}
    </Suspense>
  </BrowserRouter>
);

export default App;
