import { Button } from "@material-ui/core";
import { NextPage } from "next";
import { StyledWarning } from "../styles/styles";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";

const ConfirmDiv = styled.div`
  button {
    margin-right: 1rem;
    height: 2rem;
    width: 3rem;
  }
`;

const DeleteUser: NextPage = () => {
  const router = useRouter();

  const [deleteError, setDeleteError] = useState(false);
  const [confirmPanel, setConfirmPanel] = useState(false);

  const deleteUser = async () => {
    let response = await fetch("/api/auth/delete-user");
    const { success } = await response.json();

    if (success === true) return router.push("/");
    setDeleteError(!success);
  };

  return (
    <>
      <h4>Delete my account</h4>
      {!confirmPanel && (
        <Button
          size="small"
          variant="contained"
          // color="primary"
          onClick={() => setConfirmPanel(true)}
        >
          Delete my account
        </Button>
      )}
      {confirmPanel && (
        <ConfirmDiv>
          <Button size="small" variant="contained" onClick={deleteUser}>
            Yes
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => setConfirmPanel(false)}
          >
            No
          </Button>
        </ConfirmDiv>
      )}
      <StyledWarning>This is irreversible.</StyledWarning>
      {deleteError && (
        <h6>
          Something didn't quite work out. We'd appreciate it if you let us
          know. Thank you.
        </h6>
      )}
    </>
  );
};

export default DeleteUser;
