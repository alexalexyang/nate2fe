import Head from "../components/Head";
import Main from "../apps/main/index";
import { NextPage } from "next";
// import { useUser } from "../context/user";

const Home: NextPage = () => {
  // const { user } = useUser();

  return (
    <>
      <Head page="Home" />
      <Main />
    </>
  );
};

export default Home;
