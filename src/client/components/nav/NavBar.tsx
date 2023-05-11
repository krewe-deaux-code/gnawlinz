//import axios from 'axios';
import React, { useEffect, useState, useContext, MouseEvent } from 'react'; //useState,
import {
  NavBar,
  TopContent1,
  TopContent2,
  TopContent3,
  VolumeSlider,
  StyledModal,
  ModalBodyContainer,
  SoundIcon,
} from './Styled';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Howler } from 'howler';
import { complete } from '../../utility/sounds';
import images from '../../utility/images';
import Modal from 'react-bootstrap/Modal';
import { StatButton } from '../menu/Styled';

import { UserContext, SettingsContext } from '../../App';

// Logo link props & settings button props
type LinkProps = {
  isActive: boolean;
  showButton: boolean;
  handleSpeak: (e: MouseEvent<HTMLElement>) => void;
};

const Nav = ({ isActive, showButton, handleSpeak }: LinkProps) => {
  // <-- move to Title after Auth refactor/move -->
  const {
    volume,
    setVolume,
    isSpeakingEnabled,
    setIsSpeakingEnabled,
    isChecked,
    setIsChecked,
  } = useContext(SettingsContext);
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(parseFloat(newVolume));
    Howler.volume(parseFloat(newVolume));
    console.log('HOWLER VOLUME', newVolume);
    console.log('VOLUME IN CONTEXT TITLE', volume);
  };
  // console.log('VOLUME @ TITLE', volume);

  const { avatar } = useContext(UserContext);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [show, setShow] = useState(false);

  const calculateRemainingTime = () => {
    const interval = setInterval(() => {
      const now = dayjs();
      const nextResetTime = now.add(3 - (now.day() % 3), 'day').startOf('day');
      const remainingTime = nextResetTime.diff(now, 'millisecond');
      const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
      const remainingMinutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const formattedTime = `${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
      setRemainingTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  };

  const googleAvatar = avatar ? avatar : images.defaultAvatar;

  useEffect(() => {
    calculateRemainingTime();
  }, []);

  // functions for settings modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToggleSpeak = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
    const newValue = !isChecked;
    setIsChecked(newValue);
  };

  // logic to make logo active/inactive depending on where it is being rendered
  return (
    <NavBar>
      <TopContent1>
        {isActive ? (
          <Link to='/menu' className='active-link'>
            <img
              src={images.zombieG}
              style={{ width: '38px', height: '37px', paddingBottom: '5px' }}
            ></img>
          </Link>
        ) : (
          <span className='inactive-link'>
            <img
              src={images.zombieG}
              style={{ width: '38px', height: '37px', paddingBottom: '5px' }}
            ></img>
          </span>
        )}
      </TopContent1>
      <TopContent2 onClick={handleSpeak}>{remainingTime}</TopContent2>
      <TopContent3>
        {showButton && (
          <StatButton
            style={{
              marginLeft: '1rem',
              display: 'initial',
              fontSize: 'large',
            }}
            onClick={() => {
              complete.play();
              handleShow();
            }}
          >
            Settings
          </StatButton>
        )}
        {/* <img src={googleAvatar} width='18 px' height='18 px' style={{background: 'white', width: '28px', height: '28px'}} ></img> */}
      </TopContent3>
      <StyledModal
        centered
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header
          style={{ alignItems: 'flex-start' }}
          closeButton
          onClick={handleClose}
        >
          <Modal.Title onClick={handleSpeak}>
            <h3>Settings</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBodyContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ height: '1.5rem', width: '1.5rem' }}>
                {volume <= 0.02 ? (
                  <SoundIcon src={images.soundIcon0}></SoundIcon>
                ) : (
                  <></>
                )}
                {volume < 0.51 && volume > 0.02 ? (
                  <SoundIcon src={images.soundIcon1}></SoundIcon>
                ) : (
                  <></>
                )}
                {volume < 0.76 && volume > 0.5 ? (
                  <SoundIcon src={images.soundIcon2}></SoundIcon>
                ) : (
                  <></>
                )}
                {volume <= 1.0 && volume > 0.75 ? (
                  <SoundIcon src={images.soundIcon3}></SoundIcon>
                ) : (
                  <></>
                )}
              </h4>
              {/* move to Title after Auth refactor/move */}
              <VolumeSlider
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                onClick={() => {
                  complete.play();
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={handleSpeak} style={{ flex: 1 }}>
                Text To Speech
              </div>
              <label className='switch'>
                <input
                  className='chk'
                  type='checkbox'
                  defaultChecked={isChecked}
                  onClick={handleToggleSpeak}
                ></input>
                <span className='slider'></span>
              </label>
            </div>
          </ModalBodyContainer>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </StyledModal>
    </NavBar>
  );
};

export default Nav;
