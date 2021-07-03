import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";

export const Form = props => {
  const {
    values: { username, password  },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;
  console.table(props);

  const change = (username, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(username, true, false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        helperText={touched.username ? errors.username : ""}
        error={Boolean(errors.username)}
        label="Name"
        value={username}
        onChange={handleChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NameIcon />
            </InputAdornment>
          )
        }}
      />
      <div>{Boolean(errors.username) ? errors.username : ""}</div>

      <div>{Boolean(errors.email) ? errors.email : ""}</div>
      <TextField
        name="password"
        helperText={touched.password ? errors.password : ""}
        error={Boolean(errors.password)}
        label="Password"
        fullWidth
        type="password"
        value={password}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          )
        }}
      />
      <div>{errors.password}</div>

      <div>{errors.confirmPassword}</div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!isValid}
      >
        Login
      </Button>
    </form>
  );
};
