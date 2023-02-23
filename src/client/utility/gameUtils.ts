
export const statCheck = (stat: number) => {
  let npcRoll = Math.floor(Math.random() * 10) + 1;
  let weight = 1;
  if (stat > npcRoll * weight) {
    return 'success';
  } else {
    return 'failure';
  }
};
