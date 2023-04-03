import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const TitleContainer = styled.div`
  display: grid;
  height: 97vh;
  grid-template-rows: 0.20fr .80fr;
  grid-template-areas:
  "nav nav nav nav"
  "main main main main";
  /* "footer footer footer footer"; */
  text-align: center;
  /* grid-gap: 0.25rem; */
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 0.8fr
    grid-template-areas:
      "nav"
      "main";
      /* "footer"; */
  }
  color: white;
  background-color: rgb(31, 33, 40);
`;

const TitleLogoImg = styled(motion.img)`
  margin-left: auto;
  margin-right: auto;
  padding: .25rem;
  width: 80%;
 
  /* transform: scale(1.5); */
`;

const TitleButton = styled.button`
  min-width: 95px;
  min-height: 45px;
  background-color: #931a03;
  color: white !important;
  font-family: 'Edit Undo BRK', sans-serif;
  font-size: 1rem;
  padding: 10px;
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

const TitleImg = styled(motion.img)`
  border-radius: 2.6rem;
  border: 1px solid #959595;
  /* transform: scale(.5); */
`;

const NavBar = styled.nav`
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

export const CRTFlicker = keyframes`
  0% {
  opacity: 0.15;
  }
  25% {
  opacity: 0.25;
  }
  50% {
  opacity: 0.15;
  }
  75% {
  opacity: 0.1;
  }
  100% {
  opacity: 0.2;
  }
`;





export const CRTGlowPulse = keyframes`
0% {
  box-shadow: 0 20px 100px 22.25px #C0A085;
  }
  25% {
    box-shadow: 0 20px 100px 23.75px #C0A085;
  }
  50% {
    box-shadow: 0 20px 100px 22.25px #C0A085;
  }
  75% {
    box-shadow: 0 20px 100px 21.5px #C0A085;
  }
  100% {
    box-shadow: 0 20px 100px 23px #C0A085;
  }
`;







const Main = styled.main`
  height: 100%;
  justify-content: center;
  background: rgb(31, 33, 40);
  color: white;
  grid-area: main;
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
    animation: ${CRTFlicker} 0.15s infinite;
  }
`;


const CRTGlow = styled.div`
display: grid;
grid-template-columns: auto;
justify-content: center;
padding: 1rem;
grid-gap: .25rem;
border-radius: 2.6rem;
box-shadow: 0 20px 100px 20px #C0A085;
animation: ${CRTGlowPulse} .15s infinite;
`;

const Content1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;


const ArcadeDiv = styled.div`
  width: 100%;
  padding: .5rem;
  /* border-radius: 3rem 3rem 0 0; */
  /* background: url('https://res.cloudinary.com/de0mhjdfg/image/upload/v1679955903/gnawlinzIcons/purple_cross_stripes_vtgu6o.png'); */
  
`;

// const Footer = styled.footer`
//   grid-area: footer;
//   display: flex; 
//   justify-content: center;
//   width: 100%;
// `;

const VolumeSlider = styled.input.attrs({ type: 'range' })`

`;













export {
  TitleContainer, NavBar, Main,
  Content1, Content2, Content3,
   VolumeSlider, TitleLogoImg,
  TitleImg, TitleButton, CRTGlow, ArcadeDiv

};
