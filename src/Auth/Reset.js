import React, { useState } from 'react';
import {useParams} from "react-router-dom"
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

const Reset = ()=>{
    const classes = useStyles();
    const {id} = useParams();
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const [err,setErr]=useState("");
    const inputEvent=(event)=>{
        setPassword(event.target.value);
    }
    const inputEvent2=(event)=>{
        setCpassword(event.target.value);
    }
    const fn = ()=>{
        if(password.length<6){
            setErr("Min Length is 6");
        }
        else if(password===cpassword){
        axios.post('https://gentle-brook-02164.herokuapp.com/auth/reset-password/'+id, {'password':cpassword})
        .then(function (response) {
          console.log(response);
          setPassword("");
          setCpassword("");
          setErr("")
          notify.showSuccess("Password reset")
        })
        .catch(function (error) {
            setErr(error.response.data.message)
            console.log(error)
            console.log(error.response.data.message);
            notify.showWarnings(error.response.data.message)
            
        });}else{
            setErr("Password does not match");
        }
    }
    return (
        <>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">Reset Password</Typography>
            <small style={{color:"red"}}>{err}</small><br/>
            <TextField  type="password" variant="outlined" margin="normal" autoFocus fullWidth  label="New Password" value={password} onChange={inputEvent} /><br/><br/>
            <TextField type="password" variant="outlined" margin="normal" autoFocus fullWidth label="Confirm Password" value={cpassword} onChange={inputEvent2} /><br/><br/>
            <Button  type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={fn}>Submit</Button><br/><br/>
            </div>
        </Container>
        </>
    )
}
export default Reset;