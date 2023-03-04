import axios from 'axios';
import Nav from '../nav/NavBar';
import Result from '../result/Result';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import Investigate from './Investigate';
import React, { useEffect, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  Container, Main, Content1, CharStatusContainer,
  Content2, Footer, HudButton,
  EventText, StatContainer, ScrollableContainer,
  AllyImg, InventoryStyle, StatContainer2, CharImageStyles,
  IconContainer, IconImg, InventoryBorder, StatIconContainer,
  TinyStatIconImg, StatBonusColor, ModalContainer
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext, EventData, ChoiceData, Character, Item } from '../../App';

import { statCheck } from '../../utility/gameUtils';
import { complete, hit, dodge, evacuate, wildCard } from '../../utility/sounds';


const GameView: React.FC = () => {

  const { prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations, location, setLocation, currentChar, setCurrentChar, event, setEvent, selectedChoice, setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled, setInvestigateDisabled } = useContext(UserContext);


  const fetchEvent = () => {
    axios.get<EventData>('/event/random', { params: { excludeEventId: prevEventId } })
      .then(event => {
        console.log('EVENT', event);
        setEvent(event.data);
        setChoices({
          engage: event.data.choice0,
          evade: event.data.choice1,
          evacuate: event.data.choice2,
          wildcard: event.data.choice3
        });
        setPrevEventId(event.data._id);
      })
      .catch(err => {
        console.log('RANDOM EVENT FETCH FAILED', err);
      });
  };

  const handleClickButt = () => {
    setInvestigateDisabled(true);
  };

  //separate func for update char location via axios request to character/location endpoint

  // const fetchLocation = () => {
  //   axios.get<LocationData>(`/location/${location._id}`)
  //     .then((location) => {
  //       console.log('Location from DB', location);
  //       setLocation(location.data);
  //       fetchEvent();
  //       //update character location axios to server
  //     })
  //     .catch(err => console.log('Axios fail useEffect Location grab', err));
  // };

  // const updateLocationDB = () => {

  //

  const getAllLocations = () => {
    console.log('Current Event on State: ', event);
    axios.get('/location/allLocations')
      .then(locations => {
        console.log('current location: ', currentChar.location);
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
  const [showModal2, setShowModal2] = useState(false);
  const handleShowModal2 = () => setShowModal2(true);
  const [modalText2, setModalText2] = useState('');
  const [bool, setBool] = useState(false);
  const [fetchedInventory, setFetchedInventory] = useState<Item[]>([]);
  const [bonusStrength, setBonusStrength] = useState(0);
  const [bonusEndurance, setBonusEndurance] = useState(0);
  const [bonusMood, setBonusMood] = useState(0);
  const handleCloseModal2 = () => setShowModal2(false);
  const setModalLocation = (index: number) => {
    setLocation(visited[index]);
    setCurrentChar(prevStats => ({
      ...prevStats,
      location: setModalLocation
    }));


  };

  const handleLocationChange = () => {
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

    } else
      if (bool === false) {
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
  const resolveChoice = (index: number, stat: number, penalty = '') => {
    axios.get<ChoiceData>(`/choice/selected/${index}`)
      .then(choiceResponse => {
        setSelectedChoice(choiceResponse.data);
        // <-- computation for success check: -->
        const choiceOutcome = statCheck(stat);
        setOutcome(choiceOutcome);
        axios.post(`story/ending/${currentChar._id}`,
          {
            result: choiceResponse.data[choiceOutcome]
          })
          .then(() => {
            // console.log('penalty: ', penalty);
            if (choiceOutcome === 'failure') {
              setCurrentChar(previousStats => ({
                ...previousStats,
                [penalty]: previousStats[penalty] - 2
              }));
            } else if (choiceOutcome === 'success' && penalty === 'mood') {
              setCurrentChar(previousStats => ({
                ...previousStats,
                [penalty]: previousStats[penalty] + 1 // this may need to be adjusted to avoid infinite scaling...
              }));
            }
          });
      }) // <-- maybe another .then() to update the currentChar in DB with updated stats ?? -->
      .catch(err => {
        console.error('Failed setting selectedChoice State', err);
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
            .then(({ data }) => {
              // console.log('ITEM???', item.data);
              setFetchedInventory((prevInventory: Item[]) => [...prevInventory, data as Item].sort((a, b) => b._id - a._id));
              // Handles nonconsumable stat bonuses
              if (data.modified_stat0 === 'strength' && data.consumable === false) {
                setBonusStrength(bonusStrength + data.modifier0);
              }
              if (data.modified_stat1 === 'strength' && data.consumable === false) {
                setBonusStrength(bonusStrength + data.modifier1);
              }
              if (data.modified_stat0 === 'endurance' && data.consumable === false) {
                setBonusEndurance(bonusEndurance + data.modifier0);
              }
              if (data.modified_stat1 === 'endurance' && data.consumable === false) {
                setBonusEndurance(bonusEndurance + data.modifier1);
              }
              if (data.modified_stat0 === 'mood' && data.consumable === false) {
                setBonusMood(bonusMood + data.modifier0);
              }
              if (data.modified_stat1 === 'mood' && data.consumable === false) {
                setBonusMood(bonusMood + data.modifier1);
              }
            })
            // .then(() => console.log('fetchedInventory in Menu- fetchedItems After setFetchInventory', fetchedInventory))
            .catch(err => console.error('error fetching from ITEM router', err));
        });
      })
      .catch((err: any) =>
        console.error('Error in Menu.tsx in fetchItems', err));
  };

  useEffect(() => {
    fetchItems();
    getAllLocations();
    setBonusEndurance(bonusEndurance);
    setBonusStrength(bonusStrength);
    setBonusMood(bonusMood);
  }, []);





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

  // state & functions for investigate modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalText, setModalText] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // write graffiti button function, shows input field and tag it button
  const handleTextBoxClick = () => {
    setShowTextBox(true);
    setShowButton(true);
  };
  // exit button func for modal, closes input field
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


  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || (currentChar.mood + bonusMood) < 1) {
    return <Result />;
  }
  // Any hooks between above conditional and below return will crash the page.
  return (

    <Container>
      <Nav isActive={true} />
      <Main>
        <h2>{location.name}</h2>
        <div>
          <AllyImg src='https://res.cloudinary.com/de0mhjdfg/image/upload/v1677893849/gnawlinzAllies/ally1Pxl_h2bm1m.png' />
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
                outcome.length
                  ? <p style={{ margin: '1rem' }}>{selectedChoice[outcome]}</p>
                  : <></>
              }
            </ScrollableContainer>
          </EventText>
          <img src={location.image_url}></img>
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
              <HudButton onClick={handleLocationChange}>New Location</HudButton>
              <Modal centered show={showModal2} onHide={handleCloseModal2}>
                <Modal.Header closeButton>
                  <Modal.Title>Pick your next location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>You have visited all locations, </p>
                  <p>chose where to go next: </p>
                  <p>1: Go back to first location</p>
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
              centered
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
            <CharImageStyles src={currentChar.image_url} />
          </StatContainer>
          <StatContainer2>
            <div style={{ textDecoration: 'underline' }}>Status</div>
            <div style={{ width: '20em' }}>{StatusBars()}</div>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" />{currentChar.health}</StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195540/gnawlinzIcons/noun-mood-White771001_u6wmb5.png" />{currentChar.mood}<StatBonusColor>{` +${bonusMood}`}</StatBonusColor></StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677182371/gnawlinzIcons/arm3_jlktow.png" />{currentChar.strength}<StatBonusColor>{` +${bonusStrength}`}</StatBonusColor></StatIconContainer>
            <StatIconContainer><TinyStatIconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" />{currentChar.endurance}<StatBonusColor>{` +${bonusEndurance}`}</StatBonusColor></StatIconContainer>
          </StatContainer2>
          <InventoryBorder>
            <h4>Inventory</h4>
            <InventoryStyle>
              {
                fetchedInventory.map((item: Item, i) => {
                  return <div key={i}>
                    <IconContainer>{item.name}<IconImg onClick={() => handleDropItem(item._id)} src={item.image_url}></IconImg></IconContainer></div>;
                })
              }
            </InventoryStyle>
          </InventoryBorder>
        </CharStatusContainer>
        <Content2>
          <HudButton onClick={() => {
            hit.play();
            resolveChoice(choices.engage, currentChar.strength + bonusStrength, 'health');
          }}>Engage</HudButton>
          <HudButton onClick={() => {
            dodge.play();
            resolveChoice(choices.evade, currentChar.endurance + bonusEndurance, 'endurance');
          }}>Evade</HudButton>
          <HudButton onClick={() => {
            evacuate.play();
            resolveChoice(choices.evacuate, 0);
          }}>Evacuate</HudButton>
          <HudButton onClick={() => {
            wildCard.play();
            resolveChoice(choices.wildcard, currentChar.mood + bonusMood, 'mood');
          }}>Wildcard</HudButton>
        </Content2>
      </Footer >
    </Container >
  );
};

export default GameView;
