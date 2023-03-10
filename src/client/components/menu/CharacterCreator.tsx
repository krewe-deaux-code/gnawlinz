import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';

// import cloudinary from 'cloudinary';
// import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

import {
  StyledCarousel, IconImg, IconContainer, StatName,
  CCContainer, LeftSpacer, RightSpacer, CharacterContainer,
  StatsContainer, HairSlot, FaceSlot, BodySlot
} from './Styled';

import { UserContext, Character } from '../../App'; // <-- holds User object

// const { CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET } = process.env; // <-- npm i --save-dev dotenv-webpack
const cloudFolders = ['hair', 'face', 'body'];
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

// const cloudinaryCore: any = new Cloudinary({
//   cloud_name: 'de0mhjdfg',
//   api_key: '742969255591168',
//   api_secret: 'tYNQt5sfW6RbAeIJbSpX9ZCAqGI'
// });

// cloudinary.v2.config({
//   cloud_name: 'de0mhjdfg',
//   api_key: '742969255591168',
//   api_secret: 'tYNQt5sfW6RbAeIJbSpX9ZCAqGI'
// });

const CharacterCreator: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, activeUser } = useContext(UserContext);

  const [ /*index*/, setIndex] = useState(0);

  const [inputName, setInputName] = useState('');
  const [hairImages, setHairImages] = useState([]);
  const [faceImages, setFaceImages] = useState([]);
  const [bodyImages, setBodyImages] = useState([]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    // setCurrentChar(userChars[selectedIndex]);
  };

  const handleInputValueChange = (e) => {
    setInputName(e.target.value);
    console.log('NAME CHANGE', inputName);
  };

  // <-- shift cloudinary over to server -->
  // const fetchImages = () => {
  //   axios.get('/cloudinary')
  // };

  // useEffect(() => {
  //   const fetchFuncs = [setHairImages, setFaceImages, setBodyImages];
  //   // for (let i = 0; i < fetchFuncs.length; i++) {
  //   (function () {
  //     const options = {
  //       cloud_name: 'de0mhjdfg',
  //       api_key: '742969255591168',
  //       api_secret: 'tYNQt5sfW6RbAeIJbSpX9ZCAqGI'
  //     };
  //     console.log('FETCH FIRING', cloudinary);
  //     cloudinary.api
  //       .resources(
  //         {
  //           type: 'upload',
  //           prefix: 'hair'
  //         })
  //       .then(result => console.log(result));
  //     // cloudinary.v2.api.sub_folders('hair', options)
  //     //   .then(response => {
  //     //     console.log('CLOUDINARY', response);
  //     //     // setHairImages(response.resources);
  //     //   })
  //     //   .catch(err => console.error('Fetching from Cloudinary Error', err));
  //   })();
  //   // }
  // }, []);

  console.log('STATE FETCH FROM CLOUDINARY', hairImages, faceImages, bodyImages);

  return (
    <CCContainer id='CCContainer'>
      <LeftSpacer id='LSpacer'>Left Spacer</LeftSpacer>
      <CharacterContainer id='CharContainer'>
        {/* <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
          {
            userChars.map((char: Character, i: number) => {
              return <Carousel.Item key={i}>
                <img src='https://res.cloudinary.com/de0mhjdfg/image/upload/v1678401231/AvatarPxl1_jsnsse.png' />
              </Carousel.Item>;
            })
          }
        </StyledCarousel> */}
        <HairSlot>
          <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
            {
              hair.map((hair: string, i: number) => {
                return <Carousel.Item key={i}>
                  <img src={hair} />
                </Carousel.Item>;
              })
            }
          </StyledCarousel>
        </HairSlot>
        <FaceSlot>
          <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
            {
              face.map((face: string, i: number) => {
                return <Carousel.Item key={i}>
                  <img src={face} />
                </Carousel.Item>;
              })
            }
          </StyledCarousel>
        </FaceSlot>
        <BodySlot>
          <StyledCarousel slide={false} indicators={false} onSelect={handleSelect} interval={null}>
            {
              body.map((body: string, i: number) => {
                return <Carousel.Item key={i}>
                  <img src={body} />
                </Carousel.Item>;
              })
            }
          </StyledCarousel>
        </BodySlot>
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
      <RightSpacer id='RSpacer'>{hairImages.length ? <>{hairImages[0]}</> : <></>}</RightSpacer>
    </CCContainer>
  );
};

export default CharacterCreator;
