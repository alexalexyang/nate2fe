import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

import { NextPage } from "next";
import fetch from "isomorphic-unfetch";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  name1: string;
  email1: string;
  message1: string;
  "second-supporter-options"?: string;
  name2?: string;
  email2?: string;
  message2?: string;
}

interface InviteFormProps {
  personalMessage: string;
  degree: number;
}

const InviteForm: NextPage<InviteFormProps> = ({ personalMessage, degree }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [disable2ndSupporter, setDisable2ndSupporter] = useState<boolean>(
    false
  );
  const [submitError, setSubmitError] = useState(true);
  const { register, handleSubmit, errors } = useForm<FormData>({});

  return (
    <>
      <form
        onSubmit={handleSubmit(async (formData: FormData) => {
          setSubmitting(true);
          let response = await fetch(`/api/vi/invite`, {
            method: "POST",
            body: JSON.stringify({ ...formData, degree }),
          });

          const { success, invited, alreadyInvited } = await response.json();
          // put invited and alreadyInvited into context
          if (success === true) return console.log("Success");
          setSubmitError(success);
          setSubmitting(false);
        })}
      >
        {" "}
        <Box display="flex" flexDirection="column">
          <Box mt="10px" mb="10px" display="flex" flexDirection="column">
            <Typography variant={"h6"}>Supporter 1</Typography>
            {!submitError && (
              <Typography variant="h3" aria-label="Submit form error message">
                Something didn't quite work out. We'd appreciate it if you let
                us know. Thank you.
              </Typography>
            )}
            <TextField
              id="name1"
              label="Name"
              placeholder="What's their name?"
              variant="filled"
              name="name1"
              type="text"
              inputRef={register({ required: "required" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <TextField
              id="email1"
              label="Email"
              placeholder="What's their email?"
              variant="filled"
              name="email1"
              type="email"
              inputRef={register({ required: "required" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <TextField
              id="message1"
              label="Message"
              defaultValue={personalMessage}
              variant="filled"
              name="message1"
              multiline={true}
              rows={15}
              inputRef={register({ required: "required" })}
            />
            {errors.message && <p>{errors.message.message}</p>}
          </Box>

          <Box mt="10px" mb="10px" display="flex" flexDirection="column">
            <Typography variant={"h6"}>Supporter 2</Typography>
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup
              aria-label="Second supporter options"
              name="second-supporter-options"
            >
              <FormControlLabel
                inputRef={register()}
                value="ask first supporter"
                control={<Radio />}
                label="Ask first supporter to find a second supporter for me."
                onChange={() => setDisable2ndSupporter(false)}
              />
              <FormControlLabel
                inputRef={register()}
                value="find later"
                control={<Radio />}
                label="I'll find a second supporter later."
                onChange={() => setDisable2ndSupporter(false)}
              />
              <FormControlLabel
                inputRef={register()}
                value="no need"
                control={<Radio />}
                label="I don't need a second supporter."
                onChange={() => setDisable2ndSupporter(false)}
              />
              <FormControlLabel
                inputRef={register()}
                value="true"
                control={<Radio />}
                label="I'll invite one now."
                onChange={() => setDisable2ndSupporter(true)}
              />
            </RadioGroup>

            {disable2ndSupporter && (
              <>
                <TextField
                  id="name2"
                  label="Name"
                  placeholder="What's their name?"
                  variant="filled"
                  name="name2"
                  type="text"
                  inputRef={register({ required: "required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <TextField
                  id="email2"
                  label="Email"
                  placeholder="What's their email?"
                  variant="filled"
                  name="email2"
                  type="email"
                  inputRef={register({ required: "required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <TextField
                  id="message2"
                  label="Message"
                  defaultValue={personalMessage}
                  variant="filled"
                  name="message2"
                  multiline={true}
                  rows={15}
                  inputRef={register({ required: "required" })}
                />
                {errors.message && <p>{errors.message.message}</p>}
              </>
            )}
          </Box>
          <Button type="submit" size="large" disabled={false}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default InviteForm;
