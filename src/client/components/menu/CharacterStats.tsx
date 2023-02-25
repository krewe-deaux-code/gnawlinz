import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { StyledCarousel } from './Styled';
import Carousel from 'react-bootstrap/Carousel';

import { UserContext, Character } from '../../App'; // <-- holds User object

const CharacterStats: React.FC = () => {

  const { userChars, setUserChars, currentChar, setCurrentChar, /*activeUser*/ } = useContext(UserContext); // <-- NEED to get user chars below
  // const [ userChars, setUserChars ] = useState<Character[]>([]);
  // const [ currentChar, setCurrentChar ] = useState<Character | null>(null);
  const [ /*index*/, setIndex ] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setCurrentChar(userChars[selectedIndex]);
  };

  const getCurrentChar = () => {
    const _id = 1;
    axios.get<Character>(`/character/${_id}`)
      .then(({ data }) =>
        setCurrentChar(data))
      .catch((err) =>
        console.error('Error in getCurrentCharacter in Menu.tsx: ', err));
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
            userChars.map((char: Character, i) => {
              return <Carousel.Item key={i}>
                <img src={char.image_url}/>
                <h5>Name: {char.name}</h5>
                <h5>Health: {char.health}</h5>
                <h5>Strength: {char.strength}</h5>
                <h5>Endurance: {char.endurance}</h5>
                <h5>Location: {char.location}</h5>
                <h5>Mood: {char.mood}</h5>
                <h5>Item Slot 1: {char.slot0}</h5>
                <h5>Item Slot 2: {char.slot1}</h5>
                <h5>Item Slot 3: {char.slot2}</h5>
                <h5>Item Slot 4: {char.slot3}</h5>
                <h5>Item Slot 5: {char.slot4}</h5>
                <h5>Item Slot 6: {char.slot5}</h5>
                <h5>Item Slot 7: {char.slot6}</h5>
                <h5>Item Slot 8: {char.slot7}</h5>
              </Carousel.Item>;
            })
          }
        </StyledCarousel>
      </div>
    </>
  );
};

export default CharacterStats;
