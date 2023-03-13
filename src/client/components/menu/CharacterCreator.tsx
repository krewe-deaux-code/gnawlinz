import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';

import {
  StyledCarousel, IconImg, IconContainer, StatName,
  CCContainer, LeftSpacer, RightSpacer, CharacterContainer,
  StatsContainer, HairSlot, FaceSlot, BodySlot, StyledCarouselItem,
  HairCarousel, FaceCarousel, BodyCarousel, AvatarContainer
} from './Styled';

import { UserContext } from '../../App';
import { Character } from '../../utility/interface';


const CharacterCreator: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, activeUser } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  const [inputName, setInputName] = useState('');
  const [hairImageUrls, setHairImageUrls] = useState([]);
  const [faceImageUrls, setFaceImageUrls] = useState([]);
  const [bodyImageUrls, setBodyImageUrls] = useState([]);
  const [cloudFolders, setCloudFolders] = useState(['hair', 'face', 'body']);
  const [loadedImage, setLoadedImage] = useState('');
  const [chosenHair, setChosenHair] = useState<string>('');
  const [chosenFace, setChosenFace] = useState<string>('');
  const [chosenBody, setChosenBody] = useState<string>('');
  const [newChar, setNewChar] = useState<Character>({} as Character);
  const [health, setHealth] = useState<number>(1);
  const [strength, setStrength] = useState<number>(1);
  const [endurance, setEndurance] = useState<number>(1);
  const [mood, setMood] = useState<number>(1);
  const [statPool, setStatPool] = useState<number>(18);

  const handleSelect = (i: number, images: string[], fn: any) => {
    fn(images[i]);
  };

  const handleInputValueChange = (e) => {
    setInputName(e.target.value);
    console.log('NAME CHANGE', inputName);
  };

  // *************
  // <-- axios -->
  // *************

  const fetchImages = (folderName, i) => {
    const fetchFuncs = [setHairImageUrls, setFaceImageUrls, setBodyImageUrls];
    axios.get('/cloudinary/get', { params: { folder: folderName } })
      .then(response => {
        console.log('CLOUDINARY FROM SERVER', response); // <-- response.data[0].url
        // console.log('TEST', response.data.map(el => el.url));
        fetchFuncs[i](response.data.map(el => el.url));
      })
      .catch(err => {
        console.error('ERROR CLOUD FROM SERVER', err);
      });
  };

  const handleSaveChar = () => {
    console.log('INSIDE SAVE', newChar);
    axios.post('/cloudinary/post', {
      topImageUrl: chosenHair,
      middleImageUrl: chosenFace,
      bottomImageUrl: chosenBody,
      characterObj: newChar
      // handle_id: activeUser.google_id
    })
      .then(response => {
        console.log('Success Posting from Client', response);
        userChars.push(response.data);
        setCurrentChar(response.data);
        axios.post(`/story/begin/${response.data._id}`)
          .catch(err => console.error('beginning story failed to fetch', err));
      })
      .catch(err => console.error('Fail Posting from Client', err));
  };

  // **********************
  // <-- event handling -->
  // **********************

  const loadCharDefaults = () => {
    setNewChar(prevChar => ({
      ...prevChar,
      handle_id: activeUser.google_id, // <-- activeUser.user_id
      image_url: '',
      inventory: [1, 1, 1, 1, 1, 1, 1, 1],
      health: 1,
      strength: 1,
      endurance: 1,
      mood: 1,
      location: Math.floor(Math.random() * 3 + 1),
      ally_count: 0,
      score: 0
    }));
  };

  const handleStatChange = (fn: any, modifier: string, statName: string, stat: number) => {
    if (modifier === '+' && statPool !== 0) {
      setNewChar(prevCharStats => ({
        ...prevCharStats,
        [statName]: ++stat
      }));
      fn(prevStat => ++prevStat);
      if (stat >= 0) { // <-- not needed?
        setStatPool(prevPool => --prevPool);
      }
    } else if (modifier === '-' && stat > 0) {
      setNewChar(prevCharStats => ({
        ...prevCharStats,
        [statName]: --stat
      }));
      fn(prevStat => --prevStat);
      if (stat > 0) {
        setStatPool(prevPool => ++prevPool);
      }
    }
  };

  // *****************
  // <-- useEffect -->
  // *****************

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      fetchImages(cloudFolders[i], i);
    }
  }, []);

  useEffect(() => {
    if (hairImageUrls.length) { setChosenHair(hairImageUrls[0]); }
  }, [hairImageUrls]);

  useEffect(() => {
    if (faceImageUrls.length) { setChosenFace(faceImageUrls[0]); }
  }, [faceImageUrls]);

  useEffect(() => {
    if (bodyImageUrls.length) { setChosenBody(bodyImageUrls[0]); }
  }, [bodyImageUrls]);

  useEffect(() => {
    if (activeUser.handle_id === undefined) { loadCharDefaults(); }
  }, [activeUser]);

  console.log('AXCTIVE USER', newChar);

  return (
    <CCContainer id='CCContainer'>
      <LeftSpacer id='LSpacer'>Left Spacer</LeftSpacer>
      <CharacterContainer id='CharContainer'>

        <AvatarContainer id='Avatar Container'>
          <BodyCarousel
            id='Body Carousel'
            slide={false}
            indicators={false}
            onSelect={(i) => {
              handleSelect(i, bodyImageUrls, setChosenBody);
            }}
            interval={null}>
            {
              bodyImageUrls.map((body: string, i: number) => {
                return <StyledCarouselItem id='Body Item' key={i}>
                  <BodySlot src={body} />
                </StyledCarouselItem>;
              })
            }
          </BodyCarousel>
          <FaceCarousel
            id='Face Carousel'
            slide={false}
            indicators={false}
            onSelect={(i) => {
              handleSelect(i, faceImageUrls, setChosenFace);
            }}
            interval={null}>
            {
              faceImageUrls.map((face: string, i: number) => {
                return <StyledCarouselItem id='Face Item' key={i}>
                  <FaceSlot id='FaceSlot' src={face} />
                </StyledCarouselItem>;
              })
            }
          </FaceCarousel>
          <HairCarousel
            id='Hair Carousel'
            slide={false}
            indicators={false}
            onSelect={(i) => {
              handleSelect(i, hairImageUrls, setChosenHair);
            }}
            interval={null}>
            {
              hairImageUrls.map((hair: string, i: number) => {
                return <StyledCarouselItem id='Hair Item' key={i}>
                  <HairSlot id='HairSlot' src={hair} />
                </StyledCarouselItem>;
              })
            }
          </HairCarousel>
        </AvatarContainer>
        <div>{statPool}</div>
      </CharacterContainer>
      <button onClick={handleSaveChar}>SAVE</button>
      <StatsContainer id='Stats'>
        <IconContainer>
          <StatName>{newChar.name ? <p>Name: {newChar.name}</p> : <p>Name: Anonymous</p>}
            <input type="text" value={inputName} onChange={handleInputValueChange} />
            <button onClick={() => { setNewChar(prevChar => ({ ...prevChar, name: inputName })); }}>Submit</button>
          </StatName>
        </IconContainer>
        <IconContainer>
          <IconImg
            src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1676589660/gnawlinzIcons/noun-heart-pixel-red-2651784_c3mfl8.png" />
          <StatName>Health: {newChar.health}</StatName>
          <button onClick={() => handleStatChange(setHealth, '-', 'health', health)}>-</button>
          <button onClick={() => handleStatChange(setHealth, '+', 'health', health)}>+</button>
        </IconContainer>
        <IconContainer>
          <IconImg
            src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677182371/gnawlinzIcons/arm3_jlktow.png" />
          <StatName>Strength: {newChar.strength}</StatName>
          <button onClick={() => handleStatChange(setStrength, '-', 'strength', strength)}>-</button>
          <button onClick={() => handleStatChange(setStrength, '+', 'strength', strength)}>+</button>
        </IconContainer>
        <IconContainer>
          <IconImg
            src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677194993/gnawlinzIcons/shield-pixel-2651786_ujlkuq.png" />
          <StatName>Endurance: {newChar.endurance}</StatName>
          <button onClick={() => handleStatChange(setEndurance, '-', 'endurance', endurance)}>-</button>
          <button onClick={() => handleStatChange(setEndurance, '+', 'endurance', endurance)}>+</button>
        </IconContainer>
        <IconContainer>
          <IconImg
            src="https://res.cloudinary.com/de0mhjdfg/image/upload/v1677195540/gnawlinzIcons/noun-mood-White771001_u6wmb5.png" />
          <StatName>Mood: {newChar.mood}</StatName>
          <button onClick={() => handleStatChange(setMood, '-', 'mood', mood)}>-</button>
          <button onClick={() => handleStatChange(setMood, '+', 'mood', mood)}>+</button>
        </IconContainer>
      </StatsContainer>
      <RightSpacer id='RSpacer'>Right Spacer</RightSpacer>
    </CCContainer>
  );
};

export default CharacterCreator;
