import styled from 'styled-components';



const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.05fr .70fr 0.25fr;
  grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    /* "content content content content" */
    "footer footer footer footer";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    grid-template-areas:
      "nav"
      "sidebar"
      "main"
      "content"
      "footer";
  }
  color: white;
`;
const ContentBox = styled.div`
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
const NavBar = styled.nav`
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
const Main = styled.main`
  background: #1f2128;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;
// const SideBar = styled.div`
//   background: #9aaab7;
//   grid-area: sidebar;
//   padding: 0.25rem;
// `;


const Content1 = styled.div`
  background: #4f004f;
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
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const TopContent1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const TopContent2 = styled(TopContent1)``;
const TopContent3 = styled(TopContent1)``;

// choice grid
const ChoicesContainer = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr;
  grid-template-areas:
    "top top"
    "bottom bottom";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    grid-template-areas:
      "top"
      "bottom";
  }
  color: white;
`;
const TopChoice1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;
const BottomChoice1 = styled.div`
padding: 0.25rem;
width: 100%;
height: 100%;
`;

export {Container, NavBar, Main, ContentBox,
  Content1, Content2, Content3, Footer, TopContent1, TopContent2, TopContent3, ChoicesContainer, TopChoice1, BottomChoice1};