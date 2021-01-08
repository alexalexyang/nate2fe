import { NextPage } from 'next'
import { Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'
import { useState } from 'react'

const DeleteUser: NextPage = () => {
  const router = useRouter()

  const [deleteError, setDeleteError] = useState(true)

  const deleteUser = async () => {
    let response = await fetch('/api/auth/delete-user')
    const { success } = await response.json()
    
    if (success === true) return router.push("/")
    setDeleteError(success)
  }

  return (
    <>
        <Typography variant='h6' aria-label="title">DeleteUser.</Typography>
        <button onClick={deleteUser}>Delete my profile.</button>
        {deleteError === false && <Typography variant='h3' aria-label="Delete user error message">Something didn't quite work out. We'd appreciate it if you let us know. Thank you.</Typography>}
    </>
  )
}

export default DeleteUser