import React, { useState, useEffect, useContext } from "react"; //useContext
import { Link  } from 'react-router-dom';
import { Body, InfoContainer, Tab, Content } from './Styled';
import CharacterStats from './CharacterStats';
import axios from 'axios';

//import { Cookie } from "express-session";
//export const AuthContext = React.createContext(null);

// export interface Character {
//   _id: number;
//   handle_id: number;
//   name: string;
//   image_url: string;
//   slot0: number;
//   slot1: number;
//   slot2: number;
//   slot3: number;
//   slot4: number;
//   slot5: number;
//   slot6: number;
//   slot7: number;
//   health: number;
//   strength: number;
//   endurance: number;
//   mood: number;
//   location: number;
//   ally_count: number;
// }

// export const UserContext = createContext<any>('');
import { UserContext } from "../../App";

const Menu: React.FC = () => {

  // const [userChars, setUserChars] = useState<Character[]>([]);
  // const [currentChar, setCurrentChar] = useState<Character | null>(null);
  // const [activeUser, setActiveUser] = useState({});
  // const [stateSession, setStateSession] = useState('');
  // const [avatar, setAvatar] = useState('');
  const {
    userChars, setUserChars, currentChar, setCurrentChar,
    activeUser, setActiveUser, stateSession, setStateSession,
    avatar, setAvatar } = useContext(UserContext);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const sessionID: any = document.cookie.split('; ')[0].split('=')[1];
    setStateSession(sessionID);
    axios.get(`user/find/${sessionID}`)
      .then((result) => {
        console.log('USER', result);
        const { google_avatar } = result.data
        setActiveUser(result.data);
        setAvatar(google_avatar);
      }).catch((err) => {
        console.error(err)
      })

  }, []);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  console.log(avatar, stateSession);
  ////add this -->  <img src={avatar} />    <-- somewhere in JSX
  return (
    <UserContext.Provider value={{activeUser, stateSession, avatar, userChars, setUserChars, currentChar, setCurrentChar }}>
      <Body >
        <InfoContainer >
          <Tab onClick={handleClick} active={active === 0} id={0}>
            Character Details
          </Tab>
          <Tab onClick={handleClick} active={active === 1} id={1}>
            Character Stats
          </Tab>
          <Tab onClick={handleClick} active={active === 2} id={2}>
            Inventory
          </Tab>
        </InfoContainer>
        <>
          <Content active={active === 0}>
            <h1>Character Story:</h1>
            <span><b>Name:</b></span><span> Jean Valgene</span><br />
            <span><b>Age:</b></span><span> 31</span><br />
            <span><b>Background:</b><br /></span>
          <span> Jono do my bidding...</span><br />
            <span><b>Current Alignment:</b><br />
            Evil/Old</span><br />
          <span>
            <b>Jean Valgene's Story:</b><br />
            Jean Valgene decided to take a walk down to Chompitoulas Street<br />
            Jean Valgene decided to look under a trash can<br />
            Jean Valgene found a stray cat<br />
            Jean Valgene decided to eat stray cat providing +1 temporary health and strength
          </span>
        </Content>
          <Content active={active === 1}>
            <CharacterStats />
          </Content>
          <Content active={active === 2}>
            <h1>Items</h1>
            <span><b>This:</b></span><br />
            <span><b>Will:</b></span><br />
            <span><b>Be State:</b></span><br />
          </Content>
        </>
        <Link to="/gameView">GameView</Link>

      </Body >
    </UserContext.Provider>
  )
};

export default Menu;
