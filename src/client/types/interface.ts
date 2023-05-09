export interface CharacterType {
  _id: number;
  handle_id: number;
  name: string;
  image_url: string;
  inventory: Array<number>;
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
