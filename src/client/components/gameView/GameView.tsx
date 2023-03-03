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
  EventText, StatContainer, ScrollableContainer
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext, EventData, ChoiceData, Enemy } from '../../App';

import { statCheck, fightEnemy } from '../../utility/gameUtils';
import { complete, hit, dodge, evacuate, wildCard } from '../../utility/sounds';


const GameView: React.FC = () => {

  const {
    prevEventId, setPrevEventId, visited, setVisited, allLocations, setAllLocations,
    location, setLocation, currentChar, setCurrentChar, event, setEvent, selectedChoice,
    setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled,
    setInvestigateDisabled
  } = useContext(UserContext);

  // state for investigate modal
  const [modalText, setModalText] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [show, setShow] = useState(false);
  const [modalText2, setModalText2] = useState('');
  const [bool, setBool] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [currentEnemy, setCurrentEnemy] = useState({} as Enemy);

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
      })
      .catch(err => {
        console.error('RANDOM EVENT FETCH FAILED', err);
      });
  };

  const handleClickButt = () => {
    setInvestigateDisabled(true);
    console.log('button pressed');
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

  const resolveChoice = (choice_id: number, choiceType: string, stat: number, penalty = '') => {
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
        let choiceOutcome = statCheck(stat); // <-- argument from action Button click
        // <-- choices valid for combat -->
        if (choiceType === 'engage' || choiceType === 'evade' && choiceOutcome === 'failure') {
          // <-- enemy Effect TRUE on choice to hit below IF block -->
          if (choiceResponse.data.enemy_effect) {
            if (!Object.entries(currentEnemy).length) {
              // if true: Math.random to query enemy database w/ _id <-- NEEDS TO BE # OF ENEMIES IN DB
              axios.get(`/enemy/${Math.floor(Math.random() * 2) + 1}`)
                .then(async (enemy: any) => {
                  await setCurrentEnemy(enemy.data);
                  // <-- enemy Fetched, Awaiting update to state -->
                  // <-- prepare user for fight... -->
                  // either separate enemy fetch/choice fetch
                  // from user action button click...
                  // or...
                  // refactor enemy_effect onto Event from Choice
                  console.log('Enemy fetched, sending to state...');
                  return;
                })
                .catch(err => console.error('FETCH ENEMY ERROR', err));
            }
            console.log('ENEMY STATE', currentEnemy);
            const fightResult = fightEnemy(currentEnemy.strength, currentEnemy.health, currentChar.strength, currentChar.health);
            if (fightResult?.player) {
              setCurrentChar((prevChar: any) => ({
                ...prevChar,
                health: fightResult.player
              }));
              choiceOutcome = 'failure';
            } else if (fightResult?.enemy) {
              setCurrentEnemy((prevEnemy: any) => ({
                ...prevEnemy,
                health: fightResult.enemy
              }));
              choiceOutcome = 'success';
            }
          } else { // no Enemy on Choice
            setOutcome('success');
            return;
          }
        } else {
          setOutcome(choiceOutcome);
        }
        axios.post(`story/ending/${currentChar._id}`,
          {
            result: choiceResponse.data[choiceOutcome]
          })
          .then(() => {
            console.log('penalty: ', penalty);
            if (choiceOutcome === 'failure' && penalty !== 'health') {
              setCurrentChar(previousStats => ({
                ...previousStats,
                [penalty]: previousStats[penalty] - 2
              }));
            } else if (choiceOutcome === 'success' && penalty !== 'health') {
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


  useEffect(() => {
    console.log('this is the use effect');
    getAllLocations();
  }, []);





  const StatusBars = () => {
    const health: number = currentChar.health * 10;
    const mood: number = currentChar.mood * 10;

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
  };
  const handleTextBoxClose = () => {
    setShowTextBox(false);
  };

  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || currentChar.mood < 1) {
    return <Result />;
  }
  // Any hooks between above conditional and below return will crash the page.
  return (

    <Container>
      <Nav isActive={true} />
      <Main>
        <h2>{location.name}</h2>
        <div>
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
                {modalText}
              </Modal.Body>
              <Modal.Footer>
                <Button>Choice 1</Button>
                <Button onClick={() => setModalText(`You looked around and found a message in graffiti that said: "${location.graffiti_msg}"`)}>Choice 2</Button>
                <Button onClick={handleTextBoxClick}>Choice 3</Button>
                {showTextBox && <input type="text" />}
              </Modal.Footer>
            </Modal>

          </Content1>
        </Content1>
        <Content2>
          <div>
            <h4>{currentChar.name}</h4>
            <img src={currentChar.image_url} />
          </div>
          <StatContainer>
            <div style={{ textDecoration: 'underline' }}>Status</div>
            <div>{StatusBars()}</div>
          </StatContainer>
        </Content2>
        <Content3>
          <HudButton onClick={() => {
            hit.play();
            // <-- handleEnemy func ??
            resolveChoice(choices.engage, 'engage', currentChar.strength, 'health');
          }}>Engage</HudButton>
          <HudButton onClick={() => {
            dodge.play();
            resolveChoice(choices.evade, 'evade', currentChar.endurance);
          }}>Evade</HudButton>
          <HudButton onClick={() => {
            evacuate.play();
            resolveChoice(choices.evacuate, 'evacuate', 0);
          }}>Evacuate</HudButton>
          <HudButton onClick={() => {
            wildCard.play();
            resolveChoice(choices.wildcard, 'wildcard', currentChar.mood, 'mood');
          }}>Wildcard</HudButton>
        </Content3>
      </Footer >
    </Container >
  );
};

export default GameView;
