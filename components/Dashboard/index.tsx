import Box from "@material-ui/core/Box";
import Item from "./Item";
import { NextPage } from "next";
import { items } from "./config";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin: 1rem 0;
  }
`;

const Dashboard: NextPage = () => {
  return (
    <Wrapper>
      {items.map((item, idx) => (
        <Item
          app={item.app}
          url={item.url}
          description={item.description}
          auth={item.auth}
          key={idx}
        />
      ))}
    </Wrapper>
  );
};

export default Dashboard;
