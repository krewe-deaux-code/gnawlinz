import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`

  HTML {
    background-color: #121212;
    background-size:  100%;
  }
  body {
    font-family: 'Edit Undo BRK', sans-serif !important;
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: rgb(31, 33, 40) !important; /* changed from black */
    background-size: cover;
    box-sizing: border-box;
  }
`;
