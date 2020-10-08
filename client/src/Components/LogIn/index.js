import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Form from "../Form";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../Context/Auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { userLoginSchema } from "../../validation";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        BugTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default () => {
  const { loginHandler, isLoading, error } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleEmailInput = (event) => {
    setEmailError(false); // Reset error on input change
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPasswordError(false); // Reset error on input change
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    try {
      /** Validation of inputs */
      userLoginSchema.validateSync({ email, password }, { abortEarly: false });
      loginHandler(email, password);
    } catch (err) {
      /** Set errors on local state */
      const { errors } = err;
      for (const message of errors) {
        if (message.includes("Email")) setEmailError(true);
        if (message.includes("Password")) setPasswordError(true);
      }
    }
  };

  const loginButtonOrLoading = isLoading ? (
    <CircularProgress size={30} thickness={4} />
  ) : (
    <Button
      disabled={emailError || passwordError} // Disable button if any error is true
      fullWidth
      variant="contained"
      color="primary"
      className="submit"
      onClick={handleSubmit}
    >
      Sign In
    </Button>
  );

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
          <Form
            email={email}
            password={password}
            handleEmailInput={handleEmailInput}
            handlePasswordInput={handlePasswordInput}
            isEmailValid={emailError}
            isPasswordValid={passwordError}
          />
          <Typography variant="subtitle2" color="error">
            {error}
          </Typography>
          {loginButtonOrLoading}
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
};
