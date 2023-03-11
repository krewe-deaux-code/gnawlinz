import React, { useContext, useEffect, useState } from 'react';//
import { Link } from 'react-router-dom';
import { Container, Story, End, ResultButton, Content1, ScrollableContainer, StatContainer, CharacterStatContainer } from './Styled';//NavBar,
import Nav from '../nav/NavBar';
import LeaderBoard from './LeaderBoard';
import { UserContext } from '../../App'; // <-- holds User object
import { GameViewProps } from '../../utility/interface';

import axios from 'axios';

const Result = (props: GameViewProps) => {

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below

  const [story, setStory] = useState([]);

  // add win/loss image & resultText to state
  const [image, setImage] = useState('https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
  const [resultText, setResultText] = useState('you died!');

  useEffect(() => {
    axios.get(`story/ending/${currentChar._id}`)
      .then((results) => {
        console.log('result from story query:', results.data);
        setStory(results.data);
      }).catch((err) => {
        console.error(err);
      });
    // function to determine win/loss based on currentChar health stat
    const getWinLoss = () => {
      if (currentChar.health > 0 && currentChar.mood > 0) {
        setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/c_thumb,w_200,g_face/v1676696912/gnawlinzIcons/noun-trophy-1097545_moxxrf.png');
        setResultText('you survived!');
      } else {
        setImage('https://res.cloudinary.com/de0mhjdfg/image/upload/c_thumb,w_200,g_face/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png');
        setResultText('you died!');
      }
    };
    getWinLoss(); // calling the function once when the component mounts



  }, []);

  const uniqueEvents = [];
  story.forEach((line) => {
    if (!uniqueEvents.includes(line) && line) {
      uniqueEvents.push(line);
    }
  });


  console.log('result from story query:', story);
  return (
    <Container>
      <Nav isActive={true} />
      <Story><h2 onClick={props.handleSpeak}>User Story</h2>
        <ScrollableContainer>
          {uniqueEvents.map((sentence, index) => (
            <div key={index} style={{ border: '1px solid black', margin: '10px' }}>
              <p>{sentence}</p>
            </div>
          ))}
        </ScrollableContainer>
      </Story>
      <End><h2 onClick={props.handleSpeak}>{resultText}</h2>

        <div>
          <img src={image} />
        </div>
        <CharacterStatContainer>
          <div>
            <h4 onClick={props.handleSpeak}>{currentChar.name}</h4>
            <img src={currentChar.image_url} />
          </div>
          <StatContainer onClick={props.handleSpeak}>
            <div style={{ textDecoration: 'underline' }}>Status</div>
            <div>Health: {currentChar.health}</div>
            <div>Strength: {currentChar.strength}</div>
            <div>Endurance: {currentChar.endurance}</div>
            <div>Mood: {currentChar.mood}</div>
          </StatContainer>
        </CharacterStatContainer>
        <Content1>
          <Link to="/" style={{ textDecoration: 'none' }} >
            <Content1>
              <ResultButton>Play Again</ResultButton>
            </Content1>
          </Link>
        </Content1>
        <h4 onClick={props.handleSpeak}>LeaderBoard</h4>
        <LeaderBoard />
      </End>
    </Container>
  );
};

export default Result;
