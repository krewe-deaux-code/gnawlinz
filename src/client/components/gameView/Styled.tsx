import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const Container = styled.div`
  display: grid;
  max-width: 100%;
  height: 100vh;
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
    grid-template-rows: 0.1fr 0.7fr .3fr;
    grid-template-areas:
      "nav"
      "main"
      "footer";
  }
  color: white;
  background-color: #1f2128;
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

export const Content1 = styled.div`
  background: #4f004f;
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

export const CharImageStyles = styled.img`
object-fit: contain;
padding: auto;
height: auto;
width: auto;
max-height: 276px;
max-width: 183px;
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
  padding: 3px;
  text-align: center;
`;

export const IconImg = styled.img`
  cursor: pointer;
  padding: auto;
  width: auto;
  height: auto;
  max-width: 2em;
  max-height: 2em;
  margin-left: auto;
  margin-right: auto;
`;
export const StatBonusColor = styled.div`
color: #2e8351;
`;

export const TempStatBonusColor = styled.div`
color: #9a8127;
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

export const InventoryTextBubble = styled.div`
position: absolute;
bottom: 5rem;
padding: 5px;
font-size: 1rem;
color: black;
background-color: #fff;
border: 1px solid #ccc;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
white-space: nowrap;
`;



export const TopContent1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;

export const TopContent2 = styled(TopContent1)``;


export const HudButton = styled.button`
  font-size: 1.5em;
  background-color: black;
  color: white;
  padding: auto;
`;

export const EventText = styled.div`
  z-index: 3;
  background-color: rgb(92 92 92 / 65%);
  backdrop-filter: blur(4px);
  color: white;
  padding: .4em;
  margin: auto;
  text-align: center;
  border: 1px solid;
  border-radius: 5px;
  position: absolute;
  height: 28%;
  width: 42%;
  top: 69%;
  left: 29%;
  overflow: auto;
  ${props => (props.show ? '' : 'visibility: hidden')}
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
  /* z-index: 2; */
  height: 100%;
  width: 100%;
  max-width: 500px;
  max-height: 502px;
  position: absolute;
  top: 0%;
  right: 30%;
`;

export const KillFeedContainer = styled.div`
  z-index: 2;
  max-width: 250px;
  max-height: 350px;
  color: #22f122;
  /* margin-bottom: 1px; */
  margin-left: 3rem;
  position: relative;
  top: 100%;
  left: 100%;
  font-size: 12px;
`;

export const KillFeed = styled.div`
  z-index: 2;
  max-width: 250px;
  max-height: 28px;
  color: #22f122;
  /* margin-bottom: 1px; */
  /* margin-left: 3rem; */
  position: relative;
  /* top: 100%; */
  /* left: 100%; */
  font-size: 11px;
`;

export const ModalBodyContainer = styled.div`
  grid-template-rows: auto auto auto;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 0.25rem;
  align-content: space-evenly;
`;

export const StyledModal = styled(Modal)`
  --bs-modal-bg: silver !important;
  backdrop-filter: blur(4px);
`;

export const Page = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const size = 7;

export const ArcadeButton = styled.button`
  position: relative;
  display: inline-block;
  width: ${size}rem;
  height: ${size}rem;
  border: 0;
  margin: 1em;
  outline: none;
  background-color: #c2290a;
  border-radius: 50%;
  cursor: pointer;
  transition: box-shadow 200ms;
  box-shadow: 0 .5rem .5rem #000000, inset 0 ${size / 24}rem 0 #da2e0b, inset 0 -${size / 24}rem ${size / 60}rem #aa2409, 0 0 ${size / 60}rem #c2290a, inset 0 0 ${size / 30}rem #791a06, inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5), inset 0 0 ${size / 60}rem ${size / 12}rem #c2290a, inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7), inset 0 0 ${size / 60}rem ${size / 10}rem #611405, inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7), inset 0 0 ${size / 120}rem ${size / 9.2}rem black, inset 0 0 ${size / 120}rem ${size / 8}rem rgba(247, 133, 110, 0.7), inset 0 ${size / 20}rem 0 ${size / 8.5}rem rgba(244, 71, 37, 0.7), inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.5}rem rgba(145, 31, 8, 0.2), inset 0 0 0 ${size / 5.5}rem #c2290a, inset 0 ${size / 2.5}rem ${size / 7.5}rem #aa2409, inset 0 0 ${size / 10}rem ${size / 6}rem #911f08, 0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);

  &:active {
    box-shadow: 0 .5rem .5rem #000000, inset 0 ${size / 24}rem 0 #da2e0b, inset 0 -${size / 24}rem ${size / 60}rem #aa2409, 0 0 ${size / 60}rem #c2290a, inset 0 0 ${size / 30}rem #791a06, inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5), inset 0 0 ${size / 60}rem ${size / 12}rem #c2290a, inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7), inset 0 0 ${size / 60}rem ${size / 10}rem #611405, inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7), inset 0 0 ${size / 40}rem ${size / 8.5}rem black, inset 0 0 ${size / 120}rem ${size / 7.5}rem rgba(247, 133, 110, 0.2), inset 0 ${size / 20}rem 0 ${size / 8.57}rem rgba(244, 71, 37, 0.5), inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.57}rem rgba(97, 20, 5, 0.2), inset 0 0 0 ${size / 5.5}rem #b32609, inset 0 ${size / 2.5}rem ${size / 7.5}rem #9b2108, inset 0 0 ${size / 10}rem ${size / 6}rem #791a06, 0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
  background-color: #b8270a;


&::before {
   opacity: 0.5;
}
  }
  &:before {
     content: "";
  position: absolute;
  bottom: ${size / 4.5}rem;
  left: ${size / 3.6}rem;
  display: block;
  width: ${size / 2.2}rem;
  height: ${size / 3.3}rem;
  background: rgba(247, 133, 110, 0.2);
  background: linear-gradient(to top, rgba(250, 173, 158, 0.3) 0%, rgba(194, 41, 10, 0.1) 100%);
  border-radius: 40% 40% 60% 60%;
  transition: opacity 200ms;
  }
`;
