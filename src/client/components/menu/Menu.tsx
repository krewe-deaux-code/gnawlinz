import React, { useState, useEffect } from "react"; //useContext
import { Link } from 'react-router-dom';
import { Body, InfoContainer, Tab, Content } from './Styled';
import axios from 'axios';
//export const AuthContext = React.createContext(null);



const Menu: React.FC = () => {

  type AuthContextType = {
    avatar: string | null
  }

  const AuthContext = React.createContext<AuthContextType>({
    avatar: null
  })
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    axios.get('user/find')
    .then(user => {
      console.log(user.data);
      //setAvatar(user.data.avatar);
    }).catch(err => {
      console.error('Error fetching User Avatar from req.user (server)', err);
    });
}, []);


const [active, setActive] = useState(0);

const handleClick = (e) => {
  const index = parseInt(e.target.id, 0);
  if (index !== active) {
    setActive(index);
  }
};

return (
  <>
    <AuthContext.Provider value={{ avatar }}>
      <Body >
        <InfoContainer >
          <div>Here {avatar} </div>
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
            <h1>Character Details:</h1>
            <span><b>Name:</b></span><span> Jean Valgene</span><br />
            <span><b>Age:</b></span><span> 31</span><br />
            <span><b>Background:</b></span><span> Jono do my bidding...</span><br />
          </Content>
          <Content active={active === 1}>
            <h1>Character Stats:</h1>
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
    </AuthContext.Provider>
  </>
)
};

export default Menu;
