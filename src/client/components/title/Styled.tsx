import styled from 'styled-components';
import { motion } from 'framer-motion';

const TitleContainer = styled.div`
  display: grid;
  height: 97vh;
  grid-template-rows: 0.10fr .70fr 0.30fr;
  grid-template-areas:
  "nav nav nav nav"
  "main main main main"
  "footer footer footer footer";
  text-align: center;
  /* grid-gap: 0.25rem; */
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr 0.6fr 0.2fr;
    grid-template-areas:
      "nav"
      "main"
      "footer";
  }
  color: white;
  background-color: #121212;
`;

const TitleLogoImg = styled(motion.img)`
  width: auto;
  height: auto;
  min-width: 10rem;
  min-height: 10rem;
  max-width: 30rem;
  max-height: 30rem;
  padding: .25rem;
  margin: 0 auto;
`;

const TitleButton = styled.button`
  background-color: #0050ec;
  font-family: 'Edit Undo BRK', sans-serif;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 1rem;
  border-radius: 2em;
  margin-top: 1rem;
  cursor: pointer;
  transition: 0.1s ease;
  border-width: 0;
  box-shadow: 1px 5px 0 0 #0e285d;
  &:hover {
    transform: translateY(-4px);
  box-shadow: 1px 9px 0 0 #0e285d;
  }
  &:active {
    transform: translateY(4px);
  box-shadow: 0px 0px 0 0 #0e285d;
  }
`;

const TitleImg = styled(motion.img)`
  width: auto;
  height: auto;
  padding: .25rem;
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

const Main = styled.main`
  display: grid;
  grid-template-rows: auto auto auto auto;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;

const Content1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const Content2 = styled(Content1)``;
const Content3 = styled(Content1)``;
const Footer = styled.footer`
  background: #121212;
  grid-area: footer;
  padding: 0.25rem;
`;

const VolumeSlider = styled.input.attrs({ type: 'range' })`

`;

export {
  TitleContainer, NavBar, Main,
  Content1, Content2, Content3,
  Footer, VolumeSlider, TitleLogoImg,
  TitleImg, TitleButton
};
