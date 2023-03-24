import axios from 'axios';
import Nav from '../nav/NavBar';
import Result from '../result/Result';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { ReactNode } from 'react';
import images from '../../utility/images';

import { io, Socket } from 'socket.io-client';
import { motion } from 'framer-motion';


import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Container, Main, Content1, KillFeed, KillFeedContainer,
  Content2, Content3, Footer, HudButton, InventoryTextBubble,
  EventText, StatContainer, ScrollableContainer,
  AllyImg, EnemyImg, CharImageStyles, CharStatusContainer,
  IconContainer, IconImg, InventoryBorder, InventoryStyle,
  StatBonusColor, StatContainer2, StatIconContainer, Page,
  TinyStatIconImg, TempStatBonusColor, ModalBodyContainer,
  StyledModal, ArcadeButton, ProgressBarContainer, OverlayValue
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext, SettingsContext } from '../../App';
import { EventData, ChoiceData, Enemy, Ally, Item, Character, GameViewProps } from '../../utility/interface';

import { statCheck, fightEnemy, isEnemy, addItem } from '../../utility/gameUtils';
import { complete, hit, dodge, evacuate, wildCard } from '../../utility/sounds';
import { ModalBody } from 'react-bootstrap';


const GameView = (props: GameViewProps) => {

  const {
    prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations,
    location, setLocation, currentChar, setCurrentChar, event, setEvent, selectedChoice,
    setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled,
    setInvestigateDisabled, currentEnemy, setCurrentEnemy, currentAlly, setCurrentAlly,
    metAllyArr, setMetAllyArr, fetchedInventory
  } = useContext(UserContext);

  // state for socket.io
  const [socket, setSocket] = useState<Socket | undefined>();
  const [killFeed, setKillFeed] = useState<string[]>([]);
  // state for investigate modal
  const [modalText, setModalText] = useState<ReactNode>('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [show, setShow] = useState(false);
  const [locationModalText, setLocationModalText] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [tempText, setTempText] = useState('');
  const [penalty, setPenalty] = useState('');
  const [showEnemy, setShowEnemy] = useState(false);
  const [showAlly, setShowAlly] = useState(false);
  const [damageToEnemy, setDamageToEnemy] = useState(0);
  const [damageToPlayer, setDamageToPlayer] = useState(0);

  const [bonusStrength, setBonusStrength] = useState(0);
  const [bonusEndurance, setBonusEndurance] = useState(0);
  const [bonusMood, setBonusMood] = useState(0);

  const [temporaryStrength, setTemporaryStrength] = useState(0);
  const [temporaryEndurance, setTemporaryEndurance] = useState(0);
  const [temporaryMood, setTemporaryMood] = useState(0);

  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [showEvent, setShowEvent] = useState(true);

  const fetchEvent = () => {
    setTempText('');
    axios.get<EventData>('/event/random', { params: { excludeEventId: prevEventId } })
      .then(event => {
        // console.log('EVENT', event);
        setEvent(event.data);
        setChoices({
          engage: event.data.choice0,
          evade: event.data.choice1,
          evacuate: event.data.choice2,
          wildcard: event.data.choice3
        });
        setPrevEventId(event.data._id);
        if (event.data.enemy_effect) {
          // <-- function: handleEnemyFetch() (setCurrentEnemy/Ally, .image_url somewhere)
          handleEnemyFetch();
          setEvent(prevEvent => ({
            ...prevEvent,
            enemy_effect: false
          }));
        } else {
          setCurrentEnemy({});
        }
        if (event.data.ally_effect) {
          // <-- function: handleEnemyFetch() (setCurrentEnemy/Ally, .image_url somewhere)
          handleAllyFetch();
          setEvent(prevEvent => ({
            ...prevEvent,
            ally_effect: false
          }));
        } else {
          setCurrentAlly({});
        }
      })
      .catch(err => {
        console.error('RANDOM EVENT FETCH FAILED', err);
      });
  };

  const handleClickButt = () => {
    setInvestigateDisabled(true);
  };
  const handleToggleEvent = () => {
    setShowEvent(showEvent ? false : true);
  };

  // NPC
  const handleEnemyFetch = () => {
    // Math.random to query enemy database w/ _id <-- NEEDS TO BE # OF ENEMIES IN DB
    axios.get<Enemy>(`/enemy/${Math.floor(Math.random() * 2) + 1}`)
      .then((enemy: any) => {
        setCurrentEnemy(enemy.data);
        //console.log('Enemy fetched, sending to state...');
        // <-- put enemy.data.image_url somewhere into HUD to indicate enemy
      })
      .catch(err => console.error('FETCH ENEMY ERROR', err));
  };

  const handleAllyFetch = () => {
    // Math.random to query enemy database w/ _id <-- NEEDS TO BE # OF ALLIES IN DB
    axios.get<Ally>(`/ally/${Math.floor(Math.random() * 2) + 1}`)
      .then((ally: any) => {
        // if (metAllyArr.includes(ally.data._id)) {
        // setCurrentAlly({});
        // } else {
        setMetAllyArr(prevMetAllyArr => [...prevMetAllyArr, ally.data._id]);
        setCurrentAlly(ally.data);
        //}
        //console.log('ally fetched, sending to state...');
        // <-- put ally.data.image_url somewhere into HUD to indicate enemy
      })
      .catch(err => console.error('FETCH ENEMY ERROR', err));
  };

  const getAllLocations = (buttonClick = -1) => {
    // console.log('Current Event on State: ', event);
    if (buttonClick > -1) {
      currentChar.location = visited[buttonClick]._id;
    }
    axios.get('/location/allLocations')
      .then(locations => {
        setVisited(locations.data.filter((current) => current._id === currentChar.location));
        setAllLocations(locations.data.filter((current) => current._id !== currentChar.location));
        setLocation(locations.data.filter((current) => current._id === currentChar.location)[0]);
        if (!Object.entries(event).length) {
          fetchEvent();
        }
      })
      .catch((err) => {
        console.error('Failed to retrieve all locations: ', err);
      });
    setInvestigateDisabled(false);
  };

  // Add a modal to handle location change after all locations have been used
  const handleShowLocationModal = () => setShowLocationModal(true);
  const handleCloseLocationModal = () => setShowLocationModal(false);



  const handleLocationChange = () => {
    setTemporaryMood(0);
    setTemporaryStrength(0);
    setTemporaryStrength(0);
    setShowAlly(false);
    setShowEnemy(false);
    setOutcome('');
    setSelectedChoice({} as ChoiceData);
    if (!allLocations.length) {
      setLocationModalText('true');
      handleShowLocationModal();
      return;
    }
    setAllLocations(prevLocations => prevLocations.slice(1));
    setLocation(allLocations[0]);
    setCurrentChar(prevStats => ({
      ...prevStats,
      location: allLocations[0]._id
    }));

    setVisited(prevVisited => [...prevVisited, allLocations[0]]);
    visited.forEach((location, i) => {
      localStorage.setItem(i.toString(), location.name);
    });

    fetchEvent();
    setInvestigateDisabled(false);
  };
  const handleToolTip = (button: string) => {
    if (button === 'engage') {
      setTooltip('Enter combat to grow your score');
    } else if (button === 'evade') {
      setTooltip('Risk a combat for chance at item');
    } else if (button === 'evacuate') {
      setTooltip('Leave the area without resolving this event');
    } else if (button === 'wildcard') {
      setTooltip('Risk depression for chance at ally');
    }
  };
  const handleToolTipOff = () => {
    setTooltip(null);
  };
  //  Item handling Functions drag and drop on location and character.
  //  *********************************************************************************************************************************************************************************************

  const handleOnMouseEnter = (item: Item) => {
    if (item._id !== 1) {
      setHoveredItem(item);
    }
  };

  const handleOnMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleDropItem = async (itemID, i) => {
    console.log('location in handleDropItem', location);
    await setLocation(currLocation => ({
      ...currLocation,
      drop_item_slot: itemID
    }));

    await setCurrentChar((previousStats) => {
      const undroppedInventory = previousStats.inventory;
      undroppedInventory[i] = 1;
      return {
        ...previousStats,
        inventory: undroppedInventory
      };
    });
  };

  const handleDropItemChar = (itemID, i) => {
    if (fetchedInventory[i].consumable === true) {
      setCurrentChar((previousStats) => {
        const undroppedInventory = previousStats.inventory;
        undroppedInventory[i] = 1;
        return {
          ...previousStats,
          inventory: undroppedInventory
        };
      });


      if (fetchedInventory[i].modified_stat0 === 'strength') {
        setTemporaryStrength(temporaryStrength + fetchedInventory[i].modifier0);
      }
      if (fetchedInventory[i].modified_stat1 === 'strength') {
        setTemporaryStrength(temporaryStrength + fetchedInventory[i].modifier1);
      }
      if (fetchedInventory[i].modified_stat0 === 'endurance') {
        setTemporaryEndurance(temporaryEndurance + fetchedInventory[i].modifier0);
      }
      if (fetchedInventory[i].modified_stat1 === 'endurance') {
        setTemporaryEndurance(temporaryEndurance + fetchedInventory[i].modifier1);
      }
      if (fetchedInventory[i].modified_stat0 === 'mood') {
        setTemporaryMood(temporaryMood + fetchedInventory[i].modifier0);
      }
      if (fetchedInventory[i].modified_stat1 === 'mood') {
        setTemporaryMood(temporaryMood + fetchedInventory[i].modifier1);
      }
      if (fetchedInventory[i].modified_stat0 === 'health') {

        setCurrentChar((previousStats) => {
          return {
            ...previousStats,
            health: previousStats.health + fetchedInventory[i].modifier0,
          };
        });
      }
      if (fetchedInventory[i].modified_stat1 === 'health') {
        console.log('FetchedInventory hit the health pot');
        setCurrentChar((previousStats) => {
          return {
            ...previousStats,
            health: previousStats.health + fetchedInventory[i].modifier1,
          };
        });
      }

    }
  };

  const handleOnDragItem = (e: React.DragEvent, itemId: number, i: number) => {
    const itemIdIndex = [itemId, i];
    e.dataTransfer.setData('itemWidget', JSON.stringify(itemIdIndex));
  };
  const itemBonuses = async () => {
    let strength = 0;
    let endurance = 0;
    let mood = 0;
    fetchedInventory.forEach((item) => {
      if (item.consumable === false) {
        if (item.modified_stat0 === 'strength') {
          strength += item.modifier0;
        }
        if (item.modified_stat1 === 'strength') {
          strength += item.modifier1;
        }
        if (item.modified_stat0 === 'endurance') {
          endurance += item.modifier0;
        }
        if (item.modified_stat1 === 'endurance') {
          endurance += item.modifier1;
        }
        if (item.modified_stat0 === 'mood') {
          mood += item.modifier0;
        }
        if (item.modified_stat1 === 'mood') {
          mood += item.modifier1;
        }
      }
    });
    await setBonusStrength(strength);
    await setBonusEndurance(endurance);
    await setBonusMood(mood);
  };

  const handleDropItemOnCharacter = (e: React.DragEvent) => {
    const itemWidget = e.dataTransfer.getData('itemWidget') as string;
    const itemArr = JSON.parse(itemWidget);
    if (itemArr[0] !== 1) {
      handleDropItemChar(itemArr[0], itemArr[1]);
    }
  };

  const handleDropItemOnLocation = (e: React.DragEvent) => {
    const itemWidget = e.dataTransfer.getData('itemWidget') as string;
    const itemArr = JSON.parse(itemWidget);
    const inventoryItem = fetchedInventory[itemArr[1]];
    //  removes item bonus from state when item is dropped
    if (inventoryItem.consumable === false && inventoryItem._id !== 1) {
      if (inventoryItem.modified_stat0 === 'strength') {
        setBonusStrength(bonusStrength - inventoryItem.modifier0);
      }
      if (inventoryItem.modified_stat1 === 'strength') {
        setBonusStrength(bonusStrength - inventoryItem.modifier1);
      }
      if (inventoryItem.modified_stat0 === 'endurance') {
        setBonusEndurance(bonusEndurance - inventoryItem.modifier0);
      }
      if (inventoryItem.modified_stat1 === 'endurance') {
        setBonusEndurance(bonusEndurance - inventoryItem.modifier1);
      }
      if (inventoryItem.modified_stat0 === 'mood') {
        setBonusMood(bonusMood - inventoryItem.modifier0);
      }
      if (inventoryItem.modified_stat1 === 'mood') {
        setBonusMood(bonusMood - inventoryItem.modifier1);
      }
    }
    if (itemArr[0] !== 1) {
      handleDropItem(itemArr[0], itemArr[1]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };



  //  *********************************************************************************************************************************************************************************************


  const resolveChoice = (choice_id: number, choiceType: string, stat: number, penalty = '') => {
    console.log('choice ID: ', choice_id, 'choiceType: ', choiceType, 'stat: ', stat, 'penalty: ', penalty);
    setPenalty(penalty);
    setTempText('');
    setDamageToEnemy(0);
    setDamageToPlayer(0);
    //console.log('choice from click?', choice_id);
    // ATM evacuate will not fail...
    if (choiceType === 'evacuate') {
      handleLocationChange();
      return;
    }
    // look up choice_id from action Button click
    axios.get<ChoiceData>(`/choice/selected/${choice_id}`) //upon refactor, take all the functionality out of the axios request
      .then(choiceResponse => {
        setSelectedChoice(choiceResponse.data);
        // <-- computation for success check: -->
        const choiceOutcome = statCheck(stat); // <-- argument from action Button click
        // <-- choices valid for combat -->
        if (choiceType === 'engage' || choiceType === 'evade' && choiceOutcome === 'failure') {
          // <-- enemy Effect TRUE on choice to hit below IF block -->
          if (isEnemy(currentEnemy) && currentEnemy.health > 0) { // <-- Enemy exists, enemy !dead
            setShowEnemy(true);
            console.log('ENEMY STATE', currentEnemy);
            console.log('CURRENT CHAR', currentChar);
            const fightResult = fightEnemy(currentEnemy.strength, currentEnemy.health, stat, currentChar.health);
            console.log('FIGHT RESULT', fightResult);
            // <-- player loses, adjust player health below
            if (fightResult.player || fightResult.player === 0) {
              //console.log('Middle of IF check when player is damaged.');
              if (fightResult.player <= 0) {
                axios.post(`story/ending/${currentChar._id}`,
                  {
                    result: currentEnemy.defeat
                  })
                  .catch((err) => (console.error('Failed to add story on death: ', err)));
                setOutcome(choiceOutcome);
              }
              setDamageToPlayer(fightResult.damage);
              setCurrentChar((prevChar: any) => ({ ...prevChar, health: fightResult.player }));
              setTempText(`The ${currentEnemy.name} hit you with a ${currentEnemy.weapon1} for ${fightResult.damage} damage!`); // <-- check for ally??
              // return;
              // <-- enemy loses, adjust player health below
            } else if (fightResult?.enemy || fightResult.enemy === 0) {
              //console.log('Middle of IF check when player is damaged.');
              setDamageToEnemy(fightResult.damage);
              setCurrentEnemy((prevEnemy: any) => ({ ...prevEnemy, health: fightResult.enemy })); // could display enemy health: fightResult.enemy
              setTempText(`You hit the ${currentEnemy.name} for ${fightResult.damage} damage!`);
              return;
            }
          } else if (isEnemy(currentEnemy) && currentEnemy.health <= 0) { // <-- enemy exists, enemy dead
            setOutcome(currentEnemy.victory); // <-- ADD PLAYER KILL ENEMY TO STORY
            setShowEnemy(false);
            // <-- give the player something...
            setCurrentChar(prevChar => ({ ...prevChar, score: prevChar.score += currentEnemy.score }));
            setTempText(`You defeated the enemy and got ${currentEnemy.score} points!`); // <-- put effects on canvas??
            // choiceOutcome = 'success';
            setCurrentEnemy({});
          } else { // <-- no Enemy on Event/State (enemy !exist)
            // setOutcome('You explored part of the city, but found no signs of life.');
            // <-- succeed Engage roll mechanics here (no enemy)
            return;
          }
        } else { // <-- evacuate || wildcard || evade && success
          // specify difficulty on enemy (add to schema) to create dynamic weight for success/fail calculation
          // arbitrate item/ally acquisition with percentage || algorithm

          if (choiceOutcome === 'success' && choiceType === 'wildcard' || choiceType === 'evade') { // --> player gets item || ally
            if (Object.entries(currentAlly).length) {
              setShowAlly(true);
              setTempText(currentAlly.greeting); // add to schema
              //console.log(currentAlly);
            }
          }
          // <-- evacuate WORKS already...
          setOutcome(choiceOutcome); // <-- success or fail to story
        }
        // <-- HOPEFULLY NO CONDITIONS TO CALL setOutcome(choiceOutcome);
      })
      .catch(err => {
        console.error('Failed setting selectedChoice State', err);
      });
  };

  const throttle = (cb, delay = 1000) => {
    let shouldWait = false;

    return (...args) => {
      if (shouldWait) { return; }

      cb(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    };
  };

  // callback for PlayerDied event listener
  // const appendToKillFeed = throttle((death: string) => {
  //   setKillFeed(prevKillFeed => {
  //     if (!prevKillFeed.includes(death)) {
  //       return [...prevKillFeed, death];
  //     }
  //     return prevKillFeed;
  //   });
  //   setTimeout(expireKillFeed, 10000);
  // });
  // callback for PlayerDied event listener
  const appendToKillFeed = (death) => {
    setKillFeed(prevKillFeed => [...prevKillFeed, death]);
    setTimeout(expireKillFeed, 10000);

  };

  const handlePlayerDied = () => { // **
    socket?.emit('player_died', currentChar.name, location.name, currentEnemy.weapon1);
  };

  const expireKillFeed = () => {
    setKillFeed(prevKillFeed => prevKillFeed.slice(1));
  };

  const StatusBars = () => {
    const health: number = currentChar.health * 10;
    const mood: number = (currentChar.mood + bonusMood) * 10;
    const healthOverlayValue = `${health / 10} / 10`;
    const moodOverlayValue = `${mood / 10} / 10`;

    return (
      <div onClick={props.handleSpeak}>
        <div>Health</div>
        <ProgressBarContainer>
          <OverlayValue>{healthOverlayValue}</OverlayValue>
          <ProgressBar variant={health < 30 ? 'danger' : 'success'} now={health} style={{ backgroundColor: 'grey' }} />
        </ProgressBarContainer>
        <div>Mood</div>
        <ProgressBarContainer>
          <OverlayValue>{moodOverlayValue}</OverlayValue>
          <ProgressBar variant={mood < 30 ? 'danger' : 'success'} now={mood} style={{ backgroundColor: 'grey' }} />
        </ProgressBarContainer>
      </div>
    );
  };


  // Investigate modal functions
  // ************************************************************************************************************************************************************************************

  // functions for investigate modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // write graffiti button function, shows input field and tag it button
  // const handleTextBoxClick = () => {
  //   setShowTextBox(true);
  //   setShowButton(true);
  // };

  // closes input field
  const handleTextBoxClose = () => {
    setShowTextBox(false);
  };
  // for tag it button
  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // search dropped item based on current location, update location database
  const retrieveDropItem = () => {
    if (location.drop_item_slot === 1) {
      setModalText('You search for items, but didn\'t find anything');
    } else {
      axios.get(`item/${location.drop_item_slot}`)
        .then((response: any) => {
          const itemName = response.data.name;
          const imageUrl = response.data.image_url;
          const imageTag = `<img src='${imageUrl}' alt='${itemName}' style='max-width: 40%; max-height: 40%'/>`;
          setModalText(
            <div style={{textAlign: 'center'}}>
              You searched for items and found {itemName}.
              <div dangerouslySetInnerHTML={{ __html: imageTag }} />
            </div>);
        })
        .catch((err) => {
          console.error('Failed to get item id from item table', err);
        });
      setCurrentChar(prevChar => ({
        ...prevChar,
        inventory: addItem(currentChar.inventory, location.drop_item_slot)
      }));
      setLocation(prevLocale => ({
        ...prevLocale,
        drop_item_slot: 1
      }));
    }
  };


  const updateGraffitiMsg = () => {
    const random: number = Math.floor(Math.random() * 3) + 1;
    console.log('heeeerrrrre', random);
    if (random === 1) {
      setLocation(location => ({
        ...location,
        graffiti_msg1: inputValue
      }));
    } else if (random === 2) {
      setLocation(location => ({
        ...location,
        graffiti_msg2: inputValue
      }));
    } else {
      setLocation(location => ({
        ...location,
        graffiti_msg2: inputValue
      }));
    }
    setInputValue('');
    setVisited(prevVisited => prevVisited.map(item => {
      if (item.name === location.name) {
        return location;
      }
      return item;
    }));
  };

  // *********************************************************************************************************************************************************************************************


  useEffect(() => {
    if (socket) {
      socket.on('kill_feed', (death) => appendToKillFeed(death));
      return () => {
        socket.off('kill_feed', appendToKillFeed);
      };
    }
  }, [socket]);



  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    getAllLocations();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    itemBonuses();
  }, [fetchedInventory]);

  useEffect(() => {
    if (hasMounted) {
      axios.post(`story/ending/${currentChar._id}`,
        {
          result: selectedChoice[outcome]
        })
        .then(() => {
          if (penalty !== '') {
            // console.log('penalty: ', penalty);
            if (outcome === 'failure') {
              setCurrentChar(previousStats => ({
                ...previousStats,
                [penalty]: previousStats[penalty] - 2
              }));
            } else if (outcome === 'success') {
              setCurrentChar(previousStats => ({
                ...previousStats,
                [penalty]: previousStats[penalty] + 1 // this may need to be adjusted to avoid infinite scaling...
              }));
            }
          }
        })
        .catch(err => console.error('axios AMEND to STORY', err));
    } else {
      setHasMounted(true);
    }
  }, [outcome]);



  // // <-- useEffect to catch socket emits for killFeed
  // useEffect(() => {
  //   // <-- if socket connection exists...
  //   if (socket) {
  //     // <-- binds playerDied event listener to socket instance
  //     // <-- and executes callback function defined outside useEffect
  //     socket.on('playerDied', handlePlayerDied);
  //     // <-- cleanup function to remove the event listener
  //     return () => {
  //       socket.off('playerDied', handlePlayerDied);
  //     };
  //   }
  // }, [socket]);


  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || (currentChar.mood + bonusMood) < 1) {
    console.log('selectedChoice: ', selectedChoice);
    // throttle(handlePlayerDied, 30000);
    handlePlayerDied();
    return <Result handleSpeak={function (e: any): void {
      throw new Error('Function not implemented.');
    }} />;
  }
  // console.log('YOUR SCORE', currentChar.score);
  // Any hooks between above conditional and below return will crash the page.
  return (

    <Container>
      <Nav isActive={true} />
      <Main>
        <h2 onClick={props.handleSpeak}>{location.name}</h2>
        <div>
          {
            showAlly
              ? <AllyImg src={currentAlly.image_url} />
              : <></>
          }
          {
            showEnemy
              ? <EnemyImg src={currentEnemy.image_url} />
              : <></>
          }
          <EventText show={showEvent}>
            <ScrollableContainer>
              {
                Object.entries(event).length
                  ? <p onClick={props.handleSpeak}>{event.initial_text}</p>
                  : <></>
              }
              {
                Object.entries(selectedChoice).length
                  ? <p onClick={props.handleSpeak} style={{ margin: '1rem' }}>{selectedChoice.flavor_text}</p>
                  : <>
                    <p onClick={props.handleSpeak} style={{ margin: '1rem' }}>What do you do?</p>
                    <p onClick={props.handleSpeak} style={{ margin: '1rem' }}>Select an option below...</p>
                  </>
              }
              {
                outcome.length
                  ? <p onClick={props.handleSpeak} style={{ margin: '1rem' }}>{outcome}</p>
                  : <></>
              }
              {
                tempText.length
                  ? <p onClick={props.handleSpeak} style={{ margin: '1rem' }}>{tempText}</p>
                  : <></>
              }
            </ScrollableContainer>
          </EventText>
          <Page className="page" onDrop={handleDropItemOnLocation} onDragOver={handleDragOver}>
            <KillFeedContainer>
              R.I.P
              <KillFeed>
                {
                  killFeed.length
                    ? killFeed.map((death, i) => <p key={i} onClick={handlePlayerDied}>{death}</p>)
                    : <p onClick={handlePlayerDied}>test</p>
                }
              </KillFeed>
            </KillFeedContainer>
            <img src={location.image_url}
              style={{
                position: 'relative',
                bottom: '98%'
              }}
            ></img>
          </Page>
          {
            damageToEnemy > 0
              ? <motion.div
                animate={{
                  scale: [1, 1, 2, 3, 2, 1, 0],
                  rotate: [30, 0, -30, 0, 30, 0, -30],
                  y: -250,
                  x: 80
                }}
                style={{ color: 'green', zIndex: 10 }}
                transition={{ ease: 'easeInOut', duration: 1.8 }}
                exit={{ opacity: 0, scale: 0 }}
              >{damageToEnemy}
              </motion.div>
              : <></>
          }
          {
            damageToPlayer > 0
              ? <motion.div
                animate={{
                  scale: [1, 1, 2, 3, 2, 1, 0],
                  rotate: [-30, 0, 30, 0, -30, 0, 30],
                  y: -250,
                  x: -80
                }}
                style={{ color: 'red', zIndex: 10 }}
                transition={{ ease: 'easeInOut', duration: 1.8 }}
                exit={{ opacity: 0, scale: 0 }}
              >{damageToPlayer}
              </motion.div>
              : <></>
          }
        </div>
      </Main>
      <Footer>
        <Content1>
          <Link to="/result" style={{ textDecoration: 'none' }}>
            <Content1>
              <HudButton onClick={() => complete.play()}>Continue</HudButton>
            </Content1>
          </Link>
          <Link to="/game-view" style={{ textDecoration: 'none' }}>
            <Content1>
              <HudButton onClick={handleLocationChange}>New Location</HudButton>
              <StyledModal centered show={showLocationModal} onHide={handleCloseLocationModal} backdrop='static' >
                <Modal.Header style={{ alignItems: 'flex-start' }} closeButton>
                  <Modal.Title onClick={props.handleSpeak}>You have visited all locations, where do you want to go now? </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                  <ModalBodyContainer>
                    {/* <p onClick={props.handleSpeak}>{localStorage.getItem('0')}</p> */}
                    <HudButton style={{ fontSize: '1.3rem' }} onClick={() => { getAllLocations(0); handleCloseLocationModal(); }}>{localStorage.getItem('0')} </HudButton>
                    {/* <p onClick={props.handleSpeak}>{localStorage.getItem('1')}</p> */}
                    <HudButton style={{ fontSize: '1.3rem' }} onClick={() => { getAllLocations(1); handleCloseLocationModal(); }}>{localStorage.getItem('1')} </HudButton>
                    {/* <p onClick={props.handleSpeak}>{localStorage.getItem('2')}</p> */}
                    <HudButton style={{ fontSize: '1.3rem' }} onClick={() => { getAllLocations(2); handleCloseLocationModal(); }}>{localStorage.getItem('2')} </HudButton>
                    {/* <p onClick={props.handleSpeak}>{localStorage.getItem('3')}</p> */}
                    <HudButton style={{ fontSize: '1.3rem' }} onClick={() => { getAllLocations(3); handleCloseLocationModal(); }}>{localStorage.getItem('3')} </HudButton>
                  </ModalBodyContainer>
                </Modal.Body>
              </StyledModal>
            </Content1>
          </Link>
          <Content1>
            <HudButton onClick={() => { handleClickButt(); handleShow(); }} disabled={investigateDisabled}>Investigate</HudButton>

            <StyledModal
              centered
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton onClick={() => { handleTextBoxClose(); handleClose(); setModalText(''); }}>
                <Modal.Title>You investigated the area.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ModalBodyContainer>
                  {/* <div onClick={props.handleSpeak}>Look for items</div> */}
                  <HudButton onClick={() => { retrieveDropItem(); }}>Search for items</HudButton>
                  {/* <div onClick={props.handleSpeak}>Look for graffiti</div> */}
                  <HudButton onClick={() => setModalText(`You looked around and found a messages in graffiti that said: "${location.graffiti_msg1}", "${location.graffiti_msg2}", and "${location.graffiti_msg3}"`)}>Look for graffiti</HudButton>
                  <div style={{ display: 'flex' }}>
                    <input type="text" maxLength={23} style={{ flex: 1 }} placeholder='Write graffiti' value={inputValue} onChange={handleInputValueChange} />
                    <HudButton style={{ flex: 1 }} onClick={() => { updateGraffitiMsg(); }}>Tag</HudButton>
                  </div>
                </ModalBodyContainer>
              </Modal.Body>
              <Modal.Footer>
                <p onClick={props.handleSpeak}>{modalText}</p>
              </Modal.Footer>
            </StyledModal>

          </Content1>
        </Content1>
        <CharStatusContainer>
          <StatContainer>
            <h4 onClick={props.handleSpeak}>{currentChar.name}</h4>
            <div className='page' onDrop={handleDropItemOnCharacter} onDragOver={handleDragOver}>
              <CharImageStyles src={currentChar.image_url} />
            </div>
          </StatContainer>
          <StatContainer2>
            <h4 onClick={props.handleSpeak}> {'Score: ' + currentChar.score}</h4>
            <div style={{ width: '20em' }}>{StatusBars()}</div>
            <div onClick={props.handleSpeak}>
              <StatIconContainer><TinyStatIconImg src={ images.healthIcon } />{currentChar.health}</StatIconContainer>
              <StatIconContainer><TinyStatIconImg src={ images.moodIcon } />{currentChar.mood}<StatBonusColor>{` +${bonusMood}`}</StatBonusColor><TempStatBonusColor>{temporaryMood !== 0 ? ` +${temporaryMood}` : ''}</TempStatBonusColor></StatIconContainer>
              <StatIconContainer><TinyStatIconImg src={ images.strengthIcon } />{currentChar.strength}<StatBonusColor>{` +${bonusStrength}`}</StatBonusColor><TempStatBonusColor>{temporaryStrength !== 0 ? ` +${temporaryStrength}` : ''}</TempStatBonusColor></StatIconContainer>
              <StatIconContainer><TinyStatIconImg src={ images.enduranceIcon } />{currentChar.endurance}<StatBonusColor>{` +${bonusEndurance}`}</StatBonusColor>{temporaryEndurance !== 0 ? ` +${temporaryEndurance}` : ''}<TempStatBonusColor></TempStatBonusColor></StatIconContainer>
            </div>
          </StatContainer2>
          <InventoryBorder>
            <h4>Inventory</h4>
            {hoveredItem && (
              <InventoryTextBubble>
                {hoveredItem.modifier0 && (
                  <><h5>{hoveredItem.consumable === true ? 'Consumable' : ''}</h5>
                    <h5> {hoveredItem.modifier0} + {hoveredItem.modified_stat0}</h5>
                    <br />
                  </>
                )}
                {hoveredItem.modifier1 && (
                  <>
                    <h5> {hoveredItem.modifier1} + {hoveredItem.modified_stat1} </h5>
                    <br />
                  </>
                )}
              </ InventoryTextBubble>
            )}
            <InventoryStyle className='itemWidgets'>
              {fetchedInventory.map((item: Item, i) => (
                <div
                  key={i}
                  className="itemWidget"
                  draggable
                  onDragStart={(e) => handleOnDragItem(e, item._id, i)}
                  onMouseEnter={() => handleOnMouseEnter(item)}
                  onMouseLeave={() => handleOnMouseLeave()}
                >
                  <IconContainer>
                    {item.name}
                    <IconImg src={item.image_url} />
                  </IconContainer>
                </div>
              ))}
            </InventoryStyle>
          </InventoryBorder>
        </CharStatusContainer>
        <Content2>
          <div>
            {tooltip && (
              <InventoryTextBubble>
                <h5>{tooltip}</h5>
              </ InventoryTextBubble>
            )}

            <h5>Engage</h5>
            <ArcadeButton
              onMouseEnter={() => handleToolTip('engage')}
              onMouseLeave={() => handleToolTipOff()}
              onClick={() => {
                hit.play();
                // <-- handleEnemy func ??
                resolveChoice(choices.engage, 'engage', currentChar.strength + bonusStrength + temporaryStrength);
                setTemporaryMood(0);
                setTemporaryEndurance(0);
                setTemporaryStrength(0);
              }} /></div>
          <div><h5>Evade</h5>
            <ArcadeButton
              onMouseEnter={() => handleToolTip('evade')}
              onMouseLeave={() => handleToolTipOff()}
              onClick={() => {
                dodge.play();
                resolveChoice(choices.evade, 'evade', currentChar.endurance + bonusEndurance + temporaryEndurance);
                setTemporaryMood(0);
                setTemporaryEndurance(0);
                setTemporaryStrength(0);
              }} /></div>
          <div><h5>Toggle Event</h5><ArcadeButton onClick={handleToggleEvent} /></div>
          <div><h5>Evacuate</h5>
            <ArcadeButton
              onMouseEnter={() => handleToolTip('evacuate')}
              onMouseLeave={() => handleToolTipOff()}
              onClick={() => {
                evacuate.play();
                resolveChoice(choices.evacuate, 'evacuate', 0);
                setTemporaryMood(0);
                setTemporaryEndurance(0);
                setTemporaryStrength(0);
              }} /></div>
          <div><h5>Wildcard</h5>
            <ArcadeButton
              onMouseEnter={() => handleToolTip('wildcard')}
              onMouseLeave={() => handleToolTipOff()}
              onClick={() => {
                wildCard.play();
                resolveChoice(choices.wildcard, 'wildcard', currentChar.mood + bonusMood + temporaryMood, 'mood');
                setTemporaryMood(0);
                setTemporaryStrength(0);
                setTemporaryStrength(0);
              }} /></div>
        </Content2>

      </Footer >
    </Container >
  );
};

export default GameView;

