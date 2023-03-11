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

// <-- for reference building new Char Obj -->
// interface Character {
//   _id: number; <-- won't need
//   handle_id: number; <-- come from session? activeUser?
//   name: string;
//   image_url: string;
//   inventory: Array<number>; <-- empty []
//   health: number;
//   strength: number;
//   endurance: number;
//   mood: number;
//   location: number; <-- 1 (random num between 1 - 3)
//   ally_count: number; <-- 0
//   score: number; <-- 0
// }

// ******************
// *** dummy data ***
// ******************

const hair = [
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair1Pxl_idnvai.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407932/hair/Hair2Pxl_k2c8ko.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair3Pxl_ugjngb.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair4Pxl_gozyxw.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407932/hair/Hair5Pxl_mxuvza.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair6Pxl_ev7k88.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair7Pxl_b0kcax.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair8Pxl_fb4xfa.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair9Pxl_eaqpe3.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407931/hair/Hair10Pxl_i8nifo.png'
];
const face = [
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face1Pxl_gvhouy.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face2Pxl_nkh9vu.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face3Pxl_hwd1jv.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face4Pxl_lr0nec.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face5Pxl_izvh4x.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face6Pxl_qob3j6.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face7Pxl_nhbaex.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face8Pxl_hc7ivx.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407558/face/Face9Pxl_gmxzmp.png',
];
const body = [
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407096/body/Body1Pxl_penbsv.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407096/body/Body2Pxl_r7kme1.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407096/body/Body3Pxl_r0hran.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407097/body/Body4Pxl_hzwxdz.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407097/body/Body5Pxl_x77vqz.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407096/body/Body6Pxl_zu0c0r.png',
  'https://res.cloudinary.com/de0mhjdfg/image/upload/v1678407097/body/Body7Pxl_vqxar2.png'
];

const CharacterCreator: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, activeUser } = useContext(UserContext);

  const [index, setIndex] = useState(0);

  const [inputName, setInputName] = useState('');
  const [hairImageUrls, setHairImageUrls] = useState([]);
  const [faceImageUrls, setFaceImageUrls] = useState([]);
  const [bodyImageUrls, setBodyImageUrls] = useState([]);
  const [cloudFolders, setCloudFolders] = useState(['hair', 'face', 'body']);
  const [chosenHair, setChosenHair] = useState<string>('');
  const [chosenFace, setChosenFace] = useState<string>('');
  const [chosenBody, setChosenBody] = useState<string>('');

  const handleSelect = (i: number, images: string[], fn: any) => {
    console.log('INSIDE HANDLE SELECT', i);
    console.log('TEST', i, fn);
    // if (type === 'hair') {
    //   setChosenHair(images[i]);
    // } else if (type === 'face') {
    //   setChosenFace(images[i]);
    // } else if (type === 'body') {
    //   setChosenBody(images[i]);
    // }
    fn(images[i]);
    console.log('CHOSEN', chosenHair, chosenFace, chosenBody);
  };

  const handleInputValueChange = (e) => {
    setInputName(e.target.value);
    console.log('NAME CHANGE', inputName);
  };

  const handleSaveImage = () => {
    axios.post('/cloudinary/post', {
      topImage: chosenHair,
      middleImage: chosenFace,
      bottomImage: chosenBody
    })
      .then(() => console.log('Success Posting from Client'))
      .catch(err => console.error('Fail Posting from Client', err));
  };

  // <-- to save newChar in DB --> { newCharacter: {} }

  // *************
  // *** axios ***
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

  // <-- commented out to preserve API hit limit -->
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

  // console.log('STATE FETCH FROM CLOUDINARY', hairImages, faceImages, bodyImages);

  return (
    <CCContainer id='CCContainer'>
      <LeftSpacer id='LSpacer'>Left Spacer</LeftSpacer>
      <CharacterContainer id='CharContainer'>
        <AvatarContainer id='Avatar Container'>
          <BodyCarousel
            id='Body Carousel'
            slide={false}
            indicators={false}
            onSelect={(i) => handleSelect(i, bodyImageUrls, setChosenBody)}
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
            onSelect={(i) => handleSelect(i, faceImageUrls, setChosenFace)}
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
            onSelect={(i) => handleSelect(i, hairImageUrls, setChosenHair)}
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

        {/* <StyledCarousel id='Hair Carousel' slide={false} indicators={false} onSelect={(i) => handleSelect(i, hair)} interval={null}>
          {
            hair.map((hair: string, i: number) => {
              return <Carousel.Item id='Hair Item' key={i}>
                <HairSlot id='HairSlot' src={hair} />
              </Carousel.Item>;
            })
          }
          <StyledCarousel id='Face Carousel' slide={false} indicators={false} onSelect={handleSelect} interval={null}>
            {
              face.map((face: string, i: number) => {
                return <Carousel.Item id='Face Item' key={i}>
                  <FaceSlot id='FaceSlot' src={face} />
                </Carousel.Item>;
              })
            }
            <StyledCarousel id='Body Carousel' slide={false} indicators={false} onSelect={handleSelect} interval={null}>
              {
                body.map((body: string, i: number) => {
                  return <Carousel.Item id='Body Item' key={i}>
                    <BodySlot src={body} />
                  </Carousel.Item>;
                })
              }
            </StyledCarousel>
          </StyledCarousel>
        </StyledCarousel> */}
      </CharacterContainer>
      <button onClick={handleSaveImage}>SAVE</button>
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
