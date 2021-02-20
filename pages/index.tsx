import Dashboard from "../components/Dashboard";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { Typography } from "@material-ui/core";
// import { useUser } from "../context/user";

const Home: NextPage = () => {
  // const { user } = useUser();

  return (
    <>
      <Head page="Home" />

      <Layout>
        <Typography variant="h3" aria-label="title">
          Welcome.
        </Typography>

        <Dashboard />
      </Layout>
    </>
  );
};

export default Home;
