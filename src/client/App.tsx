import React, { Suspense, lazy } from "react"; //lazy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //Routes, Route, Navigate
import { GlobalStyle } from "./GlobalStyled";
const Title = lazy(() => import('./components/title/Title'));
const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));


const App = () => (
  <BrowserRouter>
   <GlobalStyle/>
    <Suspense fallback={<div>LOADING...</div>}>

  
      <Routes>
        <Route path='/' element={<Title />} />
        <Route path='menu' element={<Menu />} />
        <Route path='gameView' element={<GameView />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      {/* <Menu /> */}
      {/* <a href="/auth/google">authenticate that typescript is great</a> */}
    </Suspense>
  </BrowserRouter>
);

export default App;
