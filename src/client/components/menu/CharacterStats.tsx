import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { StyledCarousel, IconImg, IconContainer, StatName } from './Styled';
import Carousel from 'react-bootstrap/Carousel';

import { UserContext } from '../../App'; // <-- holds User object
import { Character } from '../../utility/interface';

// make dummy char for Create New Char? option. silhoutte image below:
// https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696909/gnawlinzIcons/noun-profile-1094753_lwnwm4.png
// push dummy char on useEffect (first time render?) into userChars state array...

const CharacterStats: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, activeUser } = useContext(UserContext); // <-- NEED to get user chars below

  const [ /*index*/, setIndex] = useState(0);
  const [locationName, setLocationName] = useState('');


  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    setCurrentChar(userChars[selectedIndex]);
  };

  const getCurrentChar = (_id) => { // this happens on useEffect, hardcoded to re-select Okra
    _id = currentChar._id || 1;
    // console.log('currentChar in CharacterStats', currentChar);
    axios.get<Character>(`/character/${_id}`)
      .then(({ data }) =>
        setCurrentChar(data))
      .catch((err) =>
        console.error('Error in getCurrentCharacter in Menu.tsx: ', err));
  };

  const fetchUserChars = async () => {
    // handle_id = activeUser.google_id || '420';
    // console.log('here handle_id change', handle_id);
    // console.log('ACTIVE USER GOOGLE ID', activeUser.google_id);
    // const handle_id = '420';
    // if (activeUser.google_id === '103981305262482746711') {
    //   handle_id = activeUser.google_id;
    //   console.log('here handle_id change', handle_id);
    // }
    // axios.get(`/character/user/${activeUser.google_id}`)
    await axios.get(`/character/user/${activeUser.google_id}`)
      .then(({ data }) => {
        console.log('RETURN USER CHARS from HANDLE_ID from SERVER', data);
        setUserChars(data);
      })
      .catch((err) => {
        console.error('Front End side fetchUserChars from server', err);
      });
    console.log('USER CHARS', userChars);
  };

  const getLocationById = (locationId) => {
    axios.get(`/location/${locationId}`)
      .then(({ data }) => {
        setLocationName(data.name);
      })
      .catch((err) => {
        console.error('Error in CharacterLocation component: ', err);
      });
  };

  useEffect(() => {
    if (Object.entries(currentChar).length && currentChar.location !== undefined) {
      getLocationById(currentChar.location);
    }
  }, [currentChar]);

  useEffect(() => {
    //console.log('INSIDE USE EFFECT', activeUser);
    fetchUserChars(); // activeUser.google_id as arg
    getCurrentChar(currentChar._id);
  }, [activeUser]);

  if (!currentChar) {
    return <div>Loading...</div>;
  }

  // console.log('CHARS AFTER FETCH', userChars);
  // console.log('CURRENT CHAR', currentChar);
  // console.log('ACTIVE USER', activeUser);
  // console.log('USER CHARS -->', userChars);
  console.log('Current Acvite User: ', activeUser);
  return (
    <>
      <div>
        <h1>Character Select:</h1>
        <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: number) => {
              return <Carousel.Item key={i}>
                <img style={{ height: '400px', width: '300px' }} src={char.image_url} />
                <StatName>Name: {char.name}</StatName>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" /><StatName>Health: {char.health}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1679511485/gnawlinzIcons/armpng_tljlh3.png" /><StatName>Strength: {char.strength}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" /><StatName>Endurance: {char.endurance}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1679511487/gnawlinzIcons/moodpng_ed3wzw.png" /><StatName>Mood: {char.mood}</StatName></IconContainer>
                <IconContainer><IconImg src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1679520788/gnawlinzIcons/Locationpng_kdqtso.png" /><StatName>Location: {locationName}</StatName></IconContainer>
              </Carousel.Item>;
            })
          }
        </StyledCarousel>
      </div>
    </>
  );
};

export default CharacterStats;
