import styled from 'styled-components';

const TitleContainer = styled.div`
  display: grid;
  height: 100vh;
  color: white;

grid-template-rows: 0.1fr .8fr 0.1fr;
grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    "footer footer footer footer";
text-align: center;
grid-gap: 0.25rem;
`;

const TopBar = styled.nav`
  background: #3a3a55;
  grid-area: nav;
  padding: 0.25rem;
`;

const Main = styled.main`
  background: #1f2128;
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
// const Content1 = styled.div`
//   background: #a6b8b9;
//   padding: 0.25rem;
//   width: 100%;
//   height: 100%;
// `;
// const Content2 = styled(Content1)``;
// const Content3 = styled(Content1)``;
const Footer = styled.footer`
  background: #ff9637;
  grid-area: footer;
  padding: 0.25rem;
`;

const Item = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
`;
export {TitleContainer, Item, TopBar, Main,
  // ContentBox, Content1, Content2, Content3,
  Footer};