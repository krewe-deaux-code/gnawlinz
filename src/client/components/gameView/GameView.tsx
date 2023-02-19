import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, NavBar, Main, Content1,
  Content2, Content3, Footer, TopContent1,
  TopContent2, TopContent3, ChoicesContainer,
  TopChoice1, BottomChoice1 } from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { ClockContext } from "../../App";

interface LocationData {
  data: object;
  image_url: string;
};

const GameView: React.FC = () => {

  const {remainingTime, calculateRemainingTime} = useContext(ClockContext);

  const [location, setLocation] = useState({} as LocationData);

  const fetchLocation = () => {
    axios.get<LocationData>('/location/random')
      .then((location) => {
        console.log('Location from DB', location);
        setLocation(location.data);
      })
      .catch(err => console.log('Axios fail useEffect Location grab', err));
    };

  useEffect(() => {
    fetchLocation();
    calculateRemainingTime();
  }, []);

  return (
    <Container>
      <NavBar>
        <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
        <TopContent2>{remainingTime}</TopContent2>
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