import React from "react";
import styled from "styled-components";

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr); /* Set number of columns dynamically */
  gap: 5px; /* Space between boxes */
  background-color: #000080; /* Jeopardy blue */
  padding: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 5px; /* Add spacing between columns */
`;

const CategoryTitle = styled.div`
  background: #0000cd; /* Blue */
  color: white;
  font-size: 22px; /* Adjust size */
  font-family: Impact, "Arial Black", sans-serif;
  text-transform: uppercase; /* All caps for category titles */
  text-align: center;
  padding: 15px;
  border: 2px solid white;
  min-height: 80px; /* Ensure consistent height for all category titles */
`;

const Tile = styled.div`
  background: #0000cd; /* Blue */
  color: #ffcc00; /* Gold */
  font-size: 28px; /* Larger font size for question values */
  font-family: Impact, "Arial Black", sans-serif;
  text-align: center;
  padding: 15px;
  border: 2px solid white;
  cursor: pointer;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  min-height: 100px; /* Ensure consistent height for all question tiles */
  &:hover {
    background: #1e90ff; /* Highlight on hover */
  }
`;

const GameBoard = ({ categories, onSelectQuestion, expand }) => {
  const totalItems = categories.length;
  const columns = Math.ceil(Math.sqrt(totalItems)); // Calculate columns
  const rows = Math.ceil(totalItems / columns); // Calculate rows

  return (
    <Board columns={expand ? columns : totalItems} style={
      {
        flexGrow: expand ? 1 : 0,
      }
    }>
      {categories.map((category, i) => (
        <Column key={i}>
          <CategoryTitle>{category.title}</CategoryTitle>
          {category.questions.map((q, j) => (
            <Tile
              key={`${i} for ${j} points`.toLocaleUpperCase()}
              disabled={q.answered}
              onClick={() => !q.answered && onSelectQuestion(i, j)}
            >
              {q.value}
            </Tile>
          ))}
        </Column>
      ))}
    </Board>
  );
};

export default GameBoard;
