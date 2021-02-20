import styled from "styled-components";

export const StyledCardGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80%;

  > * {
    width: 90%;
    height: 70%;

    @media (min-width: 750px) {
      width: 30rem;
    }
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  height: 20%;

  > * {
    margin: 0 0.5rem;
  }
`;
