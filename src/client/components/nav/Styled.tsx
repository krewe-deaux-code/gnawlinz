import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.05fr .70fr 0.25fr;
  grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    "footer footer footer footer";
  text-align: center;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1fr;
    grid-template-areas:
      "nav"
      "sidebar"
      "main"
      "content"
      "footer";
  }
  color: white;
`;

export const NavBar = styled.nav`
  height: fit-content;
  background: url('http://www.transparenttextures.com/patterns/bo-play.png');
  grid-area: nav;
  padding: 0.25rem;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const TopContent1 = styled.div`
  padding: 0.25rem;
  width: 100%;
  height: 100%;
`;

export const VolumeSlider = styled.input.attrs({ type: 'range' })``;

export const TopContent2 = styled(TopContent1)``;

export const TopContent3 = styled(TopContent1)``;

export const StyledModal = styled(Modal)`
  --bs-modal-bg: silver !important;
  backdrop-filter: blur(4px);
    .modal-dialog {
      justify-content: center;
    }
    .modal-content {
      width: 20rem;
    }
`;

export const ModalBodyContainer = styled.div`
  grid-template-rows: auto auto;
  padding: 0.25rem;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 0.25rem;
  align-content: space-evenly;
`;

export const SoundIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
`;
