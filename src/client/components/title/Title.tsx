import React from "react";
// import dayjs from 'dayjs';
import { TitleContainer, TopBar, Main, Footer } from './Styled';

// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

// dayjs 72 hour function
// const startTime = dayjs();
// const endTime = startTime.add(72, 'hour');

// function updateTimer() {
//   const remainingTime = endTime.diff(dayjs(), 'millisecond');
//   const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
//   const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
//   const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
//   console.log(`${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds remaining`);
// }

// setInterval(updateTimer, 1000);

  return (
    <TitleContainer>
      <TopBar>TopBar</TopBar>
 <Main>Title Image</Main>

 {/* <ContentBox>
     <Content1>Content1</Content1>
     <Content2>Content2</Content2>
     <Content3>Content3</Content3>
 </ContentBox> */}
 <Footer>
    <button>
      <a href="/auth/google">Start</a>
    </button>
 </Footer>



    </TitleContainer>
  )
};

export default Title;