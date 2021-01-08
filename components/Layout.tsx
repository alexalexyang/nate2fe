import { Box, Container } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { useUser } from "../context/user";

type Props = {
  children: ReactNode;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
  })
);

const MainLayout: NextPage<Props> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const classes = useStyles();
  const { user } = useUser();

  if (user && user.loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Box className={classes.root}>
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  );
};

export default MainLayout;
