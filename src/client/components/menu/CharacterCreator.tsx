import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import {
  StyledCarousel, IconImg, IconContainer, StatName,
  CCContainer, LeftSpacer, RightSpacer, CharacterContainer,
  StatsContainer
} from './Styled';
import Carousel from 'react-bootstrap/Carousel';

import { UserContext, Character } from '../../App'; // <-- holds User object

const CharacterCreator: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, activeUser } = useContext(UserContext);

  const [ /*index*/, setIndex] = useState(0);
  const [inputName, setInputName] = useState('');

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    setCurrentChar(userChars[selectedIndex]);
  };

  const handleInputValueChange = (e) => {
    setInputName(e.target.value);
    console.log('NAME CHANGE', inputName);
  };
  console.log('NAMES?', currentChar.name, inputName);
  return (
    <CCContainer id='CCContainer'>
      <LeftSpacer id='LSpacer'>Left Spacer</LeftSpacer>
      <CharacterContainer id='CharContainer'>
        <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: number) => {
              return <Carousel.Item key={i}>
                <img src='https://res.cloudinary.com/de0mhjdfg/image/upload/v1678401231/AvatarPxl1_jsnsse.png' />
              </Carousel.Item>;
            })
          }
        </StyledCarousel>
        {/* <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: number) => {
              return <Carousel.Item key={i}>
                <img src={char.image_url} />
              </Carousel.Item>;
            })
          }
        </StyledCarousel>
        <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: number) => {
              return <Carousel.Item key={i}>
                <img src={char.image_url} />
              </Carousel.Item>;
            })
          }
        </StyledCarousel> */}
      </CharacterContainer>
      <StatsContainer id='Stats'>
        <IconContainer>
          <StatName>{currentChar.name ? <p>Name: {currentChar.name}</p> : <></>}
            <input type="text" value={inputName} onChange={handleInputValueChange} />
            <button onClick={() => { setCurrentChar(prevChar => ({ ...prevChar, name: inputName })); }}>Submit</button>
          </StatName>
        </IconContainer>
        <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" /><StatName>Health: {currentChar.health}</StatName></IconContainer>
        <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677182371/gnawlinzIcons/arm3_jlktow.png" /><StatName>Strength: {currentChar.strength}</StatName></IconContainer>
        <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" /><StatName>Endurance: {currentChar.endurance}</StatName></IconContainer>
        <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195540/gnawlinzIcons/noun-mood-White771001_u6wmb5.png" /><StatName>Mood: {currentChar.mood}</StatName></IconContainer>
      </StatsContainer>
      <RightSpacer id='RSpacer'>Right Spacer</RightSpacer>
    </CCContainer>
  );
};

export default CharacterCreator;
