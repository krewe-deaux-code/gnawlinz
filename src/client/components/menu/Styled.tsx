import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';

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

