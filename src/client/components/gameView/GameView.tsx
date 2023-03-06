import axios from 'axios';
import Nav from '../nav/NavBar';
import Result from '../result/Result';
import ProgressBar from 'react-bootstrap/ProgressBar';

// import Investigate from './Investigate';
import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Container, Main, Content1,
  Content2, Content3, Footer, HudButton,
  EventText, StatContainer, ScrollableContainer,
  AllyImg, EnemyImg, CharImageStyles, CharStatusContainer,
  IconContainer, IconImg, InventoryBorder, InventoryStyle,
  StatBonusColor, StatContainer2, StatIconContainer,
  TinyStatIconImg, TempStatBonusColor
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext, EventData, ChoiceData, Enemy, Ally, Item, Character } from '../../App';

import { statCheck, fightEnemy, isEnemy } from '../../utility/gameUtils';
import { complete, hit, dodge, evacuate, wildCard } from '../../utility/sounds';


const GameView: React.FC = () => {

  const {
    prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations,
    location, setLocation, currentChar, setCurrentChar, event, setEvent, selectedChoice,
    setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled,
    setInvestigateDisabled, currentEnemy, setCurrentEnemy, currentAlly, setCurrentAlly,
    metAllyArr, setMetAllyArr
  } = useContext(UserContext);

  // state for investigate modal
  const [modalText, setModalText] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [show, setShow] = useState(false);
  const [modalText2, setModalText2] = useState('');
  const [bool, setBool] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [tempText, setTempText] = useState('');
  const [penalty, setPenalty] = useState('');
  const [showEnemy, setShowEnemy] = useState(false);
  const [showAlly, setShowAlly] = useState(false);

  const [fetchedInventory, setFetchedInventory] = useState<Item[]>([]);
  const [bonusStrength, setBonusStrength] = useState(0);
  const [bonusEndurance, setBonusEndurance] = useState(0);
  const [bonusMood, setBonusMood] = useState(0);

  const [temporaryStrength, setTemporaryStrength] = useState(0);
  const [temporaryEndurance, setTemporaryEndurance] = useState(0);
  const [temporaryMood, setTemporaryMood] = useState(0);

  const fetchEvent = () => {
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

  // NPC
  const handleEnemyFetch = () => {
    // Math.random to query enemy database w/ _id <-- NEEDS TO BE # OF ENEMIES IN DB
    axios.get<Enemy>(`/enemy/${Math.floor(Math.random() * 2) + 1}`)
      .then((enemy: any) => {
        setCurrentEnemy(enemy.data);
        console.log('Enemy fetched, sending to state...');
        // <-- put enemy.data.image_url somewhere into HUD to indicate enemy
      })
      .catch(err => console.error('FETCH ENEMY ERROR', err));
  };

  const handleAllyFetch = () => {
    // Math.random to query enemy database w/ _id <-- NEEDS TO BE # OF ALLIES IN DB
    axios.get<Ally>(`/ally/${Math.floor(Math.random() * 1) + 1}`)
      .then((ally: any) => {
        if (metAllyArr.includes(ally.data._id)) {
          setCurrentAlly({});
        } else {
          setMetAllyArr(prevMetAllyArr => [...prevMetAllyArr, ally.data._id]);
          setCurrentAlly(ally.data);
        }
        console.log('ally fetched, sending to state...');
        // <-- put ally.data.image_url somewhere into HUD to indicate enemy
      })
      .catch(err => console.error('FETCH ENEMY ERROR', err));
  };

  const getAllLocations = () => {
    // console.log('Current Event on State: ', event);
    axios.get('/location/allLocations')
      .then(locations => {
        // console.log('current location: ', currentChar.location);
        // setCurrentChar(prevStats => ({
        //   ...prevStats,
        //   location: locations.data[0]._id
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
  };

  // Add a modal to handle location change after all locations have been used
  const handleShowModal2 = () => setShowModal2(true);

  const handleCloseModal2 = () => setShowModal2(false);
  const setModalLocation = (index: number) => {
    setLocation(visited[index]);
    setCurrentChar(prevStats => ({
      ...prevStats,
      location: setModalLocation
    }));
  };

  const handleLocationChange = () => {
    setShowAlly(false);
    setShowEnemy(false);
    if (allLocations.length) {
      setSelectedChoice({} as ChoiceData);
      setOutcome('');
      setAllLocations(prevLocations => prevLocations.slice(1));
      setLocation(allLocations[0]);
      setCurrentChar(prevStats => ({
        ...prevStats,
        location: allLocations[0]._id
      }));
      setVisited(prevVisited => [...prevVisited, allLocations[0]]);
    } else if (bool === false) {
      setBool(true);
      setModalText2('true');
      handleShowModal2();
    } else {
      const randomNum = Math.floor(Math.random() * (visited.length));
      if (location !== visited[randomNum]) {
        setLocation(visited[randomNum]);
        setCurrentChar(prevStats => ({
          ...prevStats,
          location: visited[randomNum]._id
        }));
      } else {
        if (visited[randomNum + 1]) {
          setLocation(visited[randomNum + 1]);
          setCurrentChar(prevStats => ({
            ...prevStats,
            location: visited[randomNum + 1]._id
          }));
        } else {
          setLocation(visited[randomNum - 1]);
          setCurrentChar(prevStats => ({
            ...prevStats,
            location: visited[randomNum - 1]._id
          }));
        }
      }
    }
    fetchEvent();
    setInvestigateDisabled(false);
  };


  //  Item handling Functions drag and drop on location and character.
  //  *********************************************************************************************************************************************************************************************
  const handleDropItem = (itemID, i) => {
    axios.put(`/location/drop_item_slot/${currentChar.location}`, { drop_item_slot: itemID });
    axios.delete('/character/inventory/delete', {
      data: {
        charID: currentChar._id,
        itemID: itemID,
      }
    })
      .then(() => {
        fetchUndroppedItems();
        // console.log('currentstrength', bonusStrength);
        //console.log('inventory in handleDrop after fetchItems', fetchedInventory);
      })
      .catch(err => console.error('fetch after delete ERROR', err));
    // needs then and catches for both axios... call fetchItems?
  };

  const handleDropItemChar = (itemID, i) => {
    if (fetchedInventory[i].consumable === true) {
      axios.delete('/character/inventory/delete', {
        data: {
          charID: currentChar._id,
          itemID: itemID,
        }
      }
      )
    
        .then(() => {
          // console.log('Current inventory', fetchedInventory[i]);
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

            setCurrentChar((previousStats) => ({
              ...previousStats,
              health: previousStats.health + fetchedInventory[i].modifier0
            }))
              .then(() => {
                axios.patch<Character>(`/character/update/${currentChar._id}`, currentChar);
              });
          }
          if (fetchedInventory[i].modified_stat1 === 'health') {
            console.log('FetchedInventory hit the health pot');
            setCurrentChar((previousStats) => ({
              ...previousStats,
              health: previousStats.health + fetchedInventory[i].modifier1
            }))
              .then(() => {
                axios.patch<Character>(`/character/update/${currentChar._id}`, currentChar);
              });
          }
        })
        .then(() => {
          fetchUndroppedItems();
          console.log('currentstrength', bonusStrength);
        //console.log('inventory in handleDrop after fetchItems', fetchedInventory);
        })
        .catch(err => console.error('fetch after delete ERROR', err));
    // needs then and catches for both axios... call fetchItems?
    }
  };
  const fetchUndroppedItems = () => {
    axios.get<Character>(`/character/${currentChar._id}`)
      .then((character: any) => {
        setCurrentChar(character.data);
        setFetchedInventory([]);
        character.data.inventory.forEach(item => {
          axios.get(`/item/${item}`)
            .then(({  data  }) =>
          
              setFetchedInventory((prevInventory: Item[]) => [...prevInventory, data as Item].sort((a, b) => b._id - a._id))
   
            )
          // .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch(err => console.error('error fetching from ITEM router fetchedDroppedItem', err));
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchunDroppedItems', err));

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
            .then(({  data  }) => {
              // console.log('ITEM???', item.data);
              setFetchedInventory((prevInventory: Item[]) => [...prevInventory, data as Item].sort((a, b) => b._id - a._id));
              // Handles nonconsumable stat bonuses when item is fetched.
              if (data.consumable === false) {
                if (data.modified_stat0 === 'strength') {
                  setBonusStrength(bonusStrength + data.modifier0);
                }
                if (data.modified_stat1 === 'strength') {
                  setBonusStrength(bonusStrength + data.modifier1);
                }
                if (data.modified_stat0 === 'endurance') {
                  setBonusEndurance(bonusEndurance + data.modifier0);
                }
                if (data.modified_stat1 === 'endurance') {
                  setBonusEndurance(bonusEndurance + data.modifier1);
                }
                if (data.modified_stat0 === 'mood') {
                  setBonusMood(bonusMood + data.modifier0);
                }
                if (data.modified_stat1 === 'mood') {
                  setBonusMood(bonusMood + data.modifier1);
                }
              }
            })
            // .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch(err => console.error('error fetching from ITEM router', err));
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchItems', err));
  };

  const handleOnDragItem = (e: React.DragEvent, itemId: number, i: number) => {
    const itemIdIndex = [itemId, i];
    e.dataTransfer.setData('itemWidget', JSON.stringify(itemIdIndex));
  };

  const handleDropItemOnCharacter = (e: React.DragEvent) => {
    const itemWidget = e.dataTransfer.getData('itemWidget') as string;
    const itemArr = JSON.parse(itemWidget);
    handleDropItemChar(itemArr[0], itemArr[1]);
  };

  const handleDropItemOnLocation = (e: React.DragEvent) => {
    e.preventDefault();
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
      handleDropItem(itemArr[0], itemArr[1]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // const handleDropConsumable = (e: React.DragEvent) {
    
  // };


  //  *********************************************************************************************************************************************************************************************


  const resolveChoice = (choice_id: number, choiceType: string, stat: number, penalty = '') => {
    setPenalty(penalty);
    setTempText('');
    console.log('choice from click?', choice_id);
    // ATM evacuate will not fail...
    if (choiceType === 'evacuate') {
      handleLocationChange();
      return;
    }
    // look up choice_id from action Button click
    axios.get<ChoiceData>(`/choice/selected/${choice_id}`)
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
            const fightResult = fightEnemy(currentEnemy.strength, currentEnemy.health, currentChar.strength, currentChar.health);
            // <-- player loses, adjust player health below
            if (fightResult?.player || fightResult.player === 0) {
              setCurrentChar((prevChar: any) => ({ ...prevChar, health: fightResult.player }));
              setTempText(`The ${currentEnemy.name} hit you with a ${currentEnemy.weapon1} for ${fightResult.damage} damage!`); // <-- check for ally??
              if (currentChar.health <= 0) {
                setOutcome('failure'); // <-- ADD PLAYER DEATH TO STORY
              }
              return;
            } else if (fightResult?.enemy || fightResult.enemy === 0) {
              // <-- enemy loses, adjust player health below
              setCurrentEnemy((prevEnemy: any) => ({ ...prevEnemy, health: fightResult.enemy })); // could display enemy health: fightResult.enemy
              setTempText(`You hit the ${currentEnemy.name} for ${fightResult.damage} damage!`);
              return;
            }
          } else if (isEnemy(currentEnemy) && currentEnemy.health < 0) { // <-- enemy exists, enemy dead
            setShowEnemy(false);
            // <-- give the player something...
            setCurrentChar(prevChar => ({ ...prevChar, score: prevChar.score += currentEnemy.score }));
            setTempText('You defeated the enemy and got a reward!'); // <-- put effects on canvas??
            setOutcome('success'); // <-- ADD PLAYER KILL ENEMY TO STORY
            // choiceOutcome = 'success';
            setCurrentEnemy({});
          } else { // <-- no Enemy on Event/State (enemy !exist)
            setOutcome('success');
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
              console.log(currentAlly);
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


  const StatusBars = () => {
    const health: number = currentChar.health * 10;
    const mood: number = (currentChar.mood + bonusMood) * 10;

    return (
      <div>
        <div>Health<ProgressBar variant={health < 30 ? 'danger' : health < 70 ? 'warning' : 'success'} now={health} label={`${health}%`} style={{ backgroundColor: 'grey' }} /></div>
        <div>Mood<ProgressBar variant={mood < 30 ? 'danger' : mood < 70 ? 'warning' : 'success'} now={mood} label={`${mood}%`} style={{ backgroundColor: 'grey' }} /></div>
      </div>
    );
  };


  // functions for investigate modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTextBoxClick = () => {
    setShowTextBox(true);
    setShowButton(true);
  };
  // write graffiti button function, shows input field and tag it button
  const handleTextBoxClose = () => {
    setShowTextBox(false);
  };
  // for tag it button
  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  // search dropped item based on current location, update location database
  const retrieveDropItem = () => {
    const id = location._id;
    axios.get(`/location/${location._id}`)
      .then((location: any) => {
        if (location.data.drop_item_slot === 1) {
          setModalText('You search for items, but didn\'t find anything');
        } else {
          axios.get(`item/${location.data.drop_item_slot}`)
            .then((response: any) => {
              setModalText(`You searched for items and found ${response.data.name}`);
            })
            .catch((err) => {
              console.error('Failed to get item id from item table', err);
            })
            .then(() => {
              axios.patch(`/location/update/${id}`, {
                drop_item_slot: 1
              });
            })
            .catch((err) => {
              console.error('Failed to update the state of location', err);
            });
        }
      })
      .catch((err) => {
        console.error('Failed to get drop item from location', err);
      });

  };


  const updateGraffitiMsg = () => {
    axios.patch(`/location/update/${location._id}`, {
      graffiti_msg: inputValue
    })
      .then(() => {
        console.log('Graffiti message updated');
        setLocation(location => ({
          ...location,
          graffiti_msg: inputValue
        }));
        setInputValue('');
        setVisited(prevVisited => prevVisited.map(item => {
          if (item.name === location.name) {
            return location;
          }
          return item;
        }));
      })
      .catch((err) => {
        console.error('Failed to update graffiti message', err);
      });
  };
  useEffect(() => {
    setBonusEndurance(0);
    setBonusStrength(0);
    setBonusMood(0);
    console.log('this is the use effect');
    fetchItems();
    getAllLocations();
  }, []);

  useEffect(() => {
    if (hasMounted) {
      axios.post(`story/ending/${currentChar._id}`,
        {
          result: selectedChoice[outcome]
        })
        .then(() => {
          if (penalty !== '') {
            console.log('penalty: ', penalty);
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


  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || (currentChar.mood + bonusMood) < 1) {
    return <Result />;
  }
  console.log('YOUR SCORE', currentChar.score);
  // Any hooks between above conditional and below return will crash the page.
  return (

    <Container>
      <Nav isActive={true} />
      <Main>
        <h2>{location.name}</h2>
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
          <EventText>
            <ScrollableContainer>
              {
                Object.entries(event).length
                  ? <p>{event.initial_text}</p>
                  : <></>
              }
              {
                Object.entries(selectedChoice).length
                  ? <p style={{ margin: '1rem' }}>{selectedChoice.flavor_text}</p>
                  : <>
                    <p style={{ margin: '1rem' }}>What do you do?</p>
                    <p style={{ margin: '1rem' }}>Select an option below...</p>
                  </>
              }
              {
                tempText.length
                  ? <p style={{ margin: '1rem' }}>{tempText}</p>
                  : <></>
              }
              {
                outcome.length
                  ? <p style={{ margin: '1rem' }}>{selectedChoice[outcome]}</p>
                  : <></>
              }
            </ScrollableContainer>
          </EventText>
          <div className="page" onDrop={handleDropItemOnLocation} onDragOver={handleDragOver}>
            <img src={location.image_url}></img>
          </div>
        </div>
      </Main>
      <Footer>
        <Content1>
          <Link to="/result" style={{ textDecoration: 'none' }}>
            <Content1>
              <HudButton onClick={() => complete.play()}>Continue</HudButton>
            </Content1>
          </Link>
          <Link to="/gameView" style={{ textDecoration: 'none' }}>
            <Content1>
              <HudButton onClick={ () => { handleLocationChange(); setTemporaryMood(0); setTemporaryStrength(0); setTemporaryStrength(0); } }>New Location</HudButton>
              <Modal show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                  <Modal.Title>Pick your next location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>You have visited all locations, </p>
                  <p>chose where to go next: </p>
                  <p>1: Go back to the first location</p>
                  <p>2: Go back to second location</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => { setModalLocation(0); handleCloseModal2(); }}>
                    Choice 1
                  </Button>
                  <Button onClick={() => { setModalLocation(1); handleCloseModal2(); }}>
                    Choice 2
                  </Button>
                </Modal.Footer>
              </Modal>
            </Content1>
          </Link>
          <Content1>
            <HudButton onClick={() => { handleClickButt(); fetchEvent(); handleShow(); }} disabled={investigateDisabled}>Investigate</HudButton>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton onClick={() => { handleClose(); handleTextBoxClose(); setModalText(''); }}>
                <Modal.Title>You investigated the area.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Choose from the options below:f
                <p>1: Look for items</p>
                <p>2: Look for graffiti</p>
                <p>3: Write graffiti</p>
                <p>{modalText}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => { retrieveDropItem(); }}>Choice 1</Button>
                <Button onClick={() => setModalText(`You looked around and found a message in graffiti that said: "${location.graffiti_msg}"`)}>Choice 2</Button>
                <Button onClick={handleTextBoxClick}>Choice 3</Button>
                {showButton && (
                  <div>
                    <input type="text" value={inputValue} onChange={handleInputValueChange} />
                    <button onClick={updateGraffitiMsg}>Tag it</button>
                  </div>
                )}
              </Modal.Footer>
            </Modal>

          </Content1>
        </Content1>
        <CharStatusContainer>
          <StatContainer>
            <h4>{currentChar.name}</h4>
            <div className='page' onDrop={handleDropItemOnCharacter} onDragOver={handleDragOver}>
              <CharImageStyles src={currentChar.image_url} />
            </div>
          </StatContainer>
          <StatContainer2>
            <div style={{ textDecoration: 'underline' }}>Status</div>
            <div style={{ width: '20em' }}>{StatusBars()}</div>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" />{currentChar.health}</StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195540/gnawlinzIcons/noun-mood-White771001_u6wmb5.png" />{currentChar.mood}<StatBonusColor>{` +${bonusMood}`}</StatBonusColor><TempStatBonusColor>{temporaryMood !== 0 ? ` +${temporaryMood}` : ''}</TempStatBonusColor></StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677182371/gnawlinzIcons/arm3_jlktow.png" />{currentChar.strength}<StatBonusColor>{` +${bonusStrength}`}</StatBonusColor><TempStatBonusColor>{temporaryStrength !== 0 ? ` +${temporaryStrength}` : ''}</TempStatBonusColor></StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" />{currentChar.endurance}<StatBonusColor>{` +${bonusEndurance}`}</StatBonusColor>{temporaryEndurance !== 0 ? ` +${temporaryEndurance}` : ''}<TempStatBonusColor></TempStatBonusColor></StatIconContainer>
          </StatContainer2>
          <InventoryBorder>
            <h4>Inventory</h4>
            <InventoryStyle className='itemWidgets'>
              {
                fetchedInventory.map((item: Item, i) => {
                  return <div key={i}
                    className="itemWidget"
                    draggable
                    onDragStart={(e) => { if (item._id !== 1) { handleOnDragItem(e, item._id, i); } } }>
                    <IconContainer>{item.name}<IconImg src={item.image_url}></IconImg></IconContainer></div>;
                })
              }
            </InventoryStyle>
          </InventoryBorder>
        </CharStatusContainer>
        <Content2>
          <HudButton onClick={() => {
            hit.play();
            // <-- handleEnemy func ??
            resolveChoice(choices.engage, 'engage', currentChar.strength + bonusStrength + temporaryStrength);
            setTemporaryMood(0);
            setTemporaryEndurance(0);
            setTemporaryStrength(0);
          }}>Engage</HudButton>
          <HudButton onClick={() => {
            dodge.play();
            resolveChoice(choices.evade, 'evade', currentChar.endurance + bonusEndurance + temporaryEndurance);
            setTemporaryMood(0);
            setTemporaryEndurance(0);
            setTemporaryStrength(0);
          }}>Evade</HudButton>
          <HudButton onClick={() => {
            evacuate.play();
            resolveChoice(choices.evacuate, 'evacuate', 0);
            setTemporaryMood(0);
            setTemporaryEndurance(0);
            setTemporaryStrength(0);
          }}>Evacuate</HudButton>
          <HudButton onClick={() => {
            wildCard.play();
            resolveChoice(choices.wildcard, 'wildcard', currentChar.mood + bonusMood + temporaryMood, 'mood');
            setTemporaryMood(0);
            setTemporaryStrength(0);
            setTemporaryStrength(0);
          }}>Wildcard</HudButton>
        </Content2>
      </Footer >
    </Container >
  );
};

export default GameView;
