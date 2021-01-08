import { Box, Button, Container, Typography } from "@material-ui/core";

import InviteForm from "./invite-form";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

const personalMessage = `
Dear friend,\n
If I haven't already told you, I trust you a lot, and I value your wisdom a lot too.\n
These times might be a little trying on me. It'd help if I had some support. I'd love for you to check in on me once in a while.\n
Vi is a little experimental service that emails you once a week to remind you to do just that.\n
Would you help me in this way, please?\n
You can find out more about Vi here: LINK.\n
Sign up with this link and you'll be added to my support group: LINK.\n
Feel free to call/text me and I'll confirm this personally.\n
Thank you. :)\n
Sincerely,\n
Your dearest friend`;

const StartGroupForm: NextPage = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const startGroupFormHandler = async () => {
    let response = await fetch(`/api/vi/start-group`, {
      method: "POST",
      body: JSON.stringify({ degree: 0 }),
    });

    const { success } = await response.json();

    setShowForm(true);
  };

  return (
    <>
      <Box
        p="20px"
        display="flex"
        flexDirection="column"
        border="1px solid"
        borderColor="purple"
        borderRadius="10px"
      >
        <Typography variant="body1">
          Start a support group for yourself:{" "}
        </Typography>

        <Box mt="10px">
          <Button
            onClick={startGroupFormHandler}
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={false}
          >
            Start
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StartGroupForm;
