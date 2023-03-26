import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Body, InfoContainer, Tab, Content, IconImg, IconContainer, SelectStartButton } from './Styled';
import { motion } from 'framer-motion';
import axios from 'axios';

import CharacterCreator from './CharacterCreator';
import CharacterStats from './CharacterStats';
import Nav from '../nav/NavBar';

export const MenuContext = createContext<any>('');

import { UserContext } from '../../App';
import { Item, Character } from '../../utility/interface';
import { enter } from '../../utility/sounds';

const Menu: React.FC = () => {

  const {
    userChars, setUserChars, currentChar, setCurrentChar,
    activeUser, setActiveUser, stateSession, setStateSession,
    avatar, setAvatar } = useContext(UserContext);

  const [active, setActive] = useState(0);
  const [fetchedInventory, setFetchedInventory] = useState<Item[]>([]);
  const [hideStartButton, setHideStartButton] = useState(true);
  const [startFail, setStartFail] = useState(false);
  const navigate = useNavigate();

  const handleClickStart = () => {
    enter.play();
    navigate('/game-view');
  };
  // const handleItemLookup = () => {
  //   // setFetchedInventory([]);
  //   currentChar.inventory.forEach(item => {
  //     axios.get(`/item/${item}`)
  //       .then((item: any) => {
  //         // console.log('ITEM???', item.data);
  //         setFetchedInventory((prevInventory: Item[]) => [...prevInventory, item.data as Item]);
  //       })
  //       .catch(err => console.error('error fetching from ITEM router', err));
  //   });
  // };

  const handleDropItem = (itemID) => {
    axios.patch(`/location/update/${currentChar.location}`, { drop_item_slot: itemID });
    axios.delete('/character/inventory/delete', {
      data: {
        charID: currentChar._id,
        itemID: itemID,
      }
    })
      .then(() => {
        // console.log('inventory in handleDrop', fetchedInventory);
        fetchItems();
        //console.log('inventory in handleDrop after fetchItems', fetchedInventory);
      })
      .catch(err => console.error('fetch after delete ERROR', err));
    // needs then and catches for both axios... call fetchItems?
  };

  const fetchItems = () => {
    axios.get<Character>(`/character/${currentChar._id}`)
      .then((character: any) => {
        setCurrentChar(character.data);
        //console.log('EMPTY???', character.data.inventory);
        //console.log('BEFORE fetchedInventory in Menu- fetchedItems', fetchedInventory);
        setFetchedInventory([]);
        character.data.inventory.forEach(item => {
          axios.get(`/item/${item}`)
            .then((item: any) => {
              // console.log('ITEM???', item.data);
              setFetchedInventory((prevInventory: Item[]) => [...prevInventory, item.data as Item].sort((a, b) => b._id - a._id));
              //console.log('fetchedInventory in Menu- fetchedItems', fetchedInventory);
            })
            // .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch(err => console.error('error fetching from ITEM router', err));
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchItems', err));
  };

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

  console.log('currentChar IN MENU', currentChar);
  ////add this -->  <img src={avatar} />    <-- somewhere in JSX
  return (
    <UserContext.Provider value={{ activeUser, stateSession, avatar, userChars, setUserChars, currentChar, setCurrentChar, setStartFail, startFail }}>
      <MenuContext.Provider value={{ hideStartButton, setHideStartButton, startFail, setStartFail }}>
        <Body >
          <Nav isActive={false} />
          <InfoContainer >
            <Tab onClick={(e) => {
              if (startFail) { setStartFail(false); }
              setHideStartButton(true);
              handleClick(e);
            }} active={active === 0} id={0}>
              Character Creation
            </Tab>
            <Tab onClick={(e) => {
              setHideStartButton(false);
              handleClick(e);
            }} active={active === 1} id={1}>
              Character Select
            </Tab>
            <Tab onClick={(e: any) => { handleClick(e); fetchItems(); }} active={active === 2} id={2}>
              Inventory
            </Tab>
          </InfoContainer>
          <>
            <Content active={active === 0}>
              <h1><u>New Character:</u></h1>
              <CharacterCreator />
            </Content>
            <Content active={active === 1}>
              <CharacterStats />
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
          {startFail && <div style={{ display: 'grid', justifyContent: 'center', }}
          ><motion.h3
            animate={{ x: [0, 10, -10, 6, -6, 3, -3, 0] }}
            style={{ color: 'red', maxWidth: '34.4rem', position: 'relative' }}
            transition={{ duration: .3 }}
          >CREATE A CHARACTER TO PLAY</motion.h3></div>}
          {!hideStartButton &&
            <SelectStartButton onClick={() => {
              if (currentChar.name === 'Someguy McPlaceholder') {
                setStartFail(true);
                return;
              } else {
                handleClickStart();
              }
            }}>Start Game</SelectStartButton>
          }
        </Body >
      </MenuContext.Provider>
    </UserContext.Provider>
  );
};

export default Menu;
