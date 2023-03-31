import styled, { keyframes } from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const Container = styled.div`
  display: grid;
  max-width: 100%;
  height: 100vh;
  grid-template-rows: 0.1fr 0.7fr 0.3fr;
  grid-template-areas:
    'nav nav nav nav'
    'main main main main'
    'footer footer footer footer';
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.1fr 0.7fr 0.3fr;
    grid-template-areas:
      'nav'
      'main'
      'footer';
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

export const flicker = keyframes`
  0% {
  opacity: 0.27861;
  }
  5% {
  opacity: 0.34769;
  }
  10% {
  opacity: 0.23604;
  }
  15% {
  opacity: 0.90626;
  }
  20% {
  opacity: 0.18128;
  }
  25% {
  opacity: 0.83891;
  }
  30% {
  opacity: 0.65583;
  }
  35% {
  opacity: 0.67807;
  }
  40% {
  opacity: 0.26559;
  }
  45% {
  opacity: 0.84693;
  }
  50% {
  opacity: 0.96019;
  }
  55% {
  opacity: 0.08594;
  }
  60% {
  opacity: 0.20313;
  }
  65% {
  opacity: 0.71988;
  }
  70% {
  opacity: 0.53455;
  }
  75% {
  opacity: 0.37288;
  }
  80% {
  opacity: 0.71428;
  }
  85% {
  opacity: 0.70419;
  }
  90% {
  opacity: 0.7003;
  }
  95% {
  opacity: 0.36108;
  }
  100% {
  opacity: 0.24387;
  }
`;

export const Main = styled.main`
  background: #1f2128;
  color: white;
  filter: ${(props) => (props.blur ? 'blur(4px)' : 'none')};
  mask: ${(props) =>
    props.linearGradient ? 'radial-gradient(transparent, black 60%)' : 'none'};
  grid-area: main;
  padding: 0.25rem;
  position: relative;
  background-image: radial-gradient(#717171, #111);
  border-radius: 2.6rem;
  box-shadow: inset 0 0 30rem black, inset 0 0 30rem black,
    0 0 2rem -10px #ffffff;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    border-radius: 2.6rem;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 4;
    background-size: 100% 3.4px, 5.1px 100%;
    pointer-events: none;
  }
  &:after {
    content: ' ';
    display: block;
    position: absolute;
    border-radius: 2.6rem;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 4;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }
`;

// export const CharacterDisplayDiv = styled(Main).div`

// `;

export const Content1 = styled.div`
  background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679955903/gnawlinzIcons/purple_cross_stripes_vtgu6o.png');
  padding: 0.125rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-evenly;
  grid-template-rows: auto auto auto;
  gap: 0.25rem;
`;

export const Content2 = styled.div`
  /* background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679600452/gnawlinzIcons/dark-wood-1920x1080_cwlol9.png'); */
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-around;
  grid-template-columns: auto auto;
`;

export const Content3 = styled(Content2)`
  background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679955903/gnawlinzIcons/purple_cross_stripes_vtgu6o.png');
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  align-content: space-around;
  grid-template-columns: auto auto;
`;

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
  justify-content: stretch;
  align-items: center;
  grid-template-areas: 'item item item item item item item item';
`;

export const InventoryBorder = styled.div`
  border: 0.2em solid white;
  justify-content: center;
  border-radius: 10px;
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
  grid-template-columns: 1.6rem 1.6rem 2rem auto;
  width: 30%;
  padding: 3px;
  text-align: center;
`;

export const IconImg = styled.img`
  cursor: pointer;
  padding: auto;
  width: auto;
  height: auto;
  max-width: 4em;
  max-height: 4em;
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
    'stat stat2'
    'inventory inventory';
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
  grid-template-rows: 0.5fr 1fr;
`;

export const InventoryTextBubble = styled.div`
  position: absolute;
  z-index: 4;
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
  padding: 0.4em;
  margin: auto;
  text-align: center;
  border: 1px solid;
  border-radius: 5px;
  position: absolute;
  height: 38%;
  width: 42%;
  top: 60%;
  left: 29%;
  overflow: auto;
  ${(props) => (props.show ? '' : 'visibility: hidden')}
`;

export const ScrollableContainer = styled.div`
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
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
  z-index: 1;
  height: 83%;
  width: 50%;
  max-width: 200px;
  max-height: 202px;
  position: absolute;
  top: 52%;
  right: 32%;
`;

export const EnemyImg = styled.img`
  z-index: 1;
  height: 100%;
  width: 100%;
  max-width: 500px;
  max-height: 502px;
  position: absolute;
  top: 0%;
  right: 30%;
