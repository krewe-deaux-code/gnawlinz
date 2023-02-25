import React, { Suspense, lazy, createContext, useState, useEffect, useRef } from 'react'; //lazy
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; //Routes, Route, Navigate
import { GlobalStyle } from './GlobalStyled';
import axios from 'axios';

const Title = lazy(() => import('./components/title/Title'));
const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));
//const NavBar  = lazy(() => import('./components/nav/NavBar'));
const Result = lazy(() => import('./components/result/Result'));

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

export const UserContext = createContext<any>('');

const App = () => {

  const [userChars, setUserChars] = useState<Character[]>([]);
  const [currentChar, setCurrentChar] = useState<Character>({} as Character);
  const initialCharRef = useRef(currentChar);
  const [activeUser, setActiveUser] = useState({});
  const [stateSession, setStateSession] = useState('');
  const [avatar, setAvatar] = useState('');

  const characterUpdate = () => {
    axios.patch<Character>(`/character/update/${currentChar._id}`, currentChar)
      .then(() => console.log('success'))
      .catch((err) => console.error('error update from axios front end', err));
  };

  useEffect(() => {
    console.log('currentChar has changed:', currentChar);
    characterUpdate();
  }, [currentChar !== initialCharRef.current]);

  return (

    <UserContext.Provider value={{ activeUser, stateSession, avatar, setAvatar, userChars, setUserChars, currentChar, setCurrentChar, setActiveUser, setStateSession }}>
      <BrowserRouter>
        <GlobalStyle />
        <Suspense fallback={<div>LOADING...</div>}>


          <Routes>
            <Route path='/' element={<Title />} />
            <Route path='menu' element={<Menu />} />
            <Route path='gameView' element={<GameView />} />
            <Route path='result' element={<Result />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>

          {/* <Menu /> */}
          {/* <a href="/auth/google">authenticate that typescript is great</a> */}
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
    //</ClockContext.Provider>
  );
};
export default App;
