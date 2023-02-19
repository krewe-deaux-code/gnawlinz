import React, { useState } from "react";//createContext, useContext
import { Link } from 'react-router-dom';
import { Body, InfoContainer, Tab, Content } from './Styled';
import CharacterStats from './CharacterStats';
const Menu: React.FC = () => {


  //axios request to server to retrieve avatar
  //set google id to a string

  const [active, setActive] = useState(0);

  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };



  return (
    <Body >
      <InfoContainer >
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Character Details
        </Tab>
        <Tab onClick={handleClick} active={active === 1} id={1}>
          Character Stats
        </Tab>
        <Tab onClick={handleClick} active={active === 2} id={2}>
          Inventory
        </Tab>
      </InfoContainer>
      <>
        <Content active={active === 0}>
          <h1>Character Story:</h1>
          <span><b>Name:</b></span><span> Jean Valgene</span><br />
          <span><b>Age:</b></span><span> 31</span><br />
          <span><b>Background:</b><br /></span>
          <span> Jono do my bidding...</span><br />
          <span><b>Current Alignment:</b><br />
            Evil/Old</span><br />
          <span>
            <b>Jean Valgene's Story:</b><br />
            Jean Valgene decided to take a walk down to Chompitoulas Street<br />
            Jean Valgene decided to look under a trash can<br />
            Jean Valgene found a stray cat<br />
            Jean Valgene decided to eat stray cat providing +1 temporary health and strength
          </span>
        </Content>
        <Content active={active === 1}>
          <CharacterStats />
        </Content>
        <Content active={active === 2}>
          <h1>Items</h1>
          <span><b>This:</b></span><br />
          <span><b>Will:</b></span><br />
          <span><b>Be State:</b></span><br />
        </Content>
      </>
      <Link to="/gameView">GameView</Link>

    </Body >
  )
};

export default Menu;
