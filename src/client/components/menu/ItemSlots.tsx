import React, { useEffect, useState } from 'react';
import { IconContainer, StatName } from './Styled';
import ItemDrop from './ItemDrop';
//import CharacterStats from './CharacterStats';
import { Character } from '../../App';

import axios from 'axios';

interface Item {
  _id: number;
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

  const fetchItemsArray = async (itemArray: unknown[]) => {
    const passToDB = itemArray.filter(el => {
      return el !== null;
    });
    const promises = passToDB.map((slotValue) =>
      axios.get(`/item/${slotValue}`)
    );
    const results = await Promise.all(promises);
    const itemsData = results.map((result) => result.data);
    return itemsData;
  };

  useEffect(() => {
    fetchItemsArray([char.slot0, char.slot1, char.slot2, char.slot3, char.slot4, char.slot5, char.slot6, char.slot7])
      .then((itemsData) =>
        setItems(itemsData))
      .catch((err) =>
        console.error('Error in fetchItemsArray call--src/client/components/menu/ItemSlots.tsx', err));
  }, []);
  return (
    <div>
      {items.map((item, i: number) => (
        <IconContainer key={i}><ItemDrop itemId={item._id} charLocation={char.location} imageUrl={item.image_url} /><StatName>Item Slot {`${i + 1}`}: {item.name || 'Empty'}</StatName></IconContainer>
      ))}
    </div>
  );

};

export default ItemSlots;
