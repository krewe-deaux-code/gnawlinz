import React from 'react';
import { Link } from 'react-router-dom';

import { Container, NavBar, Main, Content1, Content2, Content3, Footer, TopContent1, TopContent2,
  TopContent3, ChoicesContainer, TopChoice1, BottomChoice1 } from './Styled'; //ContentBox

const GameView: React.FC = () => {
  return (
    <Container>
      <NavBar>
        <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
        <TopContent2>Clock</TopContent2>
        <TopContent3>Google User</TopContent3>
      </NavBar>
      <Main>Main</Main>
      <Footer>
        <Content1>Investigate</Content1>
        <Content2>User Stats</Content2>
        <Content3>
          <ChoicesContainer>
            <TopChoice1>Choice1</TopChoice1>
            <TopChoice1>Choice2</TopChoice1>
            <BottomChoice1>Choice3</BottomChoice1>
            <BottomChoice1>Choice4</BottomChoice1>
          </ChoicesContainer>
        </Content3>
      </Footer>
    </Container>

  )
};

export default GameView;