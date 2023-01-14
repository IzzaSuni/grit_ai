import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export const Login = () => {
  const [value, setValue] = useState({ username: "", password: "" });
  const handleChange = (event) => {
    const name = event.target.name;
    const values = event.target.value;
    setValue({ ...value, [name]: values });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("LOCALSTORAGE", user);

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify(value));
    setValue({ ...value });
  };
  const handleLogout = () => {
    localStorage.clear();
    setValue({ username: "", password: "" });
  };

  return (
    <Box
      width={"70%"}
      margin="16px auto"
      display={"flex"}
      justifyContent="center"
      flexDirection={"column"}
      alignItems="center"
      gap={"16px"}
    >
      <Typography variant="h4">Login</Typography>

      {user?.username && <Typography variant="h4">Selamat Datang</Typography>}
      <TextField
        onChange={handleChange}
        name="username"
        fullWidth
        label="username"
        value={value?.username}
      ></TextField>
      <TextField
        onChange={handleChange}
        name="password"
        fullWidth
        label="password"
        value={value?.password}
      ></TextField>
      <Button onClick={handleLogin} variant="contained">
        Submit
      </Button>
      {user?.username && (
        <Button onClick={handleLogout} variant="contained">
          Logout
        </Button>
      )}
    </Box>
  );
};
