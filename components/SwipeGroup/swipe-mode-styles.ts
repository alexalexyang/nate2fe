import styled from "styled-components";

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  > * {
    width: 95%;
    height: 70%;

    @media (min-width: 750px) {
      width: 30rem;
      height: 40rem;
    }
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  > * {
    margin: 0 0.5rem;
  }
`;
