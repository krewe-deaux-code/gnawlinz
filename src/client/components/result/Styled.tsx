import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-rows: 0.05fr 0.95fr;
  grid-template-areas:
    "nav nav"
    "end  story";
  text-align: center;
  grid-gap: 0.25rem;
  grid-template-columns: .5fr .5fr;
  transition: all 0.25s ease-in-out;
  color: white;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 0.4fr 0.4fr;
    grid-template-areas:
      "nav"
      "end"
      "story";
  }
`;

export const NavBar = styled.nav`
  grid-area: nav;
  padding: 0.25rem;
  background: #ffb700;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
export const Story = styled.main`
  background: #9aaab7;
  color: white;
  grid-area: story;
  padding: 0.25rem;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  justify-content: center;
  overflow: auto;
`;
export const End = styled.div`
  background: #9aaab7;
  grid-area: end;
  padding: 0.25rem;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  justify-content: center;
  overflow: auto;
`;

export const ResultButton = styled.button`
 font-size: 1.5em;
 background-color: black;
 color: white;
 padding: .25rem;
`;

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
  grid-template-columns: .5fr .5fr;
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
    background-color: black;
    /* border-radius: 5px; */
    /* background-size: 100%; */
    background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679503005/Zombie_Face_2_hfbuak.png') no-repeat;
    background-size: 30px 50px;

  }
`;

// LeaderBoard
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Th = styled.th`
  background-color: black;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;
