//import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; //useState,
import { NavBar, TopContent1, TopContent2, TopContent3, VolumeSlider, StyledModal, ModalBodyContainer, } from './Styled'; //ContentBox
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Howler } from 'howler';
import images from '../../utility/images';
import Modal from 'react-bootstrap/Modal';
import { MenuButton } from '../menu/Styled';

import { UserContext, SettingsContext } from '../../App';


// Logo link props & settings button props
type LinkProps = {
  isActive: boolean;
  showButton: boolean;
};



const Nav = ({ isActive, showButton }: LinkProps) => {


  // <-- move to Title after Auth refactor/move -->
  const { volume, setVolume, isSpeakingEnabled, setIsSpeakingEnabled } = useContext(SettingsContext);
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

  const googleAvatar = avatar ? avatar : images.defaultAvatar;


  useEffect(() => {
    calculateRemainingTime();
  }, []);

  // functions for settings modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const msg = new SpeechSynthesisUtterance();
  const handleSpeak = (e) => {
    if (isSpeakingEnabled) {
      msg.text = e.target.innerText;
      window.speechSynthesis.speak(msg);
    }
  };

  const handleToggleSpeak = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
  };

console.log('is speaking boolean', isSpeakingEnabled);
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

          {showButton && <MenuButton style={{
          padding: '0.2rem',
          paddingRight: '0.75rem',
          paddingLeft: '0.75rem'
        }}
        onClick={handleShow}>Settings</MenuButton>}

      </TopContent1>
      <TopContent2>{remainingTime}</TopContent2>
      <TopContent3>
        <img src={googleAvatar} width='18 px' height='18 px' ></img></TopContent3>
      <StyledModal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{alignItems: 'flex-start'}}closeButton onClick={handleClose}>
          <Modal.Title><h3>Settings</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBodyContainer>
            {/* <div onClick={props.handleSpeak}>Look for items</div> */}
            <h4>Volume Control</h4>
            <h4>Accessibility</h4>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>Text To Speech</div>
              <label className="switch">
                <input className="chk" type="checkbox" onClick={handleToggleSpeak}></input>
                <span className="slider"></span>
              </label>
            </div>

      <button onClick={handleSpeak}>Speak</button>
      <button onClick={handleToggleSpeak}>{isSpeakingEnabled ? 'Disable speaking' : 'Enable speaking'}</button>
          </ModalBodyContainer>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </StyledModal>

    </NavBar >
  );


};

export default Nav;
