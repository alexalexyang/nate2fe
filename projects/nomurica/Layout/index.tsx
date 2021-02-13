import React, { ReactNode } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Loading from "../../../components/Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { useUser } from "../../../context/user";

type Props = {
  children: ReactNode;
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Helvetica, sans-serif;
    background-color: #ba55d3;
    font-size: 1.5rem;
    color: #2e2b2b; 


  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: fadein 0.5s;

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
