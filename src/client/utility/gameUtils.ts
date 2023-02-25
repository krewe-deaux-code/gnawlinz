
export const statCheck = (stat: number) => {
  const npcRoll = Math.floor(Math.random() * 10) + 1;
  const weight = 1;
  if (stat > npcRoll * weight) {
    return 'success';
  } else {
    return 'failure';
  }
};
