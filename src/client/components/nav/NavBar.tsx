//import axios from 'axios';
import React, { useEffect, useContext } from 'react'; //useState, 
import { NavBar, TopContent1, TopContent2, TopContent3 } from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import { ClockContext } from "../../App";

const Nav: React.FC = () => {
  //do stuff
  const {remainingTime, calculateRemainingTime} = useContext(ClockContext);
  useEffect(() => {
    calculateRemainingTime();
  }, []);
  return (
      <NavBar>
        <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
        <TopContent2>{remainingTime}</TopContent2>
        <TopContent3>Google User</TopContent3>
      </NavBar>
  )

}

export default Nav;