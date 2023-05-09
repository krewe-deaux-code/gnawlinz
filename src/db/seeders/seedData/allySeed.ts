export type AllyDBType = {
  [key: string]: number | string;
};

export const allySeed = [
  {
    name: 'Gene Nalgene',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1677904538/gnawlinzAllies/Ally1Pxl_kjlumv.png',
    strength: 2,
    endurance: 1,
    alignment: 'Old',
    greeting: 'Hello, I\'m Gene. I will join your fight through the city!',
    departing: 'Gene groans, "I\'m too old for this nonsense." and departs.'
  },
  {
    name: 'Terry Cruz',
    image_url: 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1677903172/gnawlinzAllies/TCruzPxl_von01k.png',
    strength: 10,
    endurance: 8,
    alignment: 'Good',
    greeting: '"OOOOOOOOOLD SPICE!"',
    departing: 'Terry screams, "DOUBLE SUN POWAAAAAAA-" and then explodes.'
  }
];
