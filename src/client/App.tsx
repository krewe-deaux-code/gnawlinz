import React, { Suspense, lazy, createContext, useState } from "react"; //lazy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //Routes, Route, Navigate
import { GlobalStyle } from "./GlobalStyled";
import dayjs from 'dayjs';

const Title = lazy(() => import('./components/title/Title'));
const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));
//const NavBar  = lazy(() => import('./components/nav/NavBar));

export interface Character {
  _id: number;
  handle_id: number;
  name: string;
  image_url: string;
  slot0: number;
  slot1: number;
  slot2: number;
  slot3: number;
  slot4: number;
  slot5: number;
  slot6: number;
  slot7: number;
  health: number;
  strength: number;
  endurance: number;
  mood: number;
  location: number;
  ally_count: number;
}

export const ClockContext = createContext<any>('')
export const UserContext = createContext<any>('');

const App = () => {

  const [userChars, setUserChars] = useState<Character[]>([]);
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [activeUser, setActiveUser] = useState({});
  const [stateSession, setStateSession] = useState('');
  const [avatar, setAvatar] = useState('');

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
      <UserContext.Provider value={{activeUser, stateSession, avatar, setAvatar, userChars, setUserChars, currentChar, setCurrentChar, setActiveUser, setStateSession }}>
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
      </UserContext.Provider>
    </ClockContext.Provider>
)
};
export default App;
