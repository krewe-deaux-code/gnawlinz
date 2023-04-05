import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 80vh;
  grid-template-rows: 1fr;
  grid-template-areas:
    'end  story';
  text-align: center;
  grid-gap: 0.25rem;
  grid-template-columns: 0.5fr 0.5fr;
  transition: all 0.25s ease-in-out;
  color: white;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.5fr 0.5fr;
    grid-template-areas:
      'end'
      'story';
  }
`;

export const NavBar = styled.nav`
  padding: 0.25rem;
  width: 100%;
  height: 20%;
  background: #ffb700;
`;
export const Story = styled.main`
  background: rgba(173, 173, 173, 0.4);
  backdrop-filter: blur(15px);
  color: white;
  grid-area: story;
  padding: 0.25rem;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  justify-content: center;
  overflow: auto;
  background-image: url('https://www.transparenttextures.com/patterns/concrete-wall.png');
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;
  border-right: 3px solid silver;
  margin-right: 10rem;
  margin-top: 3rem;
`;
export const End = styled.div`
  background: rgba(173, 173, 173, 0.4);
  backdrop-filter: blur(15px);
  grid-area: end;
  padding: 0.25rem;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  justify-content: center;
  overflow: auto;
  background-image: url('https://www.transparenttextures.com/patterns/concrete-wall.png');
  border-bottom-left-radius: 9px;
  border-top-left-radius: 9px;
  border-left: 3px solid silver;
  margin-left: 10rem;
  margin-top: 3rem;
`;

// export const ResultButton = styled.button`
//  font-size: 1.5em;
//  background-color: black;
//  color: white;
//  padding: .25rem;
// `;

export const Content1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto;
`;

export const CharacterStatContainer = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-evenly;
  grid-template-columns: 0.5fr 0.5fr;
`;

export const LeaderBoardTrophy = styled(CharacterStatContainer)``;

export const StatContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  width: 100%;
  height: 100%;
  align-content: space-evenly;
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  &::-webkit-scrollbar {
    /* height: 10px; */
    width: 30px;
    border: 1px solid black;
    border-radius: 5px;
  }
  /* Set the background color of the scrollbar */
  &&::-webkit-scrollbar-track {
    background: black;
    border-radius: 5px;
  }

  /* Set the color and shape of the scrollbar thumb */
  &&::-webkit-scrollbar-thumb {
    background-color: #010101;
    /* border-radius: 5px; */
    /* background-size: 100%; */
    background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679503005/Zombie_Face_2_hfbuak.png')
      no-repeat;
    background-position: center center;
    background-size: 30px 50px;
    box-shadow: 0 0 2px 0px white inset;
    border: 1px solid transparent;
    border-radius: 6px;
    transition: 200ms;
    :hover {
      background-color: #191919;
      box-shadow: 0 0 2px 1px white inset;
    }
    :active {
      background-color: #111111;
      box-shadow: 0 0 1px 2px #cccccc inset;
    }
  }
`;

// LeaderBoard
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 2px solid silver;
`;

export const Th = styled.th`
  background-color: black;
  border: 1px solid silver;
  padding: 8px;
  text-align: center;
`;

export const Td = styled.td`
  border: 1px solid silver;
  padding: 8px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;

export const StoryItemCard = styled.div`
  margin: 10px;
  position: relative;
  z-index: 1;

  border: 1px solid silver;
  padding: 10px;
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #9400d30a; // <--
  overflow: hidden;
  ::before {
    z-index: -1;
    position: absolute;
    content: '';
    inset: 0;
    background-image: url('http://www.transparenttextures.com/patterns/bo-play.png');
    filter: blur(4px);
  }
  :first-of-type {
    border-radius: 0.5rem 0.5rem 0 0;
    background: linear-gradient(0deg, #9400d30a 0%, #9400d345 100%);
  }
  :last-of-type {
    border-radius: 0 0 0.5rem 0.5rem;
    background: linear-gradient(180deg, #9400d30a 0%, #9400d344 100%);
  }
  :only-child {
    background: linear-gradient(0deg, #9400d30a 0%, #9400d345 100%);
    border-radius: 0.5rem;
  }
`;
