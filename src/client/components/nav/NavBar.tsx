//import axios from 'axios';
import React, { useEffect, useState } from 'react'; //useState, 
import { NavBar, TopContent1, TopContent2, TopContent3 } from './Styled'; //ContentBox

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Nav: React.FC = () => {
  //do stuff

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
        <TopContent3>Google User</TopContent3>
      </NavBar>
  )

}

export default Nav;