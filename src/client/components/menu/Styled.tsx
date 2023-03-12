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
  background: grey;
`;

export const RightSpacer = styled.div`
  grid-area: Rspacer;
  background: grey;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-area: stats;
  grid-template-rows: auto auto auto auto auto auto;
  height: 100%;
  width: 100%;
  align-content: space-evenly;
  background: #adadad;
`;

export const CharacterContainer = styled.div`
  grid-area: character;
  background: #5e5d5d;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  /* grid-template-rows: .10fr .20fr .20fr;
  grid-template-areas:
    'hair'; */
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
