import React, { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Body,
  InfoContainer,
  Tab,
  Content,
  IconImg,
  IconContainer,
  SelectStartButton,
  ArcadeBackground,
  CRTGlow,
  ArcadeGlowContainer,
} from './Styled';

import { neutral } from '../../utility/sounds';

import { motion } from 'framer-motion';
import axios from 'axios';

import CharacterCreator from './CharacterCreator';
import CharacterStats from './CharacterStats';
import Nav from '../nav/NavBar';
import LeaderBoard from '../result/LeaderBoard';

export const MenuContext = createContext<any>('');

import { UserContext } from '../../App';
import { ItemType, CharacterType, GameViewProps } from '../../types/interface';
import { enter } from '../../utility/sounds';

const Menu = (props: GameViewProps) => {
  const {
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
    setActiveUser,
    stateSession,
    setStateSession,
    avatar,
    setAvatar,
    userChars,
    setUserChars,
    currentChar,
    setCurrentChar,
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
    setStartFail,
    startFail,
  } = useContext(UserContext);

  const [active, setActive] = useState(0);
  // const [fetchedInventory, setFetchedInventory] = useState<ItemType[]>([]);
  const [hideStartButton, setHideStartButton] = useState(true);
  // const [startFail, setStartFail] = useState(false);
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

  const handleDropItem = (itemID: number) => {
    axios.patch(`/location/update/${currentChar.location}`, {
      drop_item_slot: itemID,
    });
    axios
      .delete('/character/inventory/delete', {
        data: {
          charID: currentChar._id,
          itemID: itemID,
        },
      })
      .then(() => {
        // console.log('inventory in handleDrop', fetchedInventory);
        fetchItems();
        //console.log('inventory in handleDrop after fetchItems', fetchedInventory);
      })
      .catch((err) => console.error('fetch after delete ERROR', err));
    // needs then and catches for both axios... call fetchItems?
  };

  const fetchItems = () => {
    axios
      .get<CharacterType>(`/character/${currentChar._id}`)
      .then((character: any) => {
        setCurrentChar(character.data);
        //console.log('EMPTY???', character.data.inventory);
        //console.log('BEFORE fetchedInventory in Menu- fetchedItems', fetchedInventory);
        setFetchedInventory([]);
        character.data.inventory.forEach((item) => {
          axios
            .get(`/item/${item}`)
            .then((item: any) => {
              // console.log('ITEM???', item.data);
              setFetchedInventory((prevInventory: ItemType[]) =>
                [...prevInventory, item.data as ItemType].sort(
                  (a, b) => b._id - a._id
                )
              );
              //console.log('fetchedInventory in Menu- fetchedItems', fetchedInventory);
            })
            // .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch((err) =>
              console.error('error fetching from ITEM router', err)
            );
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchItems', err)
      );
  };

  useEffect(() => {
    const sessionID: string = document.cookie.split('; ')[0].split('=')[1];
    setStateSession(sessionID);
    axios
      .get(`user/find/${sessionID}`)
      .then(({ data }) => {
        //console.log('USER', result);
        const { google_avatar } = data;
        setActiveUser(data);
        setAvatar(google_avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = (e) => {
    neutral.play();
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  console.log('currentChar IN MENU', currentChar, 'userCHARS', userChars);
  ////add this -->  <img src={avatar} />    <-- somewhere in JSX
  return (
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
        setActiveUser,
        stateSession,
        setStateSession,
        avatar,
        setAvatar,
        userChars,
        setUserChars,
        currentChar,
        setCurrentChar,
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
        setStartFail,
        startFail,
      }}
    >
      <MenuContext.Provider
        value={{ hideStartButton, setHideStartButton, startFail, setStartFail }}
      >
        <Body>
          <Nav
            isActive={false}
            showButton={true}
            handleSpeak={props.handleSpeak}
          />
          <ArcadeGlowContainer>
            <CRTGlow>
              <InfoContainer>
                <Tab
                  onClick={(e) => {
                    if (startFail) {
                      setStartFail(false);
                    }
                    setHideStartButton(true);
                    handleClick(e);
                  }}
                  active={active === 0}
                  id={0}
                >
                  Character Creation
                </Tab>
                <Tab
                  onClick={(e) => {
                    if (userChars.length) {
                      console.log('we made it');
                      setCurrentChar(userChars[0]);
                    }
                    setHideStartButton(false);
                    handleClick(e);
                  }}
                  active={active === 1}
                  id={1}
                >
                  Character Select
                </Tab>
                <Tab
                  onClick={(e: any) => {
                    setHideStartButton(true);
                    handleClick(e);
                    fetchItems();
                  }}
                  active={active === 2}
                  id={2}
                >
                  Top Scores
                </Tab>
              </InfoContainer>
              <>
                <Content active={active === 0}>
                  <h1 onClick={props.handleSpeak}>
                    <u>New Character:</u>
                  </h1>
                  <CharacterCreator handleSpeak={props.handleSpeak} />
                </Content>
                <Content active={active === 1}>
                  <CharacterStats handleSpeak={props.handleSpeak} />
                </Content>
                <Content active={active === 2}>
                  <div
                    style={{
                      margin: 'auto',
                      width: '80%',
                      height: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingBottom: '14rem',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <h1 style={{ textDecoration: 'underline' }}>
                      {' '}
                      Top Scores:{' '}
                    </h1>
                    <LeaderBoard />

                    {/* {fetchedInventory.map((item: Item, i) => {
                  return (
                    <div key={i}>
                      <IconContainer>
                        {item.name}
                        <IconImg
                          onClick={() => handleDropItem(item._id)}
                          src={item.image_url}
                        ></IconImg>
                      </IconContainer>
                    </div>
                  );
                })} */}
                  </div>
                </Content>
              </>
              {startFail && (
                <div style={{ display: 'grid', justifyContent: 'center' }}>
                  <motion.h3
                    animate={{ x: [0, 10, -10, 6, -6, 3, -3, 0] }}
                    style={{
                      color: 'red',
                      maxWidth: '34.4rem',
                      position: 'relative',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    CREATE A CHARACTER TO PLAY
                  </motion.h3>
                </div>
              )}
              {!hideStartButton && (
                <ArcadeBackground>
                  {' '}
                  <SelectStartButton
                    onClick={() => {
                      if (currentChar.name === 'Someguy McPlaceholder') {
                        setStartFail(true);
                        return;
                      } else if (
                        currentChar.health < 1 ||
                        currentChar.mood < 1
                      ) {
                        return;
                      } else {
                        handleClickStart();
                      }
                    }}
                  >
                    Start Game
                  </SelectStartButton>
                </ArcadeBackground>
              )}
            </CRTGlow>
          </ArcadeGlowContainer>
        </Body>
      </MenuContext.Provider>
    </UserContext.Provider>
  );
};

export default Menu;