`;

export const LocationDiv = styled.div`
  position: relative;
  margin-top: 10rem;
`;
export const LocationImg = styled.img`
  height: 625px;
  width: 901px;
  border: 3px double;
  border-radius: 5px;
`;

export const KillFeedContainer = styled.div`
  z-index: 2;
  max-width: 250px;
  max-height: 465px;
  color: rgb(34, 241, 34);
  margin-left: 3rem;
  position: relative;
  left: 100%;
  font-size: 12px;
  height: 465px;
  overflow-y: auto;
  bottom: 30%;
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
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  max-height: 510.5px;
`;

const size = 8;

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
  box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #da2e0b,
    inset 0 -${size / 24}rem ${size / 60}rem #aa2409,
    0 0 ${size / 60}rem #c2290a, inset 0 0 ${size / 30}rem #791a06,
    inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
    inset 0 0 ${size / 60}rem ${size / 12}rem #c2290a,
    inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 60}rem ${size / 10}rem #611405,
    inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 120}rem ${size / 9.2}rem black,
    inset 0 0 ${size / 120}rem ${size / 8}rem rgba(247, 133, 110, 0.7),
    inset 0 ${size / 20}rem 0 ${size / 8.5}rem rgba(244, 71, 37, 0.7),
    inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.5}rem rgba(145, 31, 8, 0.2),
    inset 0 0 0 ${size / 5.5}rem #c2290a,
    inset 0 ${size / 2.5}rem ${size / 7.5}rem #aa2409,
    inset 0 0 ${size / 10}rem ${size / 6}rem #911f08,
    0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);

  &:active {
    box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #da2e0b,
      inset 0 -${size / 24}rem ${size / 60}rem #aa2409,
      0 0 ${size / 60}rem #c2290a, inset 0 0 ${size / 30}rem #791a06,
      inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
      inset 0 0 ${size / 60}rem ${size / 12}rem #c2290a,
      inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 60}rem ${size / 10}rem #611405,
      inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 40}rem ${size / 8.5}rem black,
      inset 0 0 ${size / 120}rem ${size / 7.5}rem rgba(247, 133, 110, 0.2),
      inset 0 ${size / 20}rem 0 ${size / 8.57}rem rgba(244, 71, 37, 0.5),
      inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.57}rem rgba(97, 20, 5, 0.2),
      inset 0 0 0 ${size / 5.5}rem #b32609,
      inset 0 ${size / 2.5}rem ${size / 7.5}rem #9b2108,
      inset 0 0 ${size / 10}rem ${size / 6}rem #791a06,
      0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
    background-color: #b8270a;

    &::before {
      opacity: 0.5;
    }
  }
  &:before {
    content: '';
    position: absolute;
    bottom: ${size / 4.5}rem;
    left: ${size / 3.6}rem;
    display: block;
    width: ${size / 2.2}rem;
    height: ${size / 3.3}rem;
    background: rgba(247, 133, 110, 0.2);
    background: linear-gradient(
      to top,
      rgba(250, 173, 158, 0.3) 0%,
      rgba(194, 41, 10, 0.1) 100%
    );
    border-radius: 40% 40% 60% 60%;
    transition: opacity 200ms;
  }
`;

export const ArcadeButtonInvestigate = styled(ArcadeButton)`
  background-color: #1a0ac2;
  box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #1d0bda,
    inset 0 -${size / 24}rem ${size / 60}rem #1609aa,
    0 0 ${size / 60}rem #1a0ac2, inset 0 0 ${size / 30}rem #100679,
    inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
    inset 0 0 ${size / 60}rem ${size / 12}rem #1a0ac2,
    inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 60}rem ${size / 10}rem #0d0561,
    inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 120}rem ${size / 9.2}rem black,
    inset 0 0 ${size / 120}rem ${size / 8}rem rgba(121, 110, 247, 0.7),
    inset 0 ${size / 20}rem 0 ${size / 8.5}rem rgba(54, 37, 244, 0.7),
    inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.5}rem rgba(19, 8, 145, 0.2),
    inset 0 0 0 ${size / 5.5}rem #1a0ac2,
    inset 0 ${size / 2.5}rem ${size / 7.5}rem #1609aa,
    inset 0 0 ${size / 10}rem ${size / 6}rem #130891,
    0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
  &:active {
    box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #1d0bda,
      inset 0 -${size / 24}rem ${size / 60}rem #1609aa,
      0 0 ${size / 60}rem #1a0ac2, inset 0 0 ${size / 30}rem #100679,
      inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
      inset 0 0 ${size / 60}rem ${size / 12}rem #1a0ac2,
      inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 60}rem ${size / 10}rem #0d0561,
      inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 40}rem ${size / 8.5}rem black,
      inset 0 0 ${size / 120}rem ${size / 7.5}rem rgba(121, 110, 247, 0.2),
      inset 0 ${size / 20}rem 0 ${size / 8.57}rem rgba(54, 37, 244, 0.5),
      inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.57}rem rgba(13, 5, 97, 0.2),
      inset 0 0 0 ${size / 5.5}rem #1809b3,
      inset 0 ${size / 2.5}rem ${size / 7.5}rem #14089b,
      inset 0 0 ${size / 10}rem ${size / 6}rem #100679,
      0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
    background-color: #180ab8;
  }
  &:before {
    background: rgba(121, 110, 247, 0.2);
    background: linear-gradient(
      to top,
      rgba(166, 158, 250, 0.3) 0%,
      rgba(26, 10, 194, 0.1) 100%
    );
  }
`;

