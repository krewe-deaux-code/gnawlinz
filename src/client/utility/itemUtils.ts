import axios from 'axios';

export const fetchItemsArray = async (itemArray: unknown[]) => {
  const promises = itemArray.map((itemID) =>
    axios.get(`/item/${itemID}`)
  );
  const results = await Promise.all(promises);
  const itemsData = results.map((result) => result.data);
  return itemsData;
};

