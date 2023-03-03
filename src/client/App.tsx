import React, { Suspense, lazy, createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  inventory: Array<number>;
  health: number;
  strength: number;
  endurance: number;
  mood: number;
  location: number;
  ally_count: number;
}

export interface EventData {
  _id: number;
  initial_text: string;
  choice0: number;
  choice1: number;
  choice2: number;
  choice3: number;
  enemy_effect: boolean;
  ally_effect: boolean;
  item_effect: boolean;
}

export interface ChoiceData {
  _id: number;
  flavor_text: string;
  success: string;
  failure: string;
  alignment0: string;
  alignment1: string;
  alignment2: string;
}

export interface LocationData {
  _id: number;
  name: string;
  image_url: string;
  random_item_spot1: string;
  random_item_spot2: string;
  drop_item_slot: number;
  graffiti: string;
  graffiti_msg: string;
}

export interface Enemy {
  _id: number;
  name: string;
  image_url: string;
  weapon1: string;
  strength: number;
  health: number;
}

export const UserContext = createContext<any>('');



const App = () => {

  const [userChars, setUserChars] = useState<Character[]>([]);
  const [currentChar, setCurrentChar] = useState<Character>({} as Character);
  const [activeUser, setActiveUser] = useState({});
  const [stateSession, setStateSession] = useState('');
  const [avatar, setAvatar] = useState('');
  const [event, setEvent] = useState({} as EventData);
  const [selectedChoice, setSelectedChoice] = useState({} as ChoiceData);
  const [choices, setChoices] = useState({
    engage: 0,
    evade: 0,
    evacuate: 0,
    wildcard: 0
  });
  const [outcome, setOutcome] = useState('');
  const [location, setLocation] = useState({} as LocationData);
  const [allLocations, setAllLocations] = useState<LocationData[]>([]);
  const [visited, setVisited] = useState<LocationData[]>([]);
  const [investigateDisabled, setInvestigateDisabled] = useState();

  const [prevEventId, setPrevEventId] = useState(0); // maybe null if event _id starts at 0...

  const characterUpdate = () => {
    axios.patch<Character>(`/character/update/${currentChar._id}`, currentChar)
      .then(() => console.log('character updated (@APP LEVEL)'))
      .catch((err) => console.error('error update from axios front end', err));
  };

  useEffect(() => {
    characterUpdate();
  }, [currentChar]);

  return (

    <UserContext.Provider value={{ prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations, location, setLocation, activeUser, stateSession, avatar, setAvatar, userChars, setUserChars, currentChar, setCurrentChar, setActiveUser, setStateSession, event, setEvent, selectedChoice, setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled, setInvestigateDisabled }}>
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

        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>

  );
};
export default App;
