import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

import { StyledCarousel, IconImg, IconContainer, StatName } from "./Styled";
import Carousel from 'react-bootstrap/Carousel';

import { UserContext, Character } from "../../App"; // <-- holds User object

import  ItemSlots  from "./ItemSlots";

const CharacterStats: React.FC = () => {


  const { userChars, setUserChars, currentChar, setCurrentChar, /*activeUser*/ } = useContext(UserContext); // <-- NEED to get user chars below
  // const [ userChars, setUserChars ] = useState<Character[]>([]);
  // const [ currentChar, setCurrentChar ] = useState<Character | null>(null);
  const [ /*index*/, setIndex] = useState(0);
 
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setCurrentChar(userChars[selectedIndex]);
  
  };


  const getCurrentChar = (_id = 1) => {

    axios.get<Character>(`/character/${_id}`)
      .then(({ data }) =>
        setCurrentChar(data))
      .catch((err) =>
        console.error('Error in getCurrentCharacter in Menu.tsx: ', err))
  };

  const fetchUserChars = () => {
    const handle_id = '420';
    // axios.get(`/character/user/${activeUser.google_id}`)
    axios.get(`/character/user/${handle_id}`)
      .then(({ data }) => {
        setUserChars(data);
      })
      .catch((err) => {
        console.error('Front End side fetchUserChars from server', err);
      });
  };



  useEffect(() => {
    fetchUserChars();
    getCurrentChar();
  }, []);

  if (!currentChar) {
    return <div>Loading...</div>;
  }
  

  // console.log('CHARS AFTER FETCH', userChars);
  // console.log('test', currentChar);
  
  return (
    <>
      <div>
       
        <h1>Character Stats:</h1>
        <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: React.Key | null | undefined) => {
              return <Carousel.Item key={i}>
                <img src={char.image_url} />
                <StatName>Name: {char.name}</StatName>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" /><StatName>Health: {char.health}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677182371/gnawlinzIcons/arm3_jlktow.png" /><StatName>Strength: {char.strength}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" /><StatName>Endurance: {char.endurance}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195328/gnawlinzIcons/noun-map-marker-White291627_honeq7.png" /><StatName>Location: {char.location}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195540/gnawlinzIcons/noun-mood-White771001_u6wmb5.png" /><StatName>Mood: {char.mood}</StatName></IconContainer>
                <ItemSlots char={char} />
              </Carousel.Item>
            })
          }
        </StyledCarousel>
      </div>
    </>
  );
};

export default CharacterStats;
