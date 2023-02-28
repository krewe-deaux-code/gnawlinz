import axios from 'axios';

export const fetchItemsArray = async (itemArray: unknown[]) => {
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

// export const fetchItemsArray = async (itemArray: unknown[]) => {
//   const items = [];
//   itemArray.map((slotValue) => {
//     if (slotValue !== null) {
//       axios.get(`/item/${slotValue}`)
//         .then((results) => {
//           items.push(results.data);
//         })
//         .catch(err => console.error('ITEMS FROM DB??', err));
//       // const results = Promise.all(promises);
//       // const itemsData = results.map((result) => result.data);
//       return;
//     } else {
//       return;
//     }
//   });

// };
