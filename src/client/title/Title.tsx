import React from "react";
import { TitleContainer, Item } from './Styled';

// Need logo - top left, title image - center, possibly login pic - top right
// Clock above title image, start button bottom center

const Title: React.FC = () => {

  return (
    <TitleContainer>
      <Item>
    <div>
      <h1>Title Screen</h1>
      <button>
      <a href="/auth/google">Start</a>
      </button>
    </div>
      </Item>
    </TitleContainer>
  )
};

export default Title;