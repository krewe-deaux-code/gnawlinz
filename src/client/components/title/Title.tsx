import React from 'react'; // { useEffect, useContext }
//import { Link } from 'react-router-dom';
import Nav from '../nav/NavBar';
import images from '../../utility/images';
import { TitleContainer, Main, TitleLogoImg, TitleImg, TitleButton, CRTGlow, ArcadeDiv } from './Styled';
import { GameViewProps } from '../../utility/interface';


const Title = (props: GameViewProps) => {

  const handleSignIn = () => {
    window.location.href = '/auth/google';
  };

  return (
    <TitleContainer>
      <Nav isActive={false} showButton={false} handleSpeak={props.handleSpeak}/>
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
        <ArcadeDiv>
        <TitleButton onClick={handleSignIn}>
          Sign In
        </TitleButton>
        </ArcadeDiv>
        </CRTGlow>
      </Main>
      {/* <Footer>
      </Footer> */}
    </TitleContainer>
  );
};

export default Title;
