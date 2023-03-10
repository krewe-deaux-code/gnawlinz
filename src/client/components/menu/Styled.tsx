import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';

export const StatName = styled.h5`
  font-size: 1.5em;
  color: white;
  text-align: center;
  margin: auto;
  `;

export const IconContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  grid-gap: 1em;
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
  background-color: black;
  color: white;
`;

export const InfoContainer = styled.div`
  overflow: hidden;
  background: black;
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
    background-color: #ff0000 !important;
    z-index: 1 !important;
  }
`;

export const StyledCarouselItem = styled(Carousel.Item)`
  // custom styles go here
`;

export const StyledCarouselCaption = styled(Carousel.Caption)`
  // custom styles go here
`;

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
  background: grey;
`;

export const RightSpacer = styled.div`
  grid-area: Rspacer;
  background: grey;
`;

export const CharacterContainer = styled.div`
  grid-area: character;
  background: grey;
  display: grid;
  grid-template-rows: .10fr .20fr .20fr;
  grid-template-areas:
    'hair face body';
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-area: stats;
  grid-template-rows: auto auto auto auto auto auto;
  height: 100%;
  width: 100%;
  align-content: space-evenly;
  background: grey;
`;

export const HairSlot = styled.div`
  grid-area: hair;
  z-index: 3;
`;

export const FaceSlot = styled.div`
  grid-area: face;
  z-index: 2;
`;

export const BodySlot = styled.div`
  grid-area: body;
  z-index: 1;
`;
