import React from "react"; // { useEffect, useContext }
//import { Link } from 'react-router-dom';
import Nav from "../nav/NavBar";
import { TitleContainer, Main, Footer } from './Styled';
//import GameView from '../gameView/GameView';
//import axios from 'axios';
//import { ClockContext } from "../../App";
// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

  // dayjs 72 hour function

  //const {remainingTime, calculateRemainingTime} = useContext(ClockContext);


  // useEffect(() => {
  //   calculateRemainingTime();
  // }, []);


  //<TopBar>
  //    <Content1><h1>Logo</h1></Content1>
  //  <Content2><h1>CLOCK GOES HERE</h1></Content2> {/** <h1>{remainingTime}*/}
  //<Content3><h1>Google User</h1></Content3>
  // </TopBar>

  return (
    <TitleContainer>
          <Nav isActive={false} />
        <Main>Title Image</Main>
        <Footer>
          <button>
            <a href="/auth/google">Sign In</a>
          </button>
        </Footer>
      </TitleContainer>

  )
};

export default Title;