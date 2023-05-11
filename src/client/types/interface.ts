import React from 'react';

export interface CharacterType {
  _id: number;
  handle_id: number | string;
  name: string;
  image_url: string;
  inventory: Array<number> | undefined;
  health: number;
  strength: number;
  endurance: number;
  mood: number;
  location: number;
  ally_count: number;
  score: number;
}

export interface EventType {
  _id: number;
  initial_text: string;
  choice0: number;
  choice1: number;
  choice2: number;
  choice3: number;
  enemy_effect: boolean;
  ally_effect: boolean;
  item_effect: boolean;
}

export interface ChoiceType {
  _id: number;
  flavor_text: string;
  success: string;
  failure: string;
  alignment0: string;
  alignment1: string;
  alignment2: string;
}

export interface LocationType {
  _id: number;
  name: string;
  image_url: string;
  random_item_spot1: string;
  random_item_spot2: string;
  drop_item_slot: number;
  graffiti: string;
  graffiti_msgs: Array<string>


}

export interface EnemyType {
  _id: number;
  name: string;
  image_url: string;
  weapon1: string;
  strength: number;
  health: number;
  score: number;
  initial_text: string;
  victory: string;
  defeat: string;
  contact: string;
}

export interface ItemType {
  _id: number;
  name: string;
  image_url: string;
  consumable: boolean;
  modified_stat0: string;
  modified_stat1: string;
  modifier0: number;
  modifier1: number;
  buy_price: number;
  sell_price: number;
}

export interface AllyType {
  _id: number;
  name: string;
  image_url: string;
  strength: number;
  endurance: number;
  alignment: string;
  greeting: string;
  departing: string;
}

export interface GameViewProps {
  handleSpeak: (e) => void;
}

export interface LeaderType {
  name: string;
  score: number;
  image_url: string;
  health: number;
  mood: number;
  strength: number;
}

export interface BossType {
  _id: number;
  initial_text: string;
  name: string;
  image_url: string;
  weapon1: string;
  strength: number;
  health: number;
  location: number;
  score: number;
  event: number;
  victory: string;
  defeat: string;
  contact: string;
}

export interface UserType {
  handle_id: number
  user_id: number;
  google_id: string;
  google_avatar: string;
  name: string;
  session_id: string;
}

export interface SettingsContextType {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isSpeakingEnabled: boolean;
  setIsSpeakingEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StateChoices {
  engage: number;
  evade: number;
  evacuate: number;
  wildcard: number;
}

export interface MenuContextType {
  hideStartButton: boolean;
  setHideStartButton: React.Dispatch<React.SetStateAction<boolean>>;
  startFail: boolean;
  setStartFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserContextType {
  metAllyArr: number[];
  setMetAllyArr: React.Dispatch<React.SetStateAction<number[]>>;
  currentAlly: object | AllyType;
  setCurrentAlly: React.Dispatch<React.SetStateAction<AllyType>>;
  currentEnemy: EnemyType;
  setCurrentEnemy: React.Dispatch<React.SetStateAction<EnemyType>>;
  prevEventId: number;
  setPrevEventId: React.Dispatch<React.SetStateAction<number>>;
  visited: LocationType[];
  setVisited: React.Dispatch<React.SetStateAction<LocationType[]>>;
  allLocations: LocationType[];
  setAllLocations: React.Dispatch<React.SetStateAction<LocationType[]>>;
  location: LocationType
  setLocation: React.Dispatch<React.SetStateAction<LocationType>>;
  activeUser: UserType;
  setActiveUser: React.Dispatch<React.SetStateAction<UserType>>;
  stateSession: string;
  setStateSession: React.Dispatch<React.SetStateAction<string>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  userChars: CharacterType[];
  setUserChars: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  currentChar: CharacterType;
  setCurrentChar: React.Dispatch<React.SetStateAction<CharacterType>>;
  event: EventType;
  setEvent: React.Dispatch<React.SetStateAction<EventType>>;
  selectedChoice: ChoiceType;
  setSelectedChoice: React.Dispatch<React.SetStateAction<ChoiceType>>;
  choices: StateChoices;
  setChoices: React.Dispatch<React.SetStateAction<StateChoices>>;
  outcome: string;
  setOutcome: React.Dispatch<React.SetStateAction<string>>;
  investigateDisabled: boolean;
  setInvestigateDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  tagDisabled: boolean;
  setTagDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  fetchedInventory: ItemType[];
  setFetchedInventory: React.Dispatch<React.SetStateAction<ItemType[]>>;
  startFail: boolean;
  setStartFail: React.Dispatch<React.SetStateAction<boolean>>;
}

// export interface PassportProfile {
//   id: string;
//   displayName: string;
//   name: { familyName: 'Williams', givenName: 'Colin' },
//   emails: [ { value: 'colin.williams.dev@gmail.com', verified: true } ],
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/AGNmyxZVr8rAsrYj51MXgpEh6mwGx2gs06aEupYnjrvM=s96-c'
//     }
//   ],
//   provider: 'google',
//   _raw: '{\n' +
//     '  "sub": "117796458228181967492",\n' +
//     '  "name": "Colin Williams",\n' +
//     '  "given_name": "Colin",\n' +
//     '  "family_name": "Williams",\n' +
//     '  "picture": "https://lh3.googleusercontent.com/a/AGNmyxZVr8rAsrYj51MXgpEh6mwGx2gs06aEupYnjrvM\\u003ds96-c",\n' +
//     '  "email": "colin.williams.dev@gmail.com",\n' +
//     '  "email_verified": true,\n' +
//     '  "locale": "en"\n' +
//     '}',
//   _json: {
//     sub: '117796458228181967492',
//     name: 'Colin Williams',
//     given_name: 'Colin',
//     family_name: 'Williams',
//     picture: 'https://lh3.googleusercontent.com/a/AGNmyxZVr8rAsrYj51MXgpEh6mwGx2gs06aEupYnjrvM=s96-c',
//     email: 'colin.williams.dev@gmail.com',
//     email_verified: true,
//     locale: 'en'
//   }
// }

export interface PassportName {
  familyName: string;
  givenName: string;
}

export interface PassportPhoto {
  value: string;
}

export interface PassportEmail {
  value: string;
  verified: boolean;
}

export interface PassportProfile {
  [key: string]: string | boolean | PassportName | PassportEmail[] | PassportPhoto[];
}

export interface PassportUser {
  provider: string;
  id: string;
  displayName: string;
}
