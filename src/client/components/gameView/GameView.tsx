import React, { useEffect, useState } from 'react';
import {
  Container, NavBar, Main, Content1,
  Content2, Content3, Footer, TopContent1,
  TopContent2, TopContent3, ChoicesContainer,
  TopChoice1, BottomChoice1 } from './Styled'; //ContentBox
import axios from 'axios';

const GameView: React.FC = () => {

  const [location, setLocation] = useState({});

  const fetchLocation = () => {
    axios.get('/location/random')
      .then((location: object) => {
        console.log('Location from DB', location);
        setLocation(location.data);
      })
      .catch(err => console.log('Axios fail useEffect Location grab', err));
    };

  useEffect(fetchLocation, []);

  return (
    <Container>
      <NavBar>
        <TopContent1>Logo</TopContent1>
        <TopContent2>Clock</TopContent2>
        <TopContent3>Google User</TopContent3>
      </NavBar>
      <Main>
        <p>Main</p>
        <div>
          <img src={location.image_url}></img>
        </div>
      </Main>
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