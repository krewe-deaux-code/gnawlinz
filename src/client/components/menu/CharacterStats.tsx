import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { neutral } from '../../utility/sounds';
import images from '../../utility/images';

import { StyledCarousel, IconImg, StatName, CharSelectStatBox, IconContainerInner, IconContainerOutter, RedX } from './Styled';
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
    neutral.play();
    setIndex(selectedIndex);
    setCurrentChar(userChars[selectedIndex]);
  };

  const getCurrentChar = () => { // this happens on useEffect, hardcoded to re-select Okra
    const _id = currentChar._id || 1;
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
    getCurrentChar();
  }, [activeUser]);

  if (!currentChar) {
    return <div>Loading...</div>;
  }

  // console.log('CHARS AFTER FETCH', userChars);
  // console.log('CURRENT CHAR', currentChar);
  // console.log('ACTIVE USER', activeUser);
  // console.log('USER CHARS -->', userChars);
  // console.log('Current Acvite User: ', activeUser);
  return (
    <>
      <div>
        <h1><u>Character Select:</u></h1>
        {userChars.length ?
          <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
            {
              userChars.map((char: Character, i: number) => {
                console.log('INSIDE MAP', char);
                return (
                  <Carousel.Item key={i}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {
                        char.mood < 1 || char.health < 1 ? <RedX src={images.redX}></RedX> : <></>
                      }
                      <img style={{ height: '400px', width: '300px' }} src={char.image_url} />
                    </div>
                    <StatName><u>Name: {char.name}</u></StatName>
                    <CharSelectStatBox>
                      <IconContainerInner><IconImg src={images.healthIcon} /><StatName>Health: {char.health}</StatName></IconContainerInner>
                      <IconContainerInner><IconImg src={images.strengthIcon} /><StatName>Strength: {char.strength}</StatName></IconContainerInner>
                      <IconContainerInner><IconImg src={images.enduranceIcon} /><StatName>Endurance: {char.endurance}</StatName></IconContainerInner>
                      <IconContainerInner><IconImg src={images.moodIcon} /><StatName>Mood: {char.mood}</StatName></IconContainerInner>
                    </CharSelectStatBox>
                    <IconContainerOutter><StatName style={{ display: 'flex' }}>Location: {locationName}</StatName></IconContainerOutter>
                  </Carousel.Item>
                );
              })
            }
          </StyledCarousel> :
          <>
            <img style={{ height: '400px', width: '300px' }} src={images.createCharImage} />
            <StatName>Create a Character:</StatName>
          </>
        }
      </div>
    </>
  );
};

export default CharacterStats;
