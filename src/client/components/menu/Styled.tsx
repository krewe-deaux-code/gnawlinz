import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';

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
;
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

export const SaveBox = styled.h5`
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

export const StatIconContainer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  grid-gap: 1em;
  align-items: center;
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
  border: ${props => (props.active ? '1px solid black' : '')};
  border-bottom: ${props => (props.active ? 'none' : '')};
  background-color: ${props => (props.active ? 'gray' : 'lightgray')};
  height: ${props => (props.active ? '3em' : '2.6em; top:.4em')};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

export const Content = styled.div`
  ${props => (props.active ? '' : 'display:none')}
`;

export const StyledCarousel = styled(Carousel)`
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    position: relative;
    background-color: #ff0000 !important;
    z-index: 1 !important;
  }
  /* .carousel-control-next,
  .carousel-control-prev {
    position: relative;
    display: contents;
  } */
`;

export const HairCarousel = styled(Carousel)`
  position: absolute !important;
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    position: relative;
    background-color: #ff0000 !important;
    z-index: 1 !important;
  }
  .carousel-control-next,
  .carousel-control-prev {
    position: absolute;
    top: 80px;
    height: 32px;
  }
`;

export const FaceCarousel = styled(Carousel)`
  position: absolute !important;
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    position: relative;
    background-color: #ff0000 !important;
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
    position: absolute;
    background-color: #ff0000 !important;
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
  grid-template-columns: .20fr .30fr .30fr .20fr;
  grid-template-areas:
    'Lspacer character stats Rspacer';
`;

export const LeftSpacer = styled.div`
  grid-area: Lspacer;
  background: rgba(173, 173, 173, 0.5);
  backdrop-filter: blur(15px);
`;

export const RightSpacer = styled.div`
  grid-area: Rspacer;
  background: rgba(173, 173, 173, 0.5);
  backdrop-filter: blur(15px);
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-area: stats / stats / stats / stats;
  grid-template-rows: auto auto auto auto auto auto;
  height: 100%;
  width: 100%;
  background: rgba(173, 173, 173, 0.5);
  backdrop-filter: blur(15px);
  border-right: 3px solid darkgoldenrod;
  justify-items: start;
  justify-content: center;
  align-content: center;
`;

export const CharacterContainer = styled.div`
  /* grid-template-rows: .10fr .20fr .20fr;
  grid-template-areas:
    'hair'; */
    grid-area: character / character / character / character;
    background: rgba(173, 173, 173, 0.5);
    backdrop-filter: blur(15px);
    border-left: 3px solid darkgoldenrod;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    align-items: center;
    /* padding-top: 40px; */
    flex-direction: column;
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

`;
