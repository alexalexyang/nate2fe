import React, { ReactNode } from "react";

import Loading from "../../../components/Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { useUser } from "../../../context/user";

type Props = {
  children: ReactNode;
};

const NomuricaLayout: NextPage<Props> = ({ children }: Props) => {
  const { user } = useUser();

  if (user && user.loading) return <Loading />;

  return (
    <>
      <Navbar />
      {children!}
    </>
  );
};

export default NomuricaLayout;
