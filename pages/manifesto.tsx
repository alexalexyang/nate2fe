import { Box, Container } from "@material-ui/core";

import Head from "../components/Head";
import showdown from "showdown";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  tables: true,
  noHeaderId: true,
});

export default function About() {
  const about = require(`../projects/main/white-paper.md`);
  const content = converter.makeHtml(about.default);

  return (
    <>
      <Head page="Manifesto" />
      <Container>
        <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
      </Container>
    </>
  );
}
