import React from "react";
import { TitleContainer, TopBar, Main, ContentBox, Content1, Content2, Content3, Footer } from './Styled';

// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

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