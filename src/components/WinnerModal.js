import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Animation for modal open/close
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background-color: #000080; /* Jeopardy blue */
  color: #fff;
  border: 3px solid #ffcc00; /* Jeopardy gold */
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 60%;
  max-width: 800px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  font-family: Impact, "Arial Black", sans-serif;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background-color: #ffcc00; /* Jeopardy gold */
  color: #000080; /* Jeopardy blue */
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
`;

const GenericModal = ({ isOpen, text, onClose }) => {
  if (!isOpen) return null;
  return (
    <ModalBackdrop>
      <ModalContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ModalTitle>{text}</ModalTitle>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default GenericModal;
