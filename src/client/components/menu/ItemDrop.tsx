import React from 'react';
import axios from 'axios';
import { IconImg } from './Styled';

//import { Character } from '../../App';

interface ItemDropProps {
 itemSlot: number;
 itemId: number;
 imageUrl: string;
 charLocation: number;
 charId: number;
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
