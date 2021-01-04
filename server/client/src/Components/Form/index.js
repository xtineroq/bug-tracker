import React from "react";
import TextField from "@material-ui/core/TextField";
import "./style.css";

function Form({
  handleEmailInput,
  handlePasswordInput,
  isEmailValid,
  isPasswordValid,
}) {
  return (
    <form className="form">
      <TextField
        error={isEmailValid ? true : false}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        onChange={handleEmailInput}
        autoComplete="email"
        autoFocus
      />
      <TextField
        error={isPasswordValid ? true : false}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        onChange={handlePasswordInput}
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </form>
  );
}

export default Form;
