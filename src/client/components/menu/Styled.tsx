import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';

export const ArcadeBackground = styled.div`
  width: 100%;
  height: calc(100vh - 767.33px);
  border-radius: 1rem 1rem 0 0;
  /* background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679955903/gnawlinzIcons/purple_cross_stripes_vtgu6o.png'); */
`;

export const MenuButton = styled.button`
  background-color: #931a03;
  color: white !important;
  font-family: 'Edit Undo BRK', sans-serif;
  font-size: 1rem;
  padding: 1rem 1rem;
  border-radius: 2em;
  cursor: pointer;
  transition: 0.1s ease;
  border-width: 0;
  box-shadow: 1px 5px 0 0 #60180e;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 9px 0 0 #60180e;
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 0 0 #60180e;
  }
`;

export const CCStartButton = styled.button`
  background-color: #931a03;
  min-width: 95px;
  min-height: 45px;
  color: white !important;
  font-family: 'Edit Undo BRK', sans-serif;
  font-size: 1rem;
  padding: 10px;
  border-radius: 2em;
  cursor: pointer;
  transition: 0.1s ease;
  border-width: 0;
  box-shadow: 1px 5px 0 0 #60180e;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 9px 0 0 #60180e;
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 0 0 #60180e;
  }
`;

export const SelectStartButton = styled.button`
  background-color: #931a03;
  margin-top: 0.75rem; /* <-- new --> */
  color: white !important;
  font-family: 'Edit Undo BRK', sans-serif;
  font-size: 1rem;
  padding: 1rem 1rem;
  border-radius: 2em;
  cursor: pointer;
  transition: 0.1s ease;
  border-width: 0;
  box-shadow: 1px 5px 0 0 #60180e;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 1px 9px 0 0 #60180e;
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 0 0 #60180e;
  }
`;

export const StatName = styled.h5`
  /* display: grid; */
  font-size: 1.5em;
  color: white;
  text-align: center;
`;

export const HStatName = styled.h5`
  display: grid;
  align-items: center;
  justify-items: start;
  justify-content: space-around;
  grid-template-columns: 122px 40px 50px 50px;
`;

export const SStatName = styled.h5`
  display: grid;
  align-items: center;
  justify-items: start;
  justify-content: space-around;
  grid-template-columns: 125px 37px 50px 50px;
`;

export const EStatName = styled.h5`
  display: grid;
  align-items: center;
  justify-items: start;
  justify-content: space-around;
  grid-template-columns: 125px 37px 50px 50px;
`;

export const MStatName = styled.h5`
  display: grid;
  align-items: center;
  justify-items: start;
  justify-content: space-around;
  grid-template-columns: 125px 37px 50px 23px;
`;

export const CCStatName = styled.div`
  /* display: grid; */
  font-size: 1.5em;
  color: white;
  text-align: center;
`;

export const NameBox = styled.h5`
  margin-top: 1rem;
  display: grid;
  font-size: 1.5em;
  color: white;
  text-align: center;
`;

export const SaveBox = styled.div`
  margin-left: 5rem;
  top: 2.7rem;
  position: relative;
  display: grid;
`;

export const IconContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  grid-gap: 1em;
  align-items: center;
`;

export const IconContainerInner = styled.div`
  display: grid;
  grid-template-columns: 3rem 3rem 3rem;
  -webkit-box-pack: center;
  justify-content: space-evenly;
  gap: 1em;
  -webkit-box-align: center;
  align-items: center;
`;

export const IconContainerOuter = styled.div`
  display: grid;
  grid-template-columns: 24rem;
  -webkit-box-pack: center;
  justify-content: center;
  gap: 1em;
  -webkit-box-align: center;
  align-items: center;
  justify-items: center;
`;

export const StatIconContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  grid-gap: 1em;
  align-items: center;
`;

export const CCStatIconContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  -webkit-box-pack: center;
  gap: 1em;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
`;

export const IconImg = styled.img`
  cursor: pointer;
  padding: 5px;
  width: 4em;
