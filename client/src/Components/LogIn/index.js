import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Form from '../Form';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from "react-router-dom";
import {signIn} from "../../Service/auth";
import './style.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BugTracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LogIn() {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = () => {

    if (email !== "" && password !== "") {
      signIn(email, password);
      
      console.log(email, password);

    } else {
      console.log("both fields are required");
    }

  }

  return (
    <Grid container component="main" className="grid">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="image" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Form email={email} password={password} handleEmailInput={handleEmailInput} handlePasswordInput={handlePasswordInput}/>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <RouterLink to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </RouterLink>
            </Grid>
          </Grid>
          <Box mt={5}>
              <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}