import axios from 'axios';
import Nav from '../nav/NavBar';
import React, { useEffect, useState, useContext } from 'react';

import {
  Container, Main, Content1,
  Content2, Content3, Footer, HudButton,
  EventText, StatContainer } from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import { statCheck } from '../../utility/gameUtils';

interface LocationData {
  data: object;
  image_url: string;
  name: string;
};

interface EventData {
  _id: number;
  initial_text: string;
  choice0: number;
  choice1: number;
  choice2: number;
  choice3: number;
};

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
};

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

  const fetchLocation = () => {
    axios.get<LocationData>('/location/random')
      .then((location) => {
        console.log('Location from DB', location);
        setLocation(location.data);
        fetchEvent();
      })
      .catch(err => console.log('Axios fail useEffect Location grab', err));
  };

  const resolveChoice = (index: number, stat: number, penalty = '') => {
    axios.get<ChoiceData>(`/choice/selected/${index}`)
      .then(choiceResponse => {
        setSelectedChoice(choiceResponse.data);
        // <-- computation for success check: -->
        let choiceOutcome = statCheck(stat);
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
      })
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  console.log('CURRENT CHAR', currentChar);
  console.log('OUTCOME OUTSIDE FUNCTION', outcome);
  return (
    <Container>
      <Nav isActive={true} />
      <Main>
        <h2>{location.name}</h2>
        <div>
          <EventText>
            {
              Object.entries(event).length
                ? <p>{event.initial_text}</p>
                : <></>
            }
            {
              Object.entries(selectedChoice).length
                ? <p style={{margin: '1rem'}}>{selectedChoice.flavor_text}</p>
                : <>
                    <p style={{ margin: '1rem' }}>What do you do?</p>
                    <p style={{ margin: '1rem' }}>Select an option below...</p>
                  </>
            }
            {
              outcome.length
                ? <p style={{margin: '1rem'}}>{selectedChoice[outcome]}</p>
                : <></>
            }
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
          <Content1>
          <HudButton>Investigate</HudButton>
          </Content1>
          <Content1>
          <HudButton>Inventory</HudButton>
          </Content1>
        </Content1>
        <Content2>
          <div>
            <img src={currentChar.image_url} />
          </div>
          <StatContainer>
          <div>Character Stats</div>
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
  )
};

export default GameView;
