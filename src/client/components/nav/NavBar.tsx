//import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; //useState,
import { NavBar, TopContent1, TopContent2, TopContent3, VolumeSlider } from './Styled'; //ContentBox
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Howler } from 'howler';

import { UserContext, SettingsContext } from '../../App';

// Logo link props
type LinkProps = {
  isActive: boolean;
};

const Nav = ({ isActive }: LinkProps) => {
  // <-- move to Title after Auth refactor/move -->
  const { volume, setVolume } = useContext(SettingsContext);
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(parseFloat(newVolume));
    Howler.volume(parseFloat(newVolume));
    console.log('HOWLER VOLUME', newVolume);
    console.log('VOLUME IN CONTEXT TITLE', volume);
  };
  console.log('VOLUME @ TITLE', volume);

  const { avatar } = useContext(UserContext);
  const [remainingTime, setRemainingTime] = useState<string>('');

  const calculateRemainingTime = () => {
    const interval = setInterval(() => {
      const daysLeft = 3;
      const startTime = dayjs();
      const endTime = startTime.add(daysLeft, 'day').startOf('day');
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


  useEffect(() => {
    calculateRemainingTime();
  }, []);

  // logic to make logo active/inactive depending on where it is being rendered
  return (
    <NavBar>
      <TopContent1>
        {isActive ? (
          <Link to="/menu" className='active-link' >GNAWLINZ</Link>
        ) : (
          <span className='inactive-link'>GNAWLINZ</span>
        )}
        {/* move to Title after Auth refactor/move */}
        <VolumeSlider
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        />
      </TopContent1>
      <TopContent2>{remainingTime}</TopContent2>
      <TopContent3>
        <img src={googleAvatar} width='18 px' height='18 px' ></img></TopContent3>
    </NavBar>
  );

};

export default Nav;
