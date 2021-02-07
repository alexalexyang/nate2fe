import styled, { StyledComponent, css } from "styled-components";

type Component = StyledComponent<"div", {}> & {
  Header: StyledComponent<"div", {}>;
  Body: StyledComponent<"div", {}>;
  Footer: StyledComponent<"div", {}>;
};

export const StyledCard = styled.div`
  width: 100%;
  height: 100%;
` as Component;

StyledCard.Header = styled.div`
  h1,
  h2,
  h3,
  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

StyledCard.Body = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  text-justify: inter-word;

  > * {
    margin: 0.5rem 0;
  }

  @media (min-width: 500px) {
    align-items: center;

    img {
      max-width: 50%;
      box-shadow: 1px 1px 5px lightgray;
    }
  }
`;

StyledCard.Footer = styled.div`
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid lightgray;
  text-align: right;
  a {
    color: #0084ff;
  }
`;

export const Card = styled.div`
  > * {
    margin: 1rem 0;
    padding: 1rem;
    width: 100%;
    max-height: 1500px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 1px 1px 5px lightgray;

    :hover {
      background-color: lightgoldenrodyellow;
    }
  }
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Poster = styled.div<{ url: string; height?: number; alt: string }>`
  ${(props) =>
    css`
      background-image: url("${props.url}");
      background-size: contain;
      background-repeat: no-repeat;
      height: ${props.height ?? 400}px;
      width: 60%;
    `}
`;

export const Summary = styled.div`
  > * {
    height: inherit;
  }

  ${StyledCard} {
    overflow: auto;
  }
`;
