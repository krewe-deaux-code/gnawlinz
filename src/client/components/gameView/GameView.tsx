import axios from 'axios';
import Nav from '../nav/NavBar';
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Main, Content1,
  Content2, Content3, Footer, HudButton,
  EventText, StatContainer} from './Styled'; //ContentBox

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

  //const {remainingTime, calculateRemainingTime} = useContext(ClockContext);
  const { currentChar } = useContext(UserContext);

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
          engage: event.data.choice0,    // <-- these need to turn into...
          evade: event.data.choice1,     // <-- strings from a db query...
          evacuate: event.data.choice2,  // <-- choice.flavor_text ?
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

  const fetchChoice = (index: number, stat: number) => {
    axios.get<ChoiceData>(`/choice/selected/${index}`)
      .then(choiceResponse => {
        setSelectedChoice(choiceResponse.data);
        // display selectedChoice.flavor_text
        // <-- computation for success check: -->
        let choiceOutcome = statCheck(stat);
        setOutcome(choiceOutcome);
        console.log('TEST OUTCOME IN FETCHCHOICE/AXIOS', outcome);
        // currentChar.health || currentChar.endurance
        // || currentChar.strength || currentChar.mood
        // as needed against simulated d10 roll
        // pull corresponding result text from
        // selectedChoice.success || selectedChoice.failure
        // change useEffect dependencies to re-render based on success/fail ??
      })
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
      <Nav />
      <Main>
        <h2>{location.name}</h2>
        <div>
          <EventText>
            {
              Object.entries(event).length
                ? <>{event.initial_text}</>
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
          <HudButton onClick={() => fetchChoice(choices.engage, currentChar.strength)}>Engage</HudButton>
          <HudButton onClick={() => fetchChoice(choices.evade, currentChar.endurance)}>Evade</HudButton>
          <HudButton onClick={() => fetchChoice(choices.evacuate, 0)}>Evacuate</HudButton>
          <HudButton onClick={() => fetchChoice(choices.wildcard, currentChar.mood)}>Wildcard</HudButton>
        </Content3>
      </Footer>
    </Container>
  )
};

export default GameView;
