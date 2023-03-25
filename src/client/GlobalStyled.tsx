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
  /* The switch - the box around the slider */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 4em;
  height: 2em;
}

/* Hide default HTML checkbox */
.switch .chk {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "OFF";
  display: grid;
  place-content: center;
  height: 1.6em;
  width: 3.6em;
  border-radius: 20px;
  left: 0.17em;
  bottom: 0.22em;
  background-color: rgb(255, 0, 0);
  box-shadow: 0px 0px 3.7px black;
  transition: .4s ease-in-out;
}

.chk:checked + .slider:before {
  content: "ON";
  background-color: limegreen;
  box-shadow: inset 0px 0px 5px black;
}
`;


