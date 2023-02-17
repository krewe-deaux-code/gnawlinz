import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { TitleContainer, TopBar, Main, Content1, Content2, Content3, Footer } from './Styled';
//import GameView from '../gameView/GameView';

// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

  // dayjs 72 hour function
  let daysLeft = 3;
  const startTime = dayjs();
  const endTime = startTime.add( daysLeft, 'day').startOf('day');
  const [remainingTime, setRemainingTime] = useState<string>('');

  function calculateRemainingTime() {
    const remainingTime = endTime.diff(dayjs(), 'millisecond');
    const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    const formattedTime = `${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
    setRemainingTime(formattedTime);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
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
        <Link to="/gameView">GameView</Link>
        <Link to="/menu">Menu</Link>
      </Footer>
    </TitleContainer>
  )
};

export default Title;