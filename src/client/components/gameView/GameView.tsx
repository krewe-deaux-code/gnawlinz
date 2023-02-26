import axios from 'axios';
import Nav from '../nav/NavBar';
import Result from '../result/Result';
import React, { useEffect, useState, useContext } from 'react';

import {
  Container, Main, Content1,
  Content2, Content3, Footer, HudButton,
  EventText, StatContainer, ScrollableContainer
} from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import { statCheck } from '../../utility/gameUtils';

interface LocationData {
  _id: number;
  name: string;
  image_url: string;
  random_item_spot1: string;
  random_item_spot2: string;
  drop_item_slot: number;
  graffiti: string;
  graffiti_msg: string;
}

interface EventData {
  _id: number;
  initial_text: string;
  choice0: number;
  choice1: number;
  choice2: number;
  choice3: number;
}

interface ChoiceData {
  _id: number;
  flavor_text: string;
  success: string;
  failure: string;
  alignment0: string;
  alignment1: string;
  alignment2: string;
  enemy_effect: number;
  ally_effect: number;
  item_effect: number;
}

const GameView: React.FC = () => {

  const { currentChar, setCurrentChar } = useContext(UserContext);

  const [outcome, setOutcome] = useState('');
  const [location, setLocation] = useState({} as LocationData);
  const [event, setEvent] = useState({} as EventData);
  const [selectedChoice, setSelectedChoice] = useState({} as ChoiceData);
  const [choices, setChoices] = useState({
    engage: 0,
    evade: 0,
    evacuate: 0,
    wildcard: 0
  });
  const [allLocations, setAllLocations] = useState<LocationData[]>([]);
  const [visited, setVisited] = useState<LocationData[]>([]);

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


  const getAllLocations = () => {
    axios.get('/location/allLocations')
      .then(locations => {
        setLocation(locations.data[0]);
        setVisited([locations.data[0]]);
        setAllLocations(locations.data.slice(1));
        fetchEvent();
      })
      .catch((err) => {
        console.error('Failed to retrieve all locations: ', err);
      });
  };

  const handleLocationChange = () => {
    if (allLocations.length) {
      setAllLocations(prevLocations => prevLocations.slice(1));
      setLocation(allLocations[0]);
      setVisited(prevVisited => [...prevVisited, allLocations[0]]);
    } else {
      const randomNum = Math.floor(Math.random() * (visited.length));
      setLocation(visited[randomNum]);
    }
    fetchEvent();
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

  useEffect(() => {
    getAllLocations();
  }, []);

  // conditional for character loss involving health or mood reaching 0
  if (currentChar.health < 1 || currentChar.mood < 1) {
    return <div><Result /></div>;
  }
  console.log('visited array', visited);
  console.log('CURRENT CHAR', currentChar);
  console.log('OUTCOME OUTSIDE FUNCTION', outcome);
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
              <HudButton>Continue</HudButton>
            </Content1>
          </Link>
          <Link to="/gameView" style={{ textDecoration: 'none' }}>
            <Content1>
              <HudButton onClick={handleLocationChange}>New Location</HudButton> {/**previously Investigate*/}
            </Content1>
          </Link>
          <Content1>
            <HudButton>Inventory</HudButton>
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
          <HudButton onClick={() => resolveChoice(choices.engage, currentChar.strength, 'health')}>Engage</HudButton>
          <HudButton onClick={() => resolveChoice(choices.evade, currentChar.endurance)}>Evade</HudButton>
          <HudButton onClick={() => resolveChoice(choices.evacuate, 0)}>Evacuate</HudButton>
          <HudButton onClick={() => resolveChoice(choices.wildcard, currentChar.mood, 'mood')}>Wildcard</HudButton>
        </Content3>
      </Footer>
    </Container>
  );
};

export default GameView;
