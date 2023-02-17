import React, { Suspense, lazy } from "react"; //lazy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //Routes, Route, Navigate

const Title = lazy(() => import('./components/title/Title'));
// const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));
const App = () => (
  <BrowserRouter>
    <Suspense fallback = {<div>LOADING...</div>}>

      <Routes>
        <Route path= '/' element={<Title />} />
        <Route path='gameView' element={<GameView />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      {/* <Menu /> */}
      {/* <a href="/auth/google">authenticate that typescript is great</a> */}
    </Suspense>
  </BrowserRouter>
);

export default App;
