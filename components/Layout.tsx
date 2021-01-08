import { Box, Container } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import Navbar from "./NavBar";
import { NextPage } from "next";
import { useUser } from "../context/user";

type Props = {
  children: NextPage;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "50px",
    },
  })
);

const MainLayout: NextPage<Props> = ({ children }) => {
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
