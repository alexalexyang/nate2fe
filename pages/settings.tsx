import { Button, TextField, Typography } from "@material-ui/core";

import DeleteUser from "../components/DeleteUser";
import Head from "../components/Head";
import { NextPage } from "next";
import { StyledWarning } from "../styles/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  div {
    margin: 0.3rem 0;
  }

  @media (min-width: 500px) {
    button {
      width: 8rem;
    }
  }
`;

const initialState = {
  name: "Gwyneth",
  age: "38",
  birthday: undefined,
  gender: "blockchain unicorn",
  email: undefined,
  job: "Baker",
  country: undefined,
  city: undefined,
};

const Settings: NextPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [profile, setProfile] = useState(initialState);

  const profileValuesLength = Object.values(profile).filter((value) => !!value)
    .length;
  const profileKeysLength = Object.keys(profile).length;
  const profileComplete = (profileValuesLength / profileKeysLength) * 100;

  const onSubmit = (data: any) => {
    for (let key in data) {
      if (!data[key]) delete data[key];
    }
    setProfile({ ...profile, ...data });

    // Save new profile to database.
  };

  return (
    <>
      <Head page="Settings" />

      <Typography variant="h3" aria-label="title">
        Settings.
      </Typography>
      <h4>Profile</h4>

      <p>Your profile is {profileComplete}% complete.</p>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          name="name"
          label={`Name: ${profile.name ?? ""}`}
          placeholder="What's your name?"
          defaultValue={profile.name}
          variant="filled"
          type="text"
          inputRef={register({ maxLength: 32 })}
        />
        {errors.name && errors.name.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 32 characters.
          </StyledWarning>
        )}

        <TextField
          id="age"
          name="age"
          label={`Age: ${profile.age ?? ""}`}
          placeholder="What's your age?"
          defaultValue={profile.age}
          variant="filled"
          type="number"
          inputRef={register({ required: true, min: 18 })}
        />
        {errors.age && errors.age.type === "min" && (
          <StyledWarning>Minimum age must be 18.</StyledWarning>
        )}
        {errors.age && errors.age.type === "required" && (
          <StyledWarning>Age is required.</StyledWarning>
        )}

        <TextField
          id="birthday"
          name="birthday"
          label={`Birthday: ${profile.birthday ?? ""}`}
          defaultValue="2021-03-05"
          variant="filled"
          type="date"
          inputRef={register({ maxLength: 64 })}
        />
        {errors.birthday && errors.birthday.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 64 characters.
          </StyledWarning>
        )}

        <TextField
          id="email"
          name="email"
          label={`Email: ${profile.email ?? ""}`}
          placeholder="What's your email?"
          variant="filled"
          type="email"
          inputRef={register({ maxLength: 64 })}
        />
        {errors.email && errors.email.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 64 characters.
          </StyledWarning>
        )}

        <TextField
          id="gender"
          name="gender"
          label={`Gender: ${profile.gender ?? ""}`}
          placeholder="What's your gender?"
          variant="filled"
          type="text"
          inputRef={register({ maxLength: 32 })}
        />
        {errors.gender && errors.gender.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 32 characters.
          </StyledWarning>
        )}

        <TextField
          id="job"
          name="job"
          label={`Job: ${profile.job ?? ""}`}
          placeholder="What's your job?"
          variant="filled"
          type="text"
          inputRef={register({ maxLength: 64 })}
        />
        {errors.job && errors.job.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 64 characters.
          </StyledWarning>
        )}

        <TextField
          id="country"
          name="country"
          label={`Country: ${profile.country ?? ""}`}
          placeholder="What's your country?"
          variant="filled"
          type="text"
          inputRef={register({ maxLength: 64 })}
        />
        {errors.country && errors.country.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 64 characters.
          </StyledWarning>
        )}

        <TextField
          id="city"
          name="city"
          label={`City: ${profile.city ?? ""}`}
          placeholder="What's your city?"
          variant="filled"
          type="text"
          inputRef={register({ maxLength: 64 })}
        />
        {errors.city && errors.city.type === "maxLength" && (
          <StyledWarning>
            Name cannot have more than 64 characters.
          </StyledWarning>
        )}

        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          disabled={false}
        >
          Submit
        </Button>
      </StyledForm>

      <DeleteUser />
    </>
  );
};

export default Settings;
