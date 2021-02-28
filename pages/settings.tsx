import DeleteUser from "../components/DeleteUser";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { NextPage } from "next";
import { Typography } from "@material-ui/core";

const Settings: NextPage = () => {
  return (
    <>
      <Head page="Settings" />

      <Layout>
        <Typography variant="h3" aria-label="title">
          Settings.
        </Typography>
        <h4>Profile</h4>
        <p>Name: required</p>
        <p>Gender: not required</p>
        <p>Age: required</p>

        <DeleteUser />
      </Layout>
    </>
  );
};

export default Settings;
