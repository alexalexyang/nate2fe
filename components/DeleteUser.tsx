import { Button } from "@material-ui/core";
import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { useState } from "react";

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
      <p>This is irreversible.</p>
      {!confirmPanel && (
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => setConfirmPanel(true)}
        >
          Delete my account
        </Button>
      )}
      {confirmPanel && (
        <div>
          <button onClick={deleteUser}>Yes</button>
          <button onClick={() => setConfirmPanel(false)}>No</button>
        </div>
      )}
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
