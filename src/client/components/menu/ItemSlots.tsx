import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { IconContainer, StatName } from "./Styled";
//import CharacterStats from './CharacterStats';
import { Character } from '../../App';

interface Item {
  _id: string;
  name: string;
  image_url: string;
  consumables: boolean;
  modified_stat0: string;
  modified_stat1: string;
  modifier0: number;
  modifier1: number;
  buy_price: number;
  sell_price: number;
}

interface ItemSlotsProps {
  char: Character;
}

const ItemSlots: React.FC<ItemSlotsProps> = ({ char }) => {
  const [items, setItems] = useState<Item[]>([]);








  useEffect(() => {
    // eslint-disable-next-line func-style
    async function fetchData() {
      const itemArray = [char.slot0, char.slot1, char.slot2, char.slot3, char.slot4, char.slot5, char.slot6, char.slot7];
      const promises = itemArray.map((slotValue) =>
        axios.get(`/item/${slotValue}`)
      );
      const results = await Promise.all(promises);
      const itemsData = results.map((result) => result.data);
      setItems(itemsData);

    }
    fetchData();
  }, []);
  return (
    <div>
      {items.map((item, i) => (
        <h5 key={i}>Item Slot {`${i}`}: {item.name || 'Empty'}</h5>
        // Render the item however you want
      ))}
    </div>
  );

};

export default ItemSlots;
