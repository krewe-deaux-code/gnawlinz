import axios from 'axios';

export const fetchItemsArray = async (itemArray: unknown[]) => {
  const promises = itemArray.map((slotValue) =>
    axios.get(`/item/${slotValue}`)
  );
  const results = await Promise.all(promises);
  const itemsData = results.map((result) => result.data);
  return itemsData;
};

