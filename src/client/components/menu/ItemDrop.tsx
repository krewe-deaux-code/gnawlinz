import React, { useContext } from 'react';
import axios from 'axios';
import { IconImg } from './Styled';
import { UserContext } from '../../App';

//import { Character } from '../../App';
interface ItemDropProps {
  itemId: number;
  imageUrl: string;
  charId: number;
  itemSlot: number;
}

const ItemDrop: React.FC<ItemDropProps> = ({ itemId, imageUrl, itemSlot }) => {

  const {currentChar} = useContext(UserContext);
  const handleClick = async () => {
    try {
      await axios.put(`/location/drop_item_slot/${currentChar.location}`, { drop_item_slot: itemId });
      // await axios.patch(`/character/update/${currentChar._id}`, {[`slot${itemSlot}`]: null});
    } catch (err) {
      console.error('Error updating location in handleClick--src/client/component/menu/ItemDrop.tsx: ', err);
    }
  };

  return <IconImg src={imageUrl || ''} onClick={handleClick} />;
};

export default ItemDrop;
