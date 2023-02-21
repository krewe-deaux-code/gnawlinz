import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {
  Container, NavBar, Main, Content1,
  Content2, Content3, Footer, TopContent1,
  TopContent2, TopContent3, HudButton } from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { ClockContext, UserContext } from "../../App";

interface LocationData {
  data: object;
  image_url: string;
  name: string;
};

const GameView: React.FC = () => {

  const {remainingTime, calculateRemainingTime} = useContext(ClockContext);
  const {currentChar} = useContext(UserContext);

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
  console.log('CURRENT CHAR', currentChar);
  return (
    <Container>
      <NavBar>
        <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
        <TopContent2>{remainingTime}</TopContent2>
        <TopContent3>Google User</TopContent3>
      </NavBar>
      <Main>
        <h2>{location.name}</h2>
        <div>
          <img src={location.image_url}></img>
        </div>
      </Main>
      <Footer>
        <Content1>
          <HudButton>Move</HudButton>
          <HudButton>Investigate</HudButton>
          <HudButton>Inventory</HudButton>
        </Content1>
        <Content2>
          <div>
            <img src={currentChar.image_url} />
          </div>
          <div>Character Stats</div>
        </Content2>
        <Content3>
          <HudButton>Choice 1</HudButton>
          <HudButton>Choice 2</HudButton>
          <HudButton>Choice 3</HudButton>
          <HudButton>Choice 4</HudButton>
        </Content3>
      </Footer>
    </Container>

  )
};

export default GameView;