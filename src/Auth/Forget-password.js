import React, { useState } from 'react';
import {NavLink } from "react-router-dom"
import axios from "axios";
import Container from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import notify from './../Utils/notification'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
const ForgetPassword = ()=>{
    const classes = useStyles();
    const [email,setEmail]=useState("");
    const inputEvent=(event)=>{
        setEmail(event.target.value);
    }
    const fn = (event)=>{
        event.preventDefault();
        axios.post('https://gentle-brook-02164.herokuapp.com/auth/forget', {email:email})
        .then(function (response) {
          setEmail("");
          notify.showSuccess("Check your email for reset link")
        })
        .catch(function (error) {
            console.log(error.response)
            notify.showWarnings(error.response.data.message);
        });
    }
    return (
        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">Forget Password</Typography>
            <form className={classes.form} noValidate onSubmit={fn}>
            <TextField type="email" variant="outlined" margin="normal" autoFocus fullWidth label="Enter your email"  value={email} onChange={inputEvent} /><br/><br/>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >Submit</Button><br/><br/>
            </form>
            <NavLink exact to="/" style={{textDecoration:"none"}}>Back to Login</NavLink>
        </div>
        </Container>
        </>
    )
}
export default ForgetPassword;