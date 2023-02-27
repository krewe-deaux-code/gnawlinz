import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.1fr 1fr;
  grid-template-areas:
    "nav nav"
    "end  story";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  grid-template-columns: .5fr .5fr;
  color: white;
`;

export const NavBar = styled.nav`
  background: #3a3a55;
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
    border-radius: 5px;
    /* background-size: 100%; */
    background: url('https://toppng.com/uploads/preview/zombie-pixel-art-zombie-hand-pixel-art-115630797224fcuwmxj8h.png') no-repeat;
    background-size: 30px 50px;

  }
`;
