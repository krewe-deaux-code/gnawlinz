import React, { Suspense, lazy, createContext, useState } from "react"; //lazy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //Routes, Route, Navigate
import { GlobalStyle } from "./GlobalStyled";
import dayjs from 'dayjs';

const Title = lazy(() => import('./components/title/Title'));
const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));

export const ClockContext = createContext<any>('')

const App = () => {

  const [remainingTime, setRemainingTime] = useState<any>('');

  function calculateRemainingTime() {
    let interval = setInterval(() => {
      let daysLeft = 3;
      let startTime = dayjs();
      let endTime = startTime.add( daysLeft, 'day').startOf('day');
      let remainingTime = endTime.diff(dayjs(), 'millisecond');
      let remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      let formattedTime = `${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
      setRemainingTime(formattedTime);

    }, 1000);
    return () => clearInterval(interval);
  };

  return (
    <ClockContext.Provider value={{remainingTime, setRemainingTime, calculateRemainingTime}} >
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
    </ClockContext.Provider>
)
};
export default App;
