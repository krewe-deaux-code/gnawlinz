import React, { Suspense, lazy, createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyled';
import axios from 'axios';

// import { SettingsContext } from './components/title/Title';

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
  score: number;
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
  score: number;
  initial_text: string;
  victory: string;
  defeat: string;
  contact: string;
}

export interface Item {
  _id: number;
  name: string;
  image_url: string;
  consumables: boolean;
  modified_stat0: string;
  modified_stat1: string;
  modifier0: number;
  modifier1: number;
  buy_price: number;
  sell_price: number;
}

export interface Ally {
  _id: number;
  name: string;
  image_url: string;
  strength: number;
  endurance: number;
  alignment: string;
  greeting: string;
  departing: string;
}

export const UserContext = createContext<any>('');
export const SettingsContext = createContext<any>('');


const App = () => {

  const [volume, setVolume] = useState(0.7);
  // const { volume, setVolume } = useContext(SettingsContext);

  const [userChars, setUserChars] = useState<Character[]>([]);
  const [currentChar, setCurrentChar] = useState<Character>({} as Character);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | object>({});
  const [currentAlly, setCurrentAlly] = useState<Ally | object>({});
  const [metAllyArr, setMetAllyArr] = useState<number[]>([]);
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

  // Create a new SpeechSynthesis object
  const synth = window.speechSynthesis;

  // Function to create and play speech
  const speak = (text) => {
    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(text);

    // Set the voice and other options for the speech
    utterance.voice = synth.getVoices()[0];
    utterance.rate = 1;
    utterance.pitch = 1;

    // Play the speech
    synth.speak(utterance);
  };

  // Select all elements with the class name "speech"
  const elements = document.querySelectorAll('.speech');

  // Bind the elements to the speak() function
  elements.forEach((element) => {
    console.log('this is my console.log');
    element.addEventListener('click', () => {
      const text = element.textContent;
      speak(text);
    });
  });

  return (
    <SettingsContext.Provider value={{ volume, setVolume }}>
      <UserContext.Provider value={{ metAllyArr, setMetAllyArr, currentAlly, setCurrentAlly, currentEnemy, setCurrentEnemy, prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations, location, setLocation, activeUser, stateSession, avatar, setAvatar, userChars, setUserChars, currentChar, setCurrentChar, setActiveUser, setStateSession, event, setEvent, selectedChoice, setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled, setInvestigateDisabled }}>
        <BrowserRouter>
          <GlobalStyle />
          <Suspense fallback={<div>LOADING...</div>}>

            <Routes>
              <Route path='/' element={<Title />} />
              <Route path='menu' element={<Menu />} />
              <Route path='game-view' element={<GameView />} />
              <Route path='result' element={<Result />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>

          </Suspense>
        </BrowserRouter>
      </UserContext.Provider>
    </SettingsContext.Provider>
  );
};
export default App;
