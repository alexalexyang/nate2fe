import DeleteUser from "../../components/DeleteUser";
import Head from "../../components/Head";
import { NextPage } from "next";
import { Typography } from "@material-ui/core";

const Settings: NextPage = () => {
  return (
    <>
      <Head page="Settings" />

      <main>
        <Typography variant="h3" aria-label="title">
          Settings.
        </Typography>
        <DeleteUser />
      </main>
    </>
  );
};

export default Settings;
