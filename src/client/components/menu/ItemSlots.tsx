// import React, { useEffect, useState, useContext } from 'react';
// import { IconImg } from './Styled';
// // import ItemDrop from './ItemDrop';
// //import CharacterStats from './CharacterStats';
// import { UserContext, Character } from '../../utility/interface';
// import axios from 'axios';

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

// const ItemSlots: React.FC = () => {

//   const { currentChar, setCurrentChar } = useContext(UserContext);


//   console.log('FETCHED INV', fetchedInventory);
//   return (
//     <div>
//       <button onClick={fetchItems}></button>
//       <div>{currentChar.inventory}</div>
//       <button onClick={handleItemLookup}></button>
//       {
//         fetchedInventory.map((item: Item, i) => {
//           return <div
//             key={i}
//             onClick={() => handleDropItem(item._id)}
//           >{item.name}<IconImg src={item.image_url}></IconImg></div>;
//         })
//       }
//     </div>
//   );


// };

// export default ItemSlots;



// // <-- ITEM DROP COMPONENT FROM THE GRAVE -->
// // const ItemDrop: React.FC = () => { // { itemId, imageUrl, itemSlot } === props

// //   const { currentChar, setCurrentChar } = useContext(UserContext);

// // itemId, itemSlot coming from CHAR in userChars array from context
// // query /item endpoint to return imageURL
// // axios.put(`/location/drop_item_slot/${currentChar.location}`, { drop_item_slot: itemId });

// //   return (
// //     <IconImg src={''}
// //   );

// // };

// // export default ItemDrop;



// // const {currentChar} = useContext(UserContext);
// // const handleClick = async () => {
// //   try {
// //     await axios.put(`/location/drop_item_slot/${currentChar.location}`, { drop_item_slot: itemId });
// //     await axios.patch(`/character/update/${currentChar._id}`, {[`slot${itemSlot}`]: null});
// //   } catch (err) {
// //     console.error('Error updating location in handleClick--src/client/component/menu/ItemDrop.tsx: ', err);
// //   }
// // };

// // return <IconImg src={imageUrl || ''} onClick={handleClick} />;
