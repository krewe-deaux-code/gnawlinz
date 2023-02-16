import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { TitleContainer, TopBar, Main, Footer } from './Styled';

// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

  // dayjs 72 hour function
  const startTime = dayjs();
  const endTime = startTime.add(72, 'hour');
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
        <h1>
          {remainingTime}
        </h1>
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