`;

export const Body = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  background-color: rgb(31, 33, 40); /* changed from black */
  color: white;
  height: 100vh;
`;

export const InfoContainer = styled.div`
  overflow: hidden;
  background: rgb(31, 33, 40); /* changed from black */
  height: 3em;
`;

export const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 33.2%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${(props) => (props.active ? '1px solid black' : '')};
  border-bottom: ${(props) => (props.active ? 'none' : '')};
  background-color: ${(props) => (props.active ? 'gray' : 'lightgray')};
  height: ${(props) => (props.active ? '3em' : '2.6em; top:.4em')};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

export const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')}
`;

export const StyledCarousel = styled(Carousel)`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    position: relative;
    border-radius: 2em;
    border-width: 0.3rem;
    box-shadow: 2px 3px 4px 2px #000000;
    background-color: #da0101 !important;
    z-index: 1 !important;
  }
  .carousel-control-next,
  .carousel-control-prev {
    width: 2%;
    height: 5%;
    margin-right: 35%;
    margin-left: 35%;
    top: 20rem;
  }
  .carousel-control-prev:hover,
  .carousel-control-next:hover,
  .carousel-control-prev:focus,
  .carousel-control-next:focus {
    background-color: none !important;
    outline: none; // remove default outline on focus
  }
  .carousel-control-prev:active,
  .carousel-control-next:active {
    background-color: none !important;
    outline: none; // remove default outline on click
    box-shadow: none; // remove default box-shadow on click
  }
`;

export const HairCarousel = styled(Carousel)`
  position: absolute !important;
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    border-radius: 2em;
    position: relative;
    border-width: 0.3rem;
    box-shadow: 3px 4px 3px 0px #3b3b3b;
    background-color: #940000b9 !important;
    z-index: 1 !important;
  }
  .carousel-control-next,
  .carousel-control-prev {
    border-radius: 2em;
    position: absolute;
    top: 80px;
    height: 32px;
  }
`;

export const FaceCarousel = styled(Carousel)`
  position: absolute !important;
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    border-radius: 2em;
    position: relative;
    border-width: 0.3rem;
    box-shadow: 3px 4px 3px 0px #3b3b3b;
    background-color: #940000b9 !important;
    z-index: 1 !important;
  }
  .carousel-control-next,
  .carousel-control-prev {
    position: absolute;
    top: 170px;
    height: 32px;
  }
`;

export const BodyCarousel = styled(Carousel)`
  position: absolute !important;
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    border-radius: 2em;
    position: absolute;
    border-width: 0.3rem;
    box-shadow: 3px 4px 3px 0px #3b3b3b;
    background-color: #940000b9 !important;
    z-index: 1 !important;
  }
  .carousel-control-next,
  .carousel-control-prev {
    position: absolute;
    top: 260px;
    height: 32px;
  }
`;

export const StyledCarouselItem = styled(Carousel.Item)`
  /* display: grid; */
`;

export const StyledCarouselCaption = styled(Carousel.Caption)`
  // custom styles go here
`;

// export const StyledCarouselControl = styled(Carousel.Control)`
//   background-color: #ff0000;
//   z-index: 1;
// `;

export const CCContainer = styled.div`
  display: grid;
  height: 80vh;
  width: 100%;
  grid-template-columns: 0.2fr 0.3fr 0.3fr 0.2fr;
  grid-template-areas: 'Lspacer character stats Rspacer';
`;

export const LeftSpacer = styled.div`
  grid-area: Lspacer;
  /* background: rgba(173, 173, 173, 0.5); */
  backdrop-filter: blur(15px);
`;

export const RightSpacer = styled.div`
  grid-area: Rspacer;
  /* background: rgba(173, 173, 173, 0.5); */
  backdrop-filter: blur(15px);
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-area: stats / stats / stats / stats;
  grid-template-rows: auto auto auto auto auto auto;
  height: 100%;
  width: 100%;
  background: rgba(173, 173, 173, 0.4);
  backdrop-filter: blur(15px);
  border-right: 3px solid silver;
  justify-items: start;
  justify-content: center;
  align-content: center;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  /* box-sizing: content-box !important; */ /* <-- for golden line blur */
  ::before {
    z-index: -1;
    position: absolute;
    content: '';
    inset: 0;
    background-image: url('https://www.transparenttextures.com/patterns/concrete-wall.png');
    /* filter: blur(3px); */
  }
`;

