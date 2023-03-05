import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  width: 100%;
  grid-template-rows: 0.10fr .70fr 0.30fr;
  grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    "footer footer footer footer";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    grid-template-areas:
      "nav"
      "sidebar"
      "main"
      "content"
      "footer";
  }
  color: white;
  background-color: black;
  background-color: black;
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const NavBar = styled.nav`
  background: #ffb700;
  height: 100%;
  height: 100%;
  grid-area: nav;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const Main = styled.main`
  background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
  position: relative;
`;
// const SideBar = styled.div`
//   background: #9aaab7;
//   grid-area: sidebar;
//   padding: 0.25rem;
// `;


export const Content1 = styled.div`
  background: #4f004f;
  padding: 0.125rem;
  padding: 0.125rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  gap: 0.25rem;
`;

export const Content2 = styled.div`
  background: #4f004f;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 0.25rem;
  align-content: space-evenly;
  grid-template-columns: .5fr .5fr;
`;

export const Content3 = styled(Content2)``;

export const Footer = styled.footer`
  background: black;
  height: 100%;
  height: 100%;
  grid-area: footer;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  /* @media (max-width: 550px) {
    flex-direction: column;
  } */
`;
//////////////////////////////////////////////////
export const CharImageStyles = styled.img`
object-fit: contain;
padding: auto;
`;

export const TinyStatIconImg = styled(CharImageStyles)`
width: 2em;
padding-right: 0.5em;
`;


export const InventoryStyle = styled.div`
  display: grid;
  height: auto;
  width: auto;
 grid-template-areas: "item item item item item item item item";
  `;

export const InventoryBorder = styled.div`
border: .2em solid white;
justify-content: center;
border-radius: 2%;
width: 100%;
height: 100%;
grid-area: inventory;
padding: auto;
margin: auto;
`;

export const IconContainer = styled.div`
  display: grid;
  text-align: center;
  padding: auto;
  margin: auto;
  grid-template-rows: auto auto auto auto;
  justify-content: center;
  grid-gap: 1em;
  `;

export const StatIconContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 30%;
  text-align: center;
`;

export const IconImg = styled.img`
  cursor: pointer;
  padding: auto;
  width: 2em;
  height: 2em;
  margin-left: auto;
  margin-right: auto;
`;
export const StatBonusColor = styled.div`
color: #2e8351;
`;

export const CharStatusContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
  "stat stat2"
  "inventory inventory";
  width: 100%;
  height: auto;
  padding: auto;
  `;

export const StatContainer = styled.div`
display: grid;
grid-area: stat;
grid-template-rows: auto auto auto auto;
width: 100%;
height: auto;
justify-content: center;
`;

export const StatContainer2 = styled(StatContainer)`
  grid-area: stat2;
  grid-template-rows: .5fr 1fr;
`;

export const CharImageStyles = styled.img`
object-fit: contain;
padding: auto;
`;

export const TinyStatIconImg = styled(CharImageStyles)`
width: 2em;
padding-right: 0.5em;
`;


export const InventoryStyle = styled.div`
  display: grid;
  height: auto;
  width: auto;
 grid-template-areas: "item item item item item item item item";
  `;

export const InventoryBorder = styled.div`
border: .2em solid white;
justify-content: center;
border-radius: 2%;
width: 100%;
height: 100%;
grid-area: inventory;
padding: auto;
margin: auto;
`;

export const IconContainer = styled.div`
  display: grid;
  text-align: center;
  padding: auto;
  margin: auto;
  grid-template-rows: auto auto auto auto;
  justify-content: center;
  grid-gap: 1em;
  `;

export const StatIconContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  width: 30%;
  text-align: center;
`;

export const IconImg = styled.img`
  cursor: pointer;
  padding: auto;
  width: 2em;
  height: 2em;
  margin-left: auto;
  margin-right: auto;
`;
export const StatBonusColor = styled.div`
color: #2e8351;
`;

export const CharStatusContainer = styled.div`

  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-areas:
  "stat stat2"
  "inventory inventory";
  width: 100%;
  height: auto;
  padding: auto;
  `;

export const StatContainer = styled.div`
display: grid;
grid-area: stat;
grid-template-rows: auto auto auto auto;
width: 100%;
height: auto;
justify-content: center;
`;

export const StatContainer2 = styled(StatContainer)`
  grid-area: stat2;
  grid-template-rows: .5fr 1fr;
`;



export const TopContent1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;

export const TopContent2 = styled(TopContent1)``;

//export const TopContent3 = styled(TopContent1)``;

export const HudButton = styled.button`
  font-size: 1.5em;
  background-color: black;
  color: white;
  padding: auto;
  padding: auto;
`;

export const EventText = styled.div`
  z-index: 3;
  background-color: #808080a6;
  color: white;
  padding: .4em;
  margin: auto;
  text-align: center;
  border: 1px solid;
  position: absolute;
  height: 25%;
  width: 50%;
  top: 72%;
  left: 25%;
  overflow: auto;
`;

export const ScrollableContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
    &::-webkit-scrollbar {
        /* height: 10px; */
        width: 10px;
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
    background-color: #f0ac00;
    border-radius: 5px;
    background-size: 100%;

  }
`;

export const AllyImg = styled.img`
  z-index: 2;
  height: 83%;
  width: 50%;
  max-width: 200px;
  max-height: 202px;
  position: absolute;
  top: 52%;
  right: 32%;
`;

export const EnemyImg = styled.img`
  z-index: 2;
  height: 100%;
  width: 100%;
  max-width: 500px;
  max-height: 502px;
  position: absolute;
  top: 0%;
  right: 30%;
`;
