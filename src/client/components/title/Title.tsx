import React from 'react'; // { useEffect, useContext }
//import { Link } from 'react-router-dom';
import Nav from '../nav/NavBar';
import images from '../../utility/images';
import { TitleContainer, Main, Footer, TitleLogoImg, TitleImg, TitleButton, CRTGlow, ArcadePurple } from './Styled';


const Title: React.FC = () => {

  const handleSignIn = () => {
    window.location.href = '/auth/google';
  };

  return (
    <TitleContainer>
      <Nav isActive={false} showButton={false}/>
      <Main>
          <CRTGlow>
        <TitleLogoImg
          src={images.titleLogo}
          initial={{ filter: 'blur(5px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: .75 }}
        />
        <TitleImg src={images.titleImage}
          initial={{ filter: 'blur(6px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: 1.25 }}
        />
        </CRTGlow>
      </Main>
      <Footer>
        <ArcadePurple>
        <TitleButton onClick={handleSignIn}>
          Sign In
        </TitleButton>
        </ArcadePurple>
      </Footer>
    </TitleContainer>
  );
};

export default Title;
