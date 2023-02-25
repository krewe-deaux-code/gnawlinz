import styled from 'styled-components';

const TitleContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.10fr .70fr 0.30fr;
  grid-template-areas:
  "nav nav nav nav"
  "main main main main"
  "footer footer footer footer";
  text-align: center;
  /* grid-gap: 0.25rem; */
  transition: all 0.25s ease-in-out;
  color: white;
`;

const NavBar = styled.nav`
  background: #3a3a55;
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
  background: black;
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
  background: black;
  grid-area: footer;
  padding: 0.25rem;
`;

export {TitleContainer, NavBar, Main,
  // ContentBox,
  Content1, Content2, Content3,
  Footer};
