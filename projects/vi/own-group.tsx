import { Box, Container, Typography } from "@material-ui/core";
import { InviteForm, personalMessage } from "../../projects/vi";

import { NextPage } from "next";

const OwnGroup: NextPage = ({ user }) => {
  // If own group lacks invitees, check if should invite more
  // Render invite reminder if yes

  // Render group members

  //   console.log(user.groups.ownGroup);

  return (
    <>
      <Box>
        <Container>
          <Typography variant={"body1"}>
            You've started a support group for yourself. Please invite at least
            one person to check in on you once a week:
          </Typography>
        </Container>
        <Container>
          <InviteForm personalMessage={personalMessage} degree={0} />
        </Container>
      </Box>
    </>
  );
};

export default OwnGroup;