// display: grid;
// grid-area: stats / stats / stats / stats;
// grid-template-rows: auto auto auto auto auto auto;
// height: 100%;
// width: 100%;
// background: rgba(173, 173, 173, 0.5);
// backdrop-filter: blur(15px);
// border-right: 3px solid darkgoldenrod;
// justify-items: start;
// -webkit-box-pack: center;
// place-content: center;

export const CharacterContainer = styled.div`
  /* grid-template-rows: .10fr .20fr .20fr;
  grid-template-areas:
  'hair'; */
  grid-area: character / character / character / character;
  background: rgba(173, 173, 173, 0.4);
  backdrop-filter: blur(15px);
  border-left: 3px solid silver;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  /* padding-top: 40px; */
  flex-direction: column;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  ::before {
    z-index: -1;
    position: absolute;
    content: '';
    inset: 0;
    background-image: url('https://www.transparenttextures.com/patterns/concrete-wall.png');
    /* filter: blur(3px); */
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  position: relative;
  height: 400px;
  width: 300px;
  justify-content: center;
  align-items: flex-start;
`;

export const HairSlot = styled.img`
  /* position: relative; */
  place-self: start center;
  /* grid-area: hair; */
  z-index: 10;
`;

export const FaceSlot = styled.img`
  /* position: relative; */
  place-self: start center;
  /* grid-area: hair; */
  z-index: 5;
`;

export const BodySlot = styled.img`
  /* position: relative; */
  place-self: start center;
  /* grid-area: hair; */
  z-index: 1;
`;

export const NameInput = styled(motion.input)`
  border: 3px inset;
`;

export const StatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: x-large;
  border-radius: 2em;
  border-width: 0.3rem;
  box-shadow: 1px 1px 0 0 #3b3b3b;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 1px 1px 0 0 #3b3b3b;
  }
  &:active {
    transform: translateY(4px);
    box-shadow: 0px 0px 0 0 #3b3b3b;
  }
`;

export const StatPoolBox = styled.h3`
  bottom: 1.4rem;
  position: relative;
  display: grid;
  place-items: center start;
  -webkit-box-align: center;
  grid-template-columns: 10rem 2rem;
  justify-content: space-around;
  justify-items: center;
`;

export const CharSelectStatBox = styled.div`
  display: grid;
  grid-template-columns: 13% 13%;
  justify-items: stretch;
  justify-content: center;
`;

export const RedX = styled.img`
  pointer-events: none;
  z-index: 3;
  position: fixed;
  display: flex;
  margin-left: 9rem;
  margin-top: 11.659999999999997rem;
  height: auto;
  width: 21rem;
  filter: drop-shadow(rgba(0, 0, 0, 0.5) 0.5rem 0.6rem 0.11rem);
`;

// export const SelectorContainer = styled.div`
//   /* grid-template-rows: .10fr .20fr .20fr;
//   grid-template-areas:
//   'hair'; */
//   /* grid-area: character / character / character / character; */
//   z-index: -4;
//   position: absolute;
//   background: rgba(173, 173, 173, 0.4);
//   height: 50%;
//   width: 33%;
//   backdrop-filter: blur(15px);
//   border-left: 3px solid silver;
//   border-right: 3px solid silver;
//   display: flex;
//   -webkit-box-pack: center;
//   justify-content: center;
//   align-items: center;
//   padding-top: 40px;
//   flex-direction: column;
//   border-radius: 9px;
//   ::before {
//     z-index: -5;
//     position: absolute;
//     content: '';
//     inset: 0;
//     background-image: url('https://www.transparenttextures.com/patterns/concrete-wall.png');
//     /* filter: blur(3px); */
//   }
// `;
