import React, { Fragment, useContext, useEffect, useState } from 'react'; //
import { Link } from 'react-router-dom';
import {
  Container,
  Story,
  End,
  Content1,
  ScrollableContainer,
  StatContainer,
  CharacterStatContainer,
  StoryItemCard,
  ResultAvatarContainer,
  WinLoss,
  RipName,
} from './Styled'; //NavBar,
import { ArcadeGlowContainer, CRTGlow } from '../menu/Styled';
import Nav from '../nav/NavBar';
import LeaderBoard from './LeaderBoard';
import images from '../../utility/images';
import { UserContext } from '../../App'; // <-- holds User object
import Confetti from 'react-confetti';
import { AvatarContainer, StatButton } from '../menu/Styled';

import axios from 'axios';
import { GameViewProps } from '../../types/interface';

const Result = (props: GameViewProps) => {
  window.onerror = () => {
    window.location.href = '/menu';
  };

  const { currentChar } = useContext(UserContext); // <-- NEED to get user chars below

  const [story, setStory] = useState([]);

  // add win/loss image & resultText to state
  const [image, setImage] = useState(
    'https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696914/gnawlinzIcons/noun-death-1094768_x1aqmj.png'
  );
  const [resultText, setResultText] = useState('');
  const [resultText1, setResultText1] = useState('');

  useEffect(() => {
    axios
      .get(`story/ending/${currentChar._id}`)
      .then((results) => {
        // console.log('result from story query:', results.data);
        setStory(results.data);
      })
      .catch((err) => {
        console.error('error getting result: \n', err);
      });
    // function to determine win/loss based on currentChar health stat
    const getWinLoss = () => {
      if (currentChar.health > 0 && currentChar.mood > 0) {
        setImage(images.trophyIcon);
        setResultText(currentChar.name);
        setResultText1(' survived!');
      } else {
        setImage(images.deathIcon);
        setResultText('R.I.P. ');
        setResultText1(currentChar.name);
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

  // console.log('result from story query:', story);

  const handleClick = () => {
    window.location.href = '/menu';
  };

  return (
    <div style={{ color: 'white' }}>
      <Nav isActive={true} showButton={true} handleSpeak={props.handleSpeak} />
      <ArcadeGlowContainer>
        <CRTGlow>
          <Container>
            {resultText1 === ' survived!' ? (
              <div>
                {' '}
                <Confetti colors={colors} gravity={0.1} />{' '}
              </div>
            ) : null}
            <Story>
              <h1 onClick={props.handleSpeak}>
                <WinLoss>
                  <img src={image} />
                  <RipName>
                    <div>{resultText}</div>
                    <div>{resultText1}</div>
                  </RipName>
                  <img src={image} />
                </WinLoss>
              </h1>
              <ScrollableContainer>
                {uniqueEvents.map((sentence, index) => (
                  <StoryItemCard key={index + sentence}>
                    <p onClick={props.handleSpeak}>{sentence} </p>
                  </StoryItemCard>
                ))}
              </ScrollableContainer>
              <Content1>
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <Content1>
                    <StatButton
                      style={{ margin: 'auto' }}
                      onClick={handleClick}
                    >
                      Play Again
                    </StatButton>
                  </Content1>
                </Link>
              </Content1>
            </Story>
            <End className='End'>
              <ResultAvatarContainer className='AvatarContainer'>
                <h2 style={{ top: '20px', position: 'relative' }}>
                  {' '}
                  Final Score: {currentChar.score}{' '}
                </h2>
                {/* <img src={currentChar.image_url} /> */}
                <img src={currentChar.image_url} style={{ height: '65%' }} />
              </ResultAvatarContainer>
              {/* <h2> Score: {currentChar.score} </h2> */}
              <h2
                onClick={props.handleSpeak}
                style={{ bottom: '30px', position: 'relative' }}
              >
                Top Scores
              </h2>
              <ScrollableContainer style={{ bottom: '10%' }}>
                <LeaderBoard />
              </ScrollableContainer>
            </End>
          </Container>
        </CRTGlow>
      </ArcadeGlowContainer>
    </div>
  );
};

export default Result;