export const ArcadeButtonToggle = styled(ArcadeButton)`
  background-color: #c2c20a;
  box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #dada0b,
    inset 0 -${size / 24}rem ${size / 60}rem #aaaa09,
    0 0 ${size / 60}rem #c2c20a, inset 0 0 ${size / 30}rem #797906,
    inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
    inset 0 0 ${size / 60}rem ${size / 12}rem #c2c20a,
    inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 60}rem ${size / 10}rem #616105,
    inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
    inset 0 0 ${size / 120}rem ${size / 9.2}rem black,
    inset 0 0 ${size / 120}rem ${size / 8}rem rgba(247, 247, 110, 0.7),
    inset 0 ${size / 20}rem 0 ${size / 8.5}rem rgba(244, 244, 37, 0.7),
    inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.5}rem rgba(145, 145, 8, 0.2),
    inset 0 0 0 ${size / 5.5}rem #c2c20a,
    inset 0 ${size / 2.5}rem ${size / 7.5}rem #aaaa09,
    inset 0 0 ${size / 10}rem ${size / 6}rem #919108,
    0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
  &:active {
    box-shadow: 0 0.5rem 0.5rem #000000, inset 0 ${size / 24}rem 0 #dada0b,
      inset 0 -${size / 24}rem ${size / 60}rem #aaaa09,
      0 0 ${size / 60}rem #c2c20a, inset 0 0 ${size / 30}rem #797906,
      inset 0 0 ${size / 30}rem rgba(51, 51, 51, 0.5),
      inset 0 0 ${size / 60}rem ${size / 12}rem #c2c20a,
      inset 0 -${size / 30}rem ${size / 40}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 60}rem ${size / 10}rem #616105,
      inset 0 0 ${size / 60}rem ${size / 10}rem rgba(51, 51, 51, 0.7),
      inset 0 0 ${size / 40}rem ${size / 8.5}rem black,
      inset 0 0 ${size / 120}rem ${size / 7.5}rem rgba(247, 247, 110, 0.2),
      inset 0 ${size / 20}rem 0 ${size / 8.57}rem rgba(244, 244, 37, 0.5),
      inset 0 -${size / 20}rem ${size / 60}rem ${size / 8.57}rem rgba(97, 97, 5, 0.2),
      inset 0 0 0 ${size / 5.5}rem #b3b309,
      inset 0 ${size / 2.5}rem ${size / 7.5}rem #9b9b08,
      inset 0 0 ${size / 10}rem ${size / 6}rem #797906,
      0 ${size / 40}rem ${size / 20}rem rgba(0, 0, 0, 0.5);
    background-color: #b8b80a;
  }
  &:before {
    background: rgba(247, 247, 110, 0.2);
    background: linear-gradient(
      to top,
      rgba(250, 250, 158, 0.3) 0%,
      rgba(194, 194, 10, 0.1) 100%
    );
  }
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const OverlayValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: 'white';
  font-size: 0.8rem;
`;

export const IntroModal = styled(Modal)``;

export const ModalStyle = styled.div`
  position: relative;
  border-radius: 0.5rem;
  &:before {
    content: ' ';
    display: block;
    position: absolute;
    border-radius: 0.5rem;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 4;
    background-size: 100% 3.4px, 5.1px 100%;
    pointer-events: none;
  }
  &:after {
    content: ' ';
    display: block;
    position: absolute;
    border-radius: 0.5rem;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 4;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }
`;
