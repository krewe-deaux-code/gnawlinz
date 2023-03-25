//import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'; //useState,
import { NavBar, TopContent1, TopContent2, TopContent3, VolumeSlider, StyledModal, ModalBodyContainer, SoundIcon } from './Styled';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Howler } from 'howler';
import { complete } from '../../utility/sounds';
import images from '../../utility/images';
import Modal from 'react-bootstrap/Modal';
import { MenuButton } from '../menu/Styled';

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


  // logic to make logo active/inactive depending on where it is being rendered
  return (

    <NavBar>
      <TopContent1>

        {isActive ? (
          <Link to="/menu" className='active-link' >GNAWLINZ</Link>
        ) : (
          <span className='inactive-link'>GNAWLINZ</span>
        )}

        <MenuButton style={{
          padding: '0.2rem',
          paddingRight: '0.75rem',
          paddingLeft: '0.75rem'
        }}
          onClick={handleShow}>Settings</MenuButton>

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
        <Modal.Header style={{ alignItems: 'flex-start' }} closeButton onClick={handleClose}>
          <Modal.Title><h3>Settings</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBodyContainer>
            {/* <div onClick={props.handleSpeak}>Look for items</div> */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4 style={{ height: '1.5rem', width: '1.5rem' }}>
                {volume <= 0.02
                  ? <SoundIcon src={images.soundIcon0}></SoundIcon>
                  : <></>
                }
                {volume < 0.51 && volume > 0.02
                  ? <SoundIcon src={images.soundIcon1}></SoundIcon>
                  : <></>
                }
                {volume < 0.76 && volume > 0.50
                  ? <SoundIcon src={images.soundIcon2}></SoundIcon>
                  : <></>
                }
                {volume <= 1.00 && volume > 0.75
                  ? <SoundIcon src={images.soundIcon3}></SoundIcon>
                  : <></>
                }
              </h4>
              {/* move to Title after Auth refactor/move */}
              <VolumeSlider
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                onClick={() => { complete.play(); }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', }}>
              <div style={{ flex: 1 }}>Text To Speech</div>
              <label className="switch">
                <input className="chk" type="checkbox"></input>
                <span className="slider"></span>
              </label>
              {/* <Button style={{ flex: 1 }}>TTS</Button> */}
            </div>
            {/* <div onClick={props.handleSpeak}>Look for graffiti</div> */}
          </ModalBodyContainer>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </StyledModal>

    </NavBar >
  );


};

export default Nav;
