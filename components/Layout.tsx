import React, { ReactNode } from "react";

import Loading from "./Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import styled from "styled-components";
import { useUser } from "../context/user";

type Props = {
  children: ReactNode;
};

const Main = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
`;

const Center = styled.div`
  padding: 0 1rem 0 1rem;
  display: flex;
  flex-direction: column;

  p {
    margin: 0.5rem 0;
  }

  h4 {
    margin: 1rem 0 0.5rem;
  }

  @media (min-width: 750px) {
    padding: 0;
    width: 45vw;
  }
`;

const MainLayout: NextPage<Props> = ({ children }: Props) => {
  const { user } = useUser();

  if (user && user.loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Main>
        <Center>{children!}</Center>
      </Main>
    </>
  );
};

export default MainLayout;
