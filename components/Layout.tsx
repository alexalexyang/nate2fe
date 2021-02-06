import React, { ReactNode } from "react";

import Loading from "./Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { useUser } from "../context/user";

type Props = {
  children: ReactNode;
};

const MainLayout: NextPage<Props> = ({ children }: Props) => {
  const { user } = useUser();

  if (user && user.loading) return <Loading />;

  return (
    <>
      <Navbar />
      {children!}
    </>
  );
};

export default MainLayout;
