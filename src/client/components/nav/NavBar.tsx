//import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; //useState,
import { NavBar, TopContent1, TopContent2, TopContent3 } from './Styled'; //ContentBox
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { UserContext } from '../../App';

const Nav: React.FC = () => {
  //do stuff
  const { avatar } = useContext(UserContext);
  const [remainingTime, setRemainingTime] = useState<any>('');

  const calculateRemainingTime = () => {
    const interval = setInterval(() => {
      const daysLeft = 3;
      const startTime = dayjs();
      const endTime = startTime.add( daysLeft, 'day').startOf('day');
      const remainingTime = endTime.diff(dayjs(), 'millisecond');
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const formattedTime = `${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
      setRemainingTime(formattedTime);

    }, 1000);
    return () => clearInterval(interval);
  };
  const defaultAvatar = 'https://res.cloudinary.com/de0mhjdfg/image/upload/v1676696909/gnawlinzIcons/noun-profile-1094753_lwnwm4.png';
  const googleAvatar = avatar ? avatar : defaultAvatar;

  //const {remainingTime, calculateRemainingTime} = useContext(ClockContext);
  useEffect(() => {
    calculateRemainingTime();
  }, []);
  return (
    <NavBar>
      <TopContent1><Link to="/menu" >LOGO</Link></TopContent1>
      <TopContent2>{remainingTime}</TopContent2>
      <TopContent3>
        <img src={googleAvatar} width='18 px' height='18 px' ></img></TopContent3>
    </NavBar>
  );

};

export default Nav;
