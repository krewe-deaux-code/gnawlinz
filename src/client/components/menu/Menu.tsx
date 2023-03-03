import React, { useState, useEffect, useContext } from 'react'; //useContext
import { Link } from 'react-router-dom';
import { Body, InfoContainer, Tab, Content, IconImg, IconContainer } from './Styled';
import CharacterStats from './CharacterStats';
import axios from 'axios';
import Nav from '../nav/NavBar';
//import { Cookie } from "express-session";
//export const AuthContext = React.createContext(null);

// export const UserContext = createContext<any>('');
import { UserContext, Item, Character } from '../../App';
//import ItemSlots from './ItemSlots';


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
  const [fetchedInventory, setFetchedInventory] = useState<Item[]>([]);

  const handleItemLookup = () => {
    // setFetchedInventory([]);
    currentChar.inventory.forEach(item => {
      axios.get(`/item/${item}`)
        .then((item: any) => {
          // console.log('ITEM???', item.data);
          setFetchedInventory((prevInventory: Item[]) => [...prevInventory, item.data as Item]);
        })
        .catch(err => console.error('error fetching from ITEM router', err));
    });
  };

  const handleDropItem = (itemID) => {
    axios.put(`/location/drop_item_slot/${currentChar.location}`, { drop_item_slot: itemID });
    axios.delete('/character/inventory/delete', {
      data: {
        charID: currentChar._id,
        itemID: itemID,
      }
    })
      .then(() => {
        console.log('inventory in handleDrop', fetchedInventory);
        fetchItems();
        console.log('inventory in handleDrop after fetchItems', fetchedInventory);
      })
      .catch(err => console.error('fetch after delete ERROR', err));
    // needs then and catches for both axios... call fetchItems?
  };

  const fetchItems = () => {
    axios.get<Character>(`/character/${currentChar._id}`)
      .then((character: any) => {
        setCurrentChar(character.data);
        console.log('EMPTY???', character.data.inventory);
        console.log('BEFORE fetchedInventory in Menu- fetchedItems', fetchedInventory);
        setFetchedInventory([]);
        character.data.inventory.forEach(item => {
          axios.get(`/item/${item}`)
            .then((item: any) => {
              // console.log('ITEM???', item.data);
              setFetchedInventory((prevInventory: Item[]) => [...prevInventory, item.data as Item].sort((a, b) => b._id - a._id));
              console.log('fetchedInventory in Menu- fetchedItems', fetchedInventory);
            })
            .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch(err => console.error('error fetching from ITEM router', err));
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchItems', err));
  };

  // const handleDrop = () => {

  // };

  // below function fire upon "inventory" tab click ??


  useEffect(() => {
    const sessionID: string = document.cookie.split('; ')[0].split('=')[1];
    setStateSession(sessionID);
    axios.get(`user/find/${sessionID}`)
      .then(({ data }) => {
        //console.log('USER', result);
        const { google_avatar } = data;
        setActiveUser(data);
        setAvatar(google_avatar);
      }).catch((err) => {
        console.error(err);
      });

  }, []);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  // const checkInventory = () => {
  //   if (fetchedInventory.length) {
  //     fetchedInventory.map((item: Item, i) => {
  //       return <div
  //         key={i}
  //         onClick={() => handleDropItem(item._id)}>
  //         {item.name}<IconImg src={item.image_url}></IconImg></div>;
  //     });
  //   }
  // };

  //console.log(avatar, stateSession);
  ////add this -->  <img src={avatar} />    <-- somewhere in JSX
  return (
    <UserContext.Provider value={{ activeUser, stateSession, avatar, userChars, setUserChars, currentChar, setCurrentChar }}>
      <Body >
        <Nav isActive={false} />
        <InfoContainer >
          <Tab onClick={handleClick} active={active === 0} id={0}>
            Character Select
          </Tab>
          <Tab onClick={handleClick} active={active === 1} id={1}>
            Character Creation
          </Tab>
          <Tab onClick={(e: any) => { handleClick(e); fetchItems(); }} active={active === 2} id={2}>
            Inventory
          </Tab>
        </InfoContainer>
        <>
          <Content active={active === 0}>
            <CharacterStats />
          </Content>
          <Content active={active === 1}>
            <h1>Character Creation:</h1>
            <p>To be implemented in a future build</p>
            {/* <CharacterCreation/> */}
            {/* <span><b>Name:</b></span><span> Jean Valgene</span><br />
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
            </span> */}
          </Content>
          <Content active={active === 2}>
            <div>
              {
                fetchedInventory.map((item: Item, i) => {
                  return <div key={i}>
                    <IconContainer>{item.name}<IconImg onClick={() => handleDropItem(item._id)} src={item.image_url}></IconImg></IconContainer></div>;
                })
              }
            </div>
          </Content>
        </>
        <button>
          <Link to="/gameView">Start Game</Link>
        </button>

      </Body >
    </UserContext.Provider>
  );
};

export default Menu;
