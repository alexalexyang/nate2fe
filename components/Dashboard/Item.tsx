import Box from "@material-ui/core/Box";
import Link from "next/link";
import { NextPage } from "next";
import PlayLottie from "../../utils/play-lottie";
import SvgHelper from "../SvgHelper";
import { useUser } from "../../context/user";
// import bird from "./logos/cute-bird.json";

interface IDashboard {
  app: string;
  url: string;
  description: string;
  auth: boolean;
}

const Dashboard: NextPage<IDashboard> = ({
  app,
  url,
  description,
  auth,
}: IDashboard) => {
  const { user } = useUser();
  // let Image = require(`./logos/${app}.svg`).default;
  let Image = require(`./logos/${app}.json`);

  if (!user!.auth && auth) {
    return null;
  }

  return (
    <Box display="flex" m={"10px"}>
      <Box m={"10px"}>
        {PlayLottie(Image, 300, 300)}
        {/* <SvgHelper fontSize={100}>
          <Image />
        </SvgHelper> */}
      </Box>
      <Box m={"10px"}>
        <h2>
          <Link href={`${url}`}>{app}</Link>
        </h2>
        <p>{description}</p>
      </Box>
    </Box>
  );
};

export default Dashboard;
