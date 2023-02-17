import styled from 'styled-components';

const TitleContainer = styled.div`
  display: grid;
  height: 100vh;
  color: white;

grid-template-rows: 0.1fr .8fr 0.2fr;
grid-template-areas:
    "top top top top"
    "main main main main"
    "footer footer footer footer";
text-align: center;
/* grid-gap: 0.25rem; */
`;

const TopBar = styled.nav`
  display: flex;
  background: #3a3a55;
  grid-area: top;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
`;

const Main = styled.main`
  background: black;
  color: white;
  grid-area: main;
  padding: 0.25rem;
`;

// const ContentBox = styled.div`
//   display: flex;
//   gap: 0.25rem;
//   padding: 0.25rem;
//   align-items: center;
//   grid-area: content;
//   justify-content: center;
// `;
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

export {TitleContainer, TopBar, Main,
  // ContentBox,
  Content1, Content2, Content3,
  Footer};