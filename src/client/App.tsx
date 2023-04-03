import React, {
  Suspense,
  lazy,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './GlobalStyled';
import axios from 'axios';
import {
  Character,
  Enemy,
  Ally,
  EventData,
  ChoiceData,
  LocationData,
  Item,
} from './utility/interface';
// import { SettingsContext } from './components/title/Title';

const Title = lazy(() => import('./components/title/Title'));
const Menu = lazy(() => import('./components/menu/Menu'));
const GameView = lazy(() => import('./components/gameView/GameView'));
//const NavBar  = lazy(() => import('./components/nav/NavBar'));
const Result = lazy(() => import('./components/result/Result'));

export const UserContext = createContext<any>(''); // User model / interface User || null
export const SettingsContext = createContext<any>('');

const App = () => {
  const [volume, setVolume] = useState(0.7);
  // const { volume, setVolume } = useContext(SettingsContext);

  // for text to speech toggle button
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
    wildcard: 0,
  });
  const [outcome, setOutcome] = useState('');
  const [location, setLocation] = useState({} as LocationData);
  const [allLocations, setAllLocations] = useState<LocationData[]>([]);
  const [visited, setVisited] = useState<LocationData[]>([]);
  const [investigateDisabled, setInvestigateDisabled] = useState();
  const [tagDisabled, setTagDisabled] = useState();

  const [prevEventId, setPrevEventId] = useState(0); // maybe null if event _id starts at 0...

  // item bonus/inventory state
  const [fetchedInventory, setFetchedInventory] = useState<Item[]>([]);

  const fetchItems = (charInventory) => {
    const currentInventory = charInventory.map((item) =>
      axios.get(`/item/${item}`)
    );
    Promise.all(currentInventory)
      .then((items) => {
        const inventoryData = items.map((item) => item.data);
        setFetchedInventory(inventoryData.sort((a, b) => b._id - a._id));
      })
      .catch((err) => console.error('Error in fetchItems in App', err));
  };

  const characterUpdate = () => {
    const sortedInventoryChar = currentChar;
    if (sortedInventoryChar.inventory) {
      if (sortedInventoryChar.inventory.length > 8) {
      sortedInventoryChar.inventory.splice(8, 1);
      }
      sortedInventoryChar.inventory.sort((a, b) => b - a);
    }
    console.log('WHAT AM I', currentChar);
    axios
      .patch<Character>(
        `/character/update/${currentChar._id}`,
        sortedInventoryChar
      )
      .then(() => {
        console.log('character updated (@APP LEVEL)', currentChar);
      })
      .catch((err) => console.error('error update from axios front end', err));
  };

  const randomItem = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // const fetchItem = () => {
  //   const randomNum = randomItem(1, 11);
  //   // axios.get(`/item/${randomItem(1, 11)}`)
  //   //   .then(item => {

  //   //   })
  //   //   .catch(err => console.error('single item fetch fail', err));
  //   setCurrentChar((prevChar) => ({
  //     ...prevChar,
  //     inventory: [randomNum, ...prevChar.inventory],
  //   }));
  // };

  const locationUpdate = () => {
    console.log('WHAT AM I', location);
    const randomItemLocation = location;
    if (location.drop_item_slot === 1) {
      if (Math.random() < 0.2) {
        randomItemLocation.drop_item_slot = randomItem(1, 11);
      }
    }
    axios
      .patch<LocationData>(
        `/location/update/${randomItemLocation._id}`,
        randomItemLocation
      )
      .then(() => console.log('location updated (@APP LEVEL)'))
      .catch((err) => console.error('error update from axios front end', err));
  };

  // text to speech functionality
  const msg = new SpeechSynthesisUtterance();

  const handleSpeak = (e) => {
    if (isSpeakingEnabled) {
      msg.text = e.target.innerText;
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    console.log('EVERY TIME CHAR CHANGES');
    characterUpdate();
    if (currentChar.inventory) {
      fetchItems(currentChar.inventory);
    }
  }, [currentChar]);

  useEffect(() => {
    console.log('LOCATION IN APP');
    locationUpdate();
  }, [location]);

  console.log('CURRENT CHAR', currentChar);

  return (
    <SettingsContext.Provider
      value={{
        volume,
        setVolume,
        isSpeakingEnabled,
        setIsSpeakingEnabled,
        isChecked,
        setIsChecked,
      }}
    >
      <UserContext.Provider
        value={{
          metAllyArr,
          setMetAllyArr,
          currentAlly,
          setCurrentAlly,
          currentEnemy,
          setCurrentEnemy,
          prevEventId,
          setPrevEventId,
          visited,
          setVisited,
          allLocations,
          setAllLocations,
          location,
          setLocation,
          activeUser,
          stateSession,
          avatar,
          setAvatar,
          userChars,
          setUserChars,
          currentChar,
          setCurrentChar,
          setActiveUser,
          setStateSession,
          event,
          setEvent,
          selectedChoice,
          setSelectedChoice,
          choices,
          setChoices,
          outcome,
          setOutcome,
          investigateDisabled,
          setInvestigateDisabled,
          tagDisabled,
          setTagDisabled,
          fetchedInventory,
          setFetchedInventory,
        }}
      >
        <BrowserRouter>
          <GlobalStyle />

          <Suspense fallback={<div>LOADING...</div>}>
            <Routes>
              <Route path='/' element={<Title />} />
              <Route path='menu' element={<Menu handleSpeak={handleSpeak} />} />
              <Route
                path='game-view'
                element={<GameView handleSpeak={handleSpeak} />}
              />
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
