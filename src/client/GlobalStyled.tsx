import { createGlobalStyle } from 'styled-components';




export const GlobalStyle = createGlobalStyle`

  HTML {
    background-color: black;
    background-size: cover;
  }
  body {
    font-family: 'Edit Undo BRK', sans-serif !important;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    transition: background-color 0.3s ease;
    height: auto;
    background-color: black;
    background-size: cover;
  }
`;

