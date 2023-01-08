import React, { useState } from "react"
import { Grid, TextField, Paper, Button, CircularProgress, Box } from "@mui/material"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { loginUrl } from "../constants/cartConstants"

const Login = () => {
  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState("")
  const [loaderBtn, setBtnLoader] = useState(false)

  const history = useHistory()

  const handleChange = (fieldName, e) => {
    setLoginCreds({ ...loginCreds, [fieldName]: e.target.value })
  }

  const handleLogin = () => {
    setBtnLoader(true)
    axios
      .post(loginUrl, loginCreds)
      .then((res) => {
        if (res?.status === 200) {
          window.localStorage.setItem("token", res.data.token)
          history.push("/mystore/category")
        } else {
          setError("Invalid username or passoword")
        }
        setBtnLoader(false)
      })
      .catch((err) => {
        setError("Invalid username or passoword")
        setBtnLoader(false)
      })
    
  }

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid container spacing={3} direction={"column"} justify={"center"} alignItems={"center"}>
          <Grid item xs={12}>
            <TextField
              label='Username'
              value={loginCreds.username || ""}
              onChange={(e) => handleChange("username", e)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              value={loginCreds.password || ""}
              type={"password"}
              onChange={(e) => handleChange("password", e)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            {!loaderBtn ? (
              <Button fullWidth onClick={handleLogin}>
                {" "}
                Login{" "}
              </Button>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
        <p className='errorLoginPage'>{error}</p>
      </Paper>
    </div>
  )
}

export default Login
