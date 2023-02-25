import React, { useEffect, useState } from 'react';
import { IconContainer, StatName } from './Styled';
//import CharacterStats from './CharacterStats';
import { Character } from '../../App';
import { fetchItemsArray } from '../../utility/itemUtils';
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
    fetchItemsArray([char.slot0, char.slot1, char.slot2, char.slot3, char.slot4, char.slot5, char.slot6, char.slot7])
      .then((itemsData) => setItems(itemsData));
  }, []);
  return (
    <div>
      {items.map((item, i) => (
        <IconContainer><StatName key={i}>Item Slot {`${i}`}: {item.name || 'Empty'}</StatName></IconContainer>
        // Render the item however you want
      ))}
    </div>
  );

};

export default ItemSlots;
