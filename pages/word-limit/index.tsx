import { Box, Container } from "@material-ui/core";

import { NextPage } from "next";
import styled from "styled-components";
import { useState } from "react";

interface ColorProps {
  count: number;
  maxLength: number;
}

const handleColor = (count: number, maxLength: number) => {
  const half = 0.5 * maxLength;
  const threeQ = 0.75 * maxLength;
  const current = maxLength - count;

  if (current < half) {
    return "black";
  }

  if (current >= half && current <= threeQ) {
    return "green";
  }

  return "red";
};

const StyledTextArea = styled.textarea<ColorProps>`
  color: ${({ count, maxLength }) => handleColor(count, maxLength)};
  min-width: 100%;
  min-height: 400px;

  @media (min-width: 500px) {
    min-width: 500px;
  }
`;

const WordLimit: NextPage = () => {
  const [length, setLength] = useState(0);
  const [count, setCount] = useState(0);

  const handleLength = (e: any) => {
    const initialCount = e.target.value;
    setLength(parseInt(initialCount));
  };

  const handleCount = (e: any) => {
    const text = e.target.value;
    setCount(length - text.length);
  };

  return (
    <Box>
      <Container>
        <h1>Character counter</h1>
      </Container>
      <Container>
        <p>
          Enter character limit:{" "}
          <input type="number" min="0" onChange={handleLength}></input>
        </p>
      </Container>
      <Container>
        <StyledTextArea
          onChange={handleCount}
          maxLength={length}
          count={count}
        ></StyledTextArea>
      </Container>
      <Container>Remaining: {count}</Container>
    </Box>
  );
};

export default WordLimit;
