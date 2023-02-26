import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StatName } from './Styled';

interface CharacterLocationProps {
  locationId: number;
}

const CharacterLocation: React.FC<CharacterLocationProps> = ({ locationId }) => {
  const [locationName, setLocationName] = useState('');
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
    getLocationById(locationId);
  }, []);

  return (

    <StatName>Location: {locationName}</StatName>

  );
};

export default CharacterLocation;
