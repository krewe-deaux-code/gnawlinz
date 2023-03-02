import React, { useContext } from 'react';
// import { IconContainer, StatName } from './Styled';
// import ItemDrop from './ItemDrop';
//import CharacterStats from './CharacterStats';
import { UserContext, Character } from '../../App';
import axios from 'axios';
// interface Item {
//   _id: number;
//   name: string;
//   image_url: string;
//   consumables: boolean;
//   modified_stat0: string;
//   modified_stat1: string;
//   modifier0: number;
//   modifier1: number;
//   buy_price: number;
//   sell_price: number;
// }


const ItemSlots: React.FC = () => {

  const { currentChar, setCurrentChar } = useContext(UserContext);

  const fetchItems = () => {
    axios.get<Character>('/character/inventory/get', { params: { charID: currentChar._id } })
      .then(({ data }) => {
        setCurrentChar(data);
        console.log(data);
      });
  };

  return (
    <div>
      <button onClick={fetchItems}></button>
      <div>{currentChar.inventory}</div>
    </div>
  );


};
export default ItemSlots;

