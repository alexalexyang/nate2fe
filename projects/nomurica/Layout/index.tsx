import React, { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Loading from "../../../components/Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { navBarHeight } from "../../../styles/style-constants";
import { useUser } from "../../../context/user";

type Props = {
  children: ReactNode;
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Helvetica, sans-serif;
    background-color: #cfa5da;
    font-size: 1.5rem;
    color: #2e2b2b;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;

    #__next {
      height: 100%;
      width: 100%;
    }
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  animation: fadein 0.5s;
  height: calc(100% - ${navBarHeight});

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const NomuricaLayout: NextPage<Props> = ({ children }: Props) => {
  const { user } = useUser();

  if (user && user.loading) return <Loading />;

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Main>{children!}</Main>
    </>
  );
};

export default NomuricaLayout;
