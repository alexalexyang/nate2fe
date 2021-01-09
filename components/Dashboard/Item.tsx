import Box from "@material-ui/core/Box";
import Link from "next/link";
import { NextPage } from "next";
import PlayLottie from "../../utils/play-lottie";
import styled from "styled-components";
import { useUser } from "../../context/user";
interface IDashboard {
  app: string;
  url: string;
  description: string;
  auth: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  background-color: #ffe6e9;
  box-shadow: 1px 1px 5px lightgray;

  :hover {
    cursor: pointer;
    background-color: lightyellow;
  }

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const Dashboard: NextPage<IDashboard> = ({
  app,
  url,
  description,
  auth,
}: IDashboard) => {
  const { user } = useUser();
  let Image = require(`./logos/${app}.json`);

  if (!user!.auth && auth) {
    return null;
  }

  return (
    <Link href={`${url}`}>
      <Wrapper>
        <Box m={"10px"}>{PlayLottie(Image, 200, 200)}</Box>
        <Box m={"10px"}>
          <h2>{app}</h2>
          <p>{description}</p>
        </Box>
      </Wrapper>
    </Link>
  );
};

export default Dashboard;
