import React, { useEffect, useContext } from "react";
//import { Link } from 'react-router-dom';

import { TitleContainer, TopBar, Main, Content1, Content2, Content3, Footer } from './Styled';
//import GameView from '../gameView/GameView';
import { ClockContext } from "../../App";
// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

  // dayjs 72 hour function

  const {remainingTime, calculateRemainingTime} = useContext(ClockContext);


  useEffect(() => {
    calculateRemainingTime();
  }, []);

  return (
    <TitleContainer>
      <TopBar>
        <Content1><h1>Logo</h1></Content1>
        <Content2><h1>{remainingTime}</h1></Content2>
        <Content3><h1>Google User</h1></Content3>
      </TopBar>

      <Main>Title Image</Main>

      <Footer>
        <button>
          <a href="/auth/google">Start</a>
        </button>
      </Footer>
    </TitleContainer>
  )
};

export default Title;