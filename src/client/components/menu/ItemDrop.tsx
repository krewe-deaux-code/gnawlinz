import React from 'react';
import axios from 'axios';
import { IconImg } from './Styled';

//import { Character } from '../../App';

interface ItemDropProps {
 itemId: number;
 charLocation: number;
 imageUrl: string;
}

const ItemDrop: React.FC<ItemDropProps> = ({ itemId, charLocation, imageUrl }) => {
  const handleClick = async () => {
    try {
      await axios.put(`/location/${charLocation}`, { drop_item_slot: itemId });
    } catch (err) {
      console.error('Error updating location in handleClick--src/client/component/menu/ItemDrop.tsx: ', err);
    }
  };

  return <IconImg src={imageUrl || ''} onClick={handleClick} />;
};

export default ItemDrop;
