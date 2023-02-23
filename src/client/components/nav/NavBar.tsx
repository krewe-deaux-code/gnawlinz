//import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; //useState,
import { NavBar, TopContent1, TopContent2, TopContent3 } from './Styled'; //ContentBox
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { UserContext } from "../../App";

const Nav: React.FC = () => {
  //do stuff
  const { avatar } = useContext(UserContext);
  const [remainingTime, setRemainingTime] = useState<any>('');

  function calculateRemainingTime() {
    let interval = setInterval(() => {
      let daysLeft = 3;
      let startTime = dayjs();
      let endTime = startTime.add( daysLeft, 'day').startOf('day');
      let remainingTime = endTime.diff(dayjs(), 'millisecond');
      let remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      let remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      let remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      let formattedTime = `${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
      setRemainingTime(formattedTime);

    }, 1000);
    return () => clearInterval(interval);
  };



  //const {remainingTime, calculateRemainingTime} = useContext(ClockContext);
  useEffect(() => {
    calculateRemainingTime();
  }, []);
  return (
      <NavBar>
        <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
        <TopContent2>{remainingTime}</TopContent2>
        <TopContent3><img src={avatar} width='18 px' height='18 px' ></img></TopContent3>
      </NavBar>
  )

}

export default Nav;