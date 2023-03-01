import axios from 'axios';
import Nav from '../nav/NavBar';
import Result from '../result/Result';

import React, { useEffect, useContext } from 'react';

import {
  Container, Main, Content1,
  Content2, Content3, Footer, HudButton,
  EventText, StatContainer, ScrollableContainer
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext, EventData, ChoiceData } from '../../App';

import { statCheck } from '../../utility/gameUtils';
import { complete, hit, dodge, evacuate, wildCard } from '../../utility/sounds';

const GameView: React.FC = () => {

  const { visited, setVisited, allLocations, setAllLocations, location, setLocation, currentChar, setCurrentChar, event, setEvent, selectedChoice, setSelectedChoice, choices, setChoices, outcome, setOutcome, investigateDisabled, setInvestigateDisabled } = useContext(UserContext);


  const fetchEvent = () => {
    axios.get<EventData>('/event/random')
      .then(event => {
        console.log('EVENT', event);
        setEvent(event.data);
        setChoices({
          engage: event.data.choice0,
          evade: event.data.choice1,
          evacuate: event.data.choice2,
          wildcard: event.data.choice3
        });
      })
      .catch(err => {
        console.log('RANDOM EVENT FETCH FAILED', err);
      });
  };





  const handleClickButt = () => {
    setInvestigateDisabled(true);
    console.log('button pressed');
  };


  //separate func for update char location via axios request to character/location endpoint

  // const fetchLocation = () => {
  //   axios.get<LocationData>('/location/random')
  //     .then((location) => {
  //       console.log('Location from DB', location);
  //       setLocation(location.data);
  //       fetchEvent();
  //       //update character location axios to server
  //     })
  //     .catch(err => console.log('Axios fail useEffect Location grab', err));
  // };

  // const updateLocationDB = () => {

  // };

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
            console.log('penalty: ', penalty);
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
  // call state setter func set investigate ability
  // watches when current location changes, boolean changes
  // new use effect based on new location
  // useEffect(() => {
  //   console.log('enable button function use effect');
  //   setInvestigateDisabled(false);
  // }, [location]);


  useEffect(() => {
    console.log('this is the use effect');
    getAllLocations();
  }, []);

  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || currentChar.mood < 1) {
    return <div><Result /></div>;
  }
  // console.log('LOCATIONS', allLocations);
  // console.log('LOCATION', location);
  // console.log('visited array', visited);
  // console.log('CURRENT CHAR', currentChar);
  // console.log('OUTCOME OUTSIDE FUNCTION', outcome);
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
              <HudButton onClick={handleLocationChange}>New Location</HudButton> {/**previously Investigate*/}
            </Content1>
          </Link>
          <Content1>
            <HudButton onClick={() => { handleClickButt(); fetchEvent(); }} disabled={investigateDisabled}>Investigate</HudButton>
          </Content1>
        </Content1>
        <Content2>
          <div>
            <h4>{currentChar.name}</h4>
            <img src={currentChar.image_url} />
          </div>
          <StatContainer>
            <div style={{ textDecoration: 'underline' }}>Status</div>
            <div>Health: {currentChar.health}</div>
            <div>Strength: {currentChar.strength}</div>
            <div>Endurance: {currentChar.endurance}</div>
            <div>Mood: {currentChar.mood}</div>
          </StatContainer>
        </Content2>
        <Content3>
          <HudButton onClick={() => {
            hit.play();
            resolveChoice(choices.engage, currentChar.strength, 'health');
          }}>Engage</HudButton>
          <HudButton onClick={() => {
            dodge.play();
            resolveChoice(choices.evade, currentChar.endurance);
          }}>Evade</HudButton>
          <HudButton onClick={() => {
            evacuate.play();
            resolveChoice(choices.evacuate, 0);
          }}>Evacuate</HudButton>
          <HudButton onClick={() => {
            wildCard.play();
            resolveChoice(choices.wildcard, currentChar.mood, 'mood');
          }}>Wildcard</HudButton>
        </Content3>
      </Footer>
    </Container>
  );
};

export default GameView;

// const getAllLocations = () => {
//   axios.get('/location/allLocations')
//     .then(locations => {
//       setLocation(locations.data[0]);
//       setCurrentChar(prevStats => ({
//         ...prevStats,
//         location: locations.data[0]._id
//       }));
//       setVisited([locations.data[0]]);
//       //remove current location
//       setAllLocations(locations.data.slice(1));
//       fetchEvent();
//     })
//     .catch((err) => {
//       console.error('Failed to retrieve all locations: ', err);
//     });
// };
