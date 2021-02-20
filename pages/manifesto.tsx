import { Box, Container } from "@material-ui/core";

import Head from "../components/Head";
import Layout from "../components/Layout";
import showdown from "showdown";
import styled from "styled-components";

const converter = new showdown.Converter({
  simpleLineBreaks: true,
  tables: true,
  noHeaderId: true,
});

export default function About() {
  const about = require(`../projects/main/manifesto.md`);
  const content = converter.makeHtml(about.default);

  return (
    <Layout>
      <Head page="Manifesto" />
      <Container>
        <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
      </Container>
    </Layout>
  );
}
