import styled from 'styled-components';

const TitleContainer = styled.div`
  display: grid;
  height: 100vh;
  color: white;

grid-template-rows: 0.2fr 1fr 0.5fr 0.5fr;
grid-template-areas:
    "nav nav nav nav"
    "sidebar main main main"
    "sidebar content content content"
    "sidebar footer footer footer";
text-align: center;
grid-gap: 0.25rem;

 /* display: grid;
 grid-template-columns: repeat(3, 1fr);
 gap: 20px; */
`;
const Item = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
`;
export {TitleContainer, Item};