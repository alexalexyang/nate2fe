import { Box, Container, Typography } from "@material-ui/core";
import {
  InviteForm,
  OwnGroup,
  StartGroupForm,
  personalMessage,
} from "../../projects/vi";

import Loading from "../../components/Loading";
import { NextPage } from "next";
import useApi from "../../utils/use-api";
import { useEffect } from "react";
import { useUser } from "../../context/user";

const Vi: NextPage = () => {
  const { response, error, loading } = useApi("/api/vi/get-user");
  const { user, setUser } = useUser();

  useEffect(() => {
    if (response && user) {
      setUser({ ...user, groups: response.groups, loading: false });
    }
  }, [response]);

  if (loading) return <Loading />;

  return (
    <>
      <Box>
        <Typography variant="body1">About Vi</Typography>
      </Box>
      <Typography variant="h3" aria-label="title">
        Vi
      </Typography>

      {/* Invites to join other groups */}

      {/* Start group button */}
      {user && user.groups && !user.groups.ownGroup && <StartGroupForm />}

      {/* Own group */}
      {user && user.groups && user.groups.ownGroup && <OwnGroup user={user} />}

      {/* My other groups, get from user object */}
    </>
  );
};

export default Vi;
