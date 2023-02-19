import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Character {
  _id: number;
  handle_id: number;
  name: string;
  image_url: string;
  slot0: number;
  slot1: number;
  slot2: number;
  slot3: number;
  slot4: number;
  slot5: number;
  slot6: number;
  slot7: number;
  health: number;
  strength: number;
  endurance: number;
  mood: number;
  location: number;
  ally_count: number;
}

const CharacterStats: React.FC = () => {

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);

  const getCurrentCharacter = () => {
    const _id = 1;
    axios.get<Character>(`/character/${_id}`)
      .then(({ data }) =>
        setCurrentCharacter(data))
      .catch((err) =>
        console.error('Error in getCurrentCharacter in Menu.tsx: ', err))
  };


  useEffect(() => {
    getCurrentCharacter();
  }, []);

  if (!currentCharacter) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>Character Stats:</h1>
        <img src={currentCharacter.image_url}/>
        <h2>Name: {currentCharacter.name}</h2>
        <h2>Health: {currentCharacter.health}</h2>
        <h2>Strength: {currentCharacter.strength}</h2>
        <h2>Endurance: {currentCharacter.endurance}</h2>
        <h2>Location: {currentCharacter.location}</h2>
        <h2>Mood: {currentCharacter.mood}</h2>
        <h2>Item Slot 1: {currentCharacter.slot0}</h2>
        <h2>Item Slot 2: {currentCharacter.slot1}</h2>
        <h2>Item Slot 3: {currentCharacter.slot2}</h2>
        <h2>Item Slot 4: {currentCharacter.slot3}</h2>
        <h2>Item Slot 5: {currentCharacter.slot4}</h2>
        <h2>Item Slot 6: {currentCharacter.slot5}</h2>
        <h2>Item Slot 7: {currentCharacter.slot6}</h2>
        <h2>Item Slot 8: {currentCharacter.slot7}</h2>
        </div>
      </>
      );
};

      export default CharacterStats;