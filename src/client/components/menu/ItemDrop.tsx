import React from 'react';
import axios from 'axios';
import { IconImg } from './Styled';

//import { Character } from '../../App';

interface ItemDropProps {
<<<<<<< HEAD
 itemSlot: number;
 itemId: number;
 imageUrl: string;
 charLocation: number;
 charId: number;
=======
  itemId: number;
  charLocation: number;
  imageUrl: string;
>>>>>>> 1da62c8f85c9e5b564a54aa8565b202f84e58b1d
}

const ItemDrop: React.FC<ItemDropProps> = ({ itemId, charLocation, imageUrl, charId, itemSlot }) => {
  const handleClick = async () => {
    try {
      await axios.put(`/location/drop_item_slot/${charLocation}`, { drop_item_slot: itemId });
      // await axios.patch(`/character/update/${charId}`, {`slot${itemSlot}`: null});
    } catch (err) {
      console.error('Error updating location in handleClick--src/client/component/menu/ItemDrop.tsx: ', err);
    }
  };

  return <IconImg src={imageUrl || ''} onClick={handleClick} />;
};

export default ItemDrop;
