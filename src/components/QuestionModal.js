import React, { useState, useRef, useEffect } from "react";
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

const QuestionText = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: Impact, "Arial Black", sans-serif;
  color: #ffcc00; /* Jeopardy gold */
`;

const AnswerText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
  font-family: Impact, "Arial Black", sans-serif;
`;

const ShowAnswerButton = styled.button`
  background-color: #ffcc00; /* Jeopardy gold */
  color: #000080; /* Jeopardy blue */
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  font-family: Impact, "Arial Black", sans-serif;
  &:hover {
    background-color: #ffd700; /* Lighter gold on hover */
  }
`;

const ControlButtons = styled.div`
  margin-top: 20px;
  font-family: Impact, "Arial Black", sans-serif;
  button {
    margin: 5px;
    padding: 10px 15px;
    background-color: #0000cd;
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    border-radius: 8px;
    font-family: Impact, "Arial Black", sans-serif;
    min-width: 100px;
    &:hover {
      background-color: #1e90ff;
    }
  }
`;

const QuestionModal = ({ category, value, isOpen, question, answer, onClose, onAnswer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      if (question.audio) {
        audioRef.current = new Audio(question.audio);
        audioRef.current.play();
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <ModalTitle>{category} - {value}</ModalTitle>
        <QuestionText>{question.text}</QuestionText>
        {!showAnswer ? (
          <ShowAnswerButton onClick={() => setShowAnswer(true)}>
            Show Answer
          </ShowAnswerButton>
        ) : (
          <AnswerText>{question.answer}</AnswerText>
        )}

        <ControlButtons>
          <button onClick={() => {
            setShowAnswer(false)
            onAnswer(true)
          }} style={
            {backgroundColor: 'green'}
          }>Correct</button>
          <button onClick={() => {
            setShowAnswer(false)
            onAnswer(false)
          }} style={
            {backgroundColor: 'red'}
          }>Incorrect</button>
          < br />
          <button onClick={() => {
            setShowAnswer(false)
            onClose()
          }}>Cancel</button>
        </ControlButtons>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default QuestionModal;
