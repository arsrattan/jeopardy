import React from "react";
import styled from "styled-components";

// Top Bar Styling
const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  border-bottom: 2px solid white;
`;

const LogoWrapper = styled.div`
  text-align: center;
  background-color: ${(props) => props.bgColor || "transparent"}; /* Background color for PNG */
  padding: 10px;
  border-radius: 8px; /* Optional for rounded edges */
  display: inline-block;
`;

const Logo = styled.img`
  width: 250px;
  height: auto;
  filter: ${(props) => (props.color === "purple" ? "invert(12%) sepia(100%) saturate(1863%) hue-rotate(268deg) brightness(83%) contrast(90%)" : "invert(100%)")};
`;

const GroupText = styled.div`
  font-size: 36px;
  font-family: Impact, "Arial Black", sans-serif;
  color: white;
`;

const CurrentlyPlayingText = styled.div`
  background-color: rgba(255, 215, 0, 0.6); /* Semi-transparent white */
  border: 2px solid white;
  border-radius: 6px; /* Soft round corners */
  padding: 10px 10px;
  margin-top: 10px;
  font-size: 20px;
  color: white;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

const StartGameButton = styled.div`
  background-color: rgba(255, 215, 0, 0.6); /* Semi-transparent white */
  border: 2px solid white;
  border-radius: 6px; /* Soft round corners */
  padding: 10px 10px;
  margin-top: 10px;
  font-size: 28px;
  color: white;
  font-family: Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;

  /* Add animation */
  animation: pulse 1.5s infinite; /* 1.5 seconds, loops infinitely */

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: rgba(255, 215, 0, 1); /* Solid white */
  }
`;

const FirstTeamScoreWrapper = styled.div`
  display: inline-block;
  background-color: rgba(0, 100, 0, 0.85); /* Semi-transparent green */
  border: 2px solid white;
  border-radius: 12px; /* Soft round corners */
  padding: 20px 20px;
  text-align: center;
  font-size: 24px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: ${(props) => props.textColor || "white"};
  min-width: 200px;
  margin: 0px 80px;
`;

const SecondTeamScoreWrapper = styled.div`
  display: inline-block;
  background-color: rgba(139, 0, 0, 0.85); /* Semi-transparent red */
border: 2px solid white;
  border-radius: 12px; /* Soft round corners */
  padding: 20px 20px;
  text-align: center;
  font-size: 24px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: ${(props) => props.textColor || "white"};
  min-width: 200px;
  margin: 0px 80px;
`;

const Score = styled.div`
  font-size: 48px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: ${(props) => props.textColor || "white"};
`;

const ScoreBoard = ({ scores, teamNames, group, currentTeam, logoColor = "white", setCurrentTeam }) => {
  console.log("Current Team: ", currentTeam);
  console.log("Scores: ", scores);
  console.log("Team Names: ", teamNames);
  return (
    <TopBar background="/christmasBanner.jpg">
      <FirstTeamScoreWrapper>
      {teamNames[0]} <br /> <Score>{scores[teamNames[0]]}</Score>
      </FirstTeamScoreWrapper>
      <LogoWrapper>
      <GroupText>{group}</GroupText>
        <Logo
          src="/jeopardy.png"
          alt="Jeopardy Logo"
        />
        {
          currentTeam == null 
          ? <StartGameButton onClick={setCurrentTeam}>Start Game</StartGameButton>
          : <CurrentlyPlayingText>{currentTeam}'s Turn</CurrentlyPlayingText>
        }
      </LogoWrapper>
      <SecondTeamScoreWrapper>
      {teamNames[1]} <br /> <Score>{scores[teamNames[1]]}</Score>
      </SecondTeamScoreWrapper>
    </TopBar>
  );
};

export default ScoreBoard;
