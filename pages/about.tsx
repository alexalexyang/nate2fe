import { createStyles, makeStyles } from '@material-ui/core/styles';

import Head from '../components/Head'
import { Typography } from '@material-ui/core';

// import { Box } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '10px',
      marginBottom: '20px',
    },
  }),
);


export default function About() {
  const classes = useStyles();
  
  return (
    <>
      <Head page="About" />

      <main>
      <Typography variant='h3' aria-label="title">What's Vi?</Typography>
      
      <Typography variant='body1' className={classes.root}>
        It's a little service that emails you regularly to remind you to check in on your friends.
      </Typography>

      <Typography variant='h3' aria-label="title">What's this whole site?</Typography>
      
      <Typography variant='body1' className={classes.root}>
        This whole site is me making stuff I like. Sometimes, I make apps for friends.
      </Typography>

      <Typography variant='body1' className={classes.root}>
        I do this in my spare time. Maybe late at night after work. Maybe on a Sunday afternoon.
      </Typography>

      <Typography variant='body1' className={classes.root}>
        Everything here is experimental. None of it is a mature product.
      </Typography>

      <Typography variant='body1' className={classes.root}>
        So, if you're using this and experience a problem, don't complain or hate me. Tell me nicely. Or, even better, offer to code up solutions instead. Send pull requests to my git repo.
      </Typography>

      <Typography variant='body1' className={classes.root}>
        Thank you.
      </Typography>

      <Typography variant='h4' aria-label="subtitle">Will any of this go commercial?</Typography>
      
      <Typography variant='body1' className={classes.root}>
        I don't know. Maybe. I have a lot on my plate right now. Don't have time to think about it. Let's see how things go.
      </Typography>

      <Typography variant='h4' aria-label="subtitle">Can I support you?</Typography>
      
      <Typography variant='body1' className={classes.root}>
        Yes. I will set up a program to monitor the estimated costs of this site. You can then help me foot these costs if you like.
      </Typography>

      </main>
     </>
  );
}