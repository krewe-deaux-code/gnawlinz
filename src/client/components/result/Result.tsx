import React, { useContext, useEffect, useState } from 'react';//
import { Link } from 'react-router-dom';
import { Container, Story, End, ResultButton, Content1, ScrollableContainer, StatContainer, CharacterStatContainer } from './Styled';//NavBar,
import Nav from '../nav/NavBar';
import LeaderBoard from './LeaderBoard';
import images from '../../utility/images';
import { SettingsContext, UserContext } from '../../App'; // <-- holds User object
import Confetti from 'react-confetti';
import { StatButton } from '../menu/Styled';



import axios from 'axios';

const Result: React.FC = () => {

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below
  const { isSpeakingEnabled } = useContext(SettingsContext);
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
        // setShowConfetti(true);
        setImage(images.trophyIcon);
        setResultText('you survived!');
      } else {
        setImage(images.deathIcon);
        setResultText('you died!');
      }
    };
    getWinLoss(); // calling the function once when the component mounts



  }, []);


  //set the colors for the confetti
  const colors = ['rgb(156, 9, 252)', 'rgb(255, 235, 36)', 'rgb(12, 217, 49)'];
  const uniqueEvents = [];
  story.forEach((line) => {
    if (!uniqueEvents.includes(line) && line) {
      uniqueEvents.push(line);
    }
  });
  console.log(currentChar.health);

  console.log('result from story query:', story);

  const msg = new SpeechSynthesisUtterance();
  const handleSpeak = (e) => {
    if (isSpeakingEnabled) {
      msg.text = e.target.innerText;
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <Container>
      {resultText === 'you survived!' ? <div> <Confetti
        colors={colors}
      /> </div> : null}
      <Nav isActive={true} showButton={true} />
      <Story>

        <h1 onClick={handleSpeak}><img src={image} />{resultText}<img src={image} /></h1>
        <ScrollableContainer >
          {uniqueEvents.map((sentence, index) => (
            <div key={index} style={{ border: '1px solid black', margin: '10px', padding: '10px', paddingTop: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <p onClick={handleSpeak}>{sentence} </p>
            </div>
          ))}
        </ScrollableContainer>
        <Content1>
          <Link to="/" style={{ textDecoration: 'none' }} >
            <Content1>

              <StatButton style={{margin: 'auto'}}>Play Again</StatButton>
            </Content1>
          </Link>
        </Content1>
      </Story>
      <End>
        <div>
          {/* <h4 onClick={props.handleSpeak}>{currentChar.name}</h4> */}
          <h2 onClick={handleSpeak}> Your Score: {currentChar.score} </h2>
          <img src={currentChar.image_url} />
        </div>
        <h2 onClick={handleSpeak}>Top Scores</h2>
        <ScrollableContainer>
          <LeaderBoard />
        </ScrollableContainer>
      </End>
    </Container >
  );
};

export default Result;
