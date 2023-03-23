import React from 'react'; // { useEffect, useContext }
//import { Link } from 'react-router-dom';
import Nav from '../nav/NavBar';
import { TitleContainer, Main, Footer, TitleLogoImg, TitleImg, TitleButton } from './Styled';


const Title: React.FC = () => {

  const handleSignIn = () => {
    window.location.href = '/auth/google';
  };

  return (
    <TitleContainer>
      <Nav isActive={false} />
      <Main>
        <TitleLogoImg
          src='https://res.cloudinary.com/de0mhjdfg/image/upload/v1679498653/gnawlinzIcons/GnawlinzPixelatedSmaller_wyxezu.png'
          initial={{ filter: 'blur(5px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: .75 }}
        />
        <TitleImg src='https://media.discordapp.net/attachments/1054143394194149408/1075618769109528656/TitleScreenV4.png'
          initial={{ filter: 'blur(6px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: 1.25 }}
        />
      </Main>
      <Footer>
        <TitleButton onClick={handleSignIn}>
          Sign In
        </TitleButton>
      </Footer>
    </TitleContainer>
  );
};

export default Title;
