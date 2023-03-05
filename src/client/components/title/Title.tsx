import React from 'react'; // { useEffect, useContext }
//import { Link } from 'react-router-dom';
import Nav from '../nav/NavBar';
import { TitleContainer, Main, Footer } from './Styled';

//import GameView from '../gameView/GameView';
//import axios from 'axios';

const Title: React.FC = () => {

  return (
    <TitleContainer>
      <Nav isActive={false} />
      <Main>
        <h1>GNAWLINZ</h1>
        <img src='https://media.discordapp.net/attachments/1054143394194149408/1075618769109528656/TitleScreenV4.png' />
      </Main>
      <Footer>
        <button>
          <a href="/auth/google">Sign In</a>
        </button>
      </Footer>
    </TitleContainer>
  );
};

export default Title;
