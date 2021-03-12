import { Box, Container } from "@material-ui/core";

import Head from "../components/Head";
import showdown from "showdown";
import styled from "styled-components";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  tables: true,
  noHeaderId: true,
});

const ImgWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImg = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 40%;
  border: 1px solid lightgray;
  box-shadow: 2px 2px 5px gray;
`;

export default function About() {
  const about = require(`../apps/main/about.md`);
  const content = converter.makeHtml(about.default);

  return (
    <>
      <Head page="About" />
      <Container>
        <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
        <ImgWrapper>
          <a href="https://thispersondoesnotexist.com">
            <StyledImg src={`https://thispersondoesnotexist.com/image`} />
          </a>
          <p>
            This is definitely me lol generated by{" "}
            <a href="https://thispersondoesnotexist.com">
              thispersondoesnotexist
            </a>
            .
          </p>
        </ImgWrapper>
      </Container>
    </>
  );
}
