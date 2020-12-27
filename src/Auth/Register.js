import React, { useState } from 'react';
import {NavLink, useHistory} from "react-router-dom"
import axios from "axios";
import { auth,provider } from './../Utils/firebase';
// import Snack from "./../Snack/snack";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import notify from './../Utils/notification';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Register() {
  const [gopen,SetGopen] = useState(true);
  const history = useHistory();
  var nameRegex = /^[a-zA-Z\-]+$/;
  var mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  const signUp = ()=>{
    auth.signInWithPopup(provider)
    .then(result =>{
      SetGopen(false)
      axios.post('https://abdhesh.herokuapp.com/auth/register', {
        email:result.user.email,
        status:"active",
        name:result.user.displayName,
      })
      .then((response)=>{
              // SetGopen(true)
              // console.log(response);
              // notify.showSuccess(`${result.user.displayName} Please Signin with Google to continue`  )
              // history.push('/')
              axios.post('https://abdhesh.herokuapp.com/auth/login', {email:result.user.email,method:"google"})
              .then((response)=>{
                      SetGopen(true)
                      // console.log(response);
                      localStorage.setItem('token',JSON.stringify(response.data.token));
                      localStorage.setItem('user',JSON.stringify(response.data.user));
                      notify.showSuccess(`Welcome ${result.user.displayName}`)
                      history.push('/dashboard')
              })
              .catch((error)=>{
                      SetGopen(true)
                      notify.showInfo(error.response.data.message)
              })
      })
      .catch((error)=>{
              SetGopen(true)
              console.log(error.response)
              notify.showInfo(error.response.data.message)
      })
    })
    .catch(error =>{notify.showInfo(error.message)})
  }

    const classes = useStyles();
    const [data,SetData] = useState({userName:'',password:'',email:'',name:''});
    const [err,SetErr] = useState({userNameErr:'',passwordErr:'',emailErr:'',nameErr:''});
    const [open,SetOpen] = useState(true);
    const inputEvent=(event)=>{
        
        const {name,value} = event.target;
        SetData((preValue)=>{
            return{
                ...preValue,
                [name]: value 
            }
        })
    }

    const onSubmits=(event)=>{
      SetOpen(false)
      event.preventDefault();
      if(data.name.trim()==="" || !data.name.match(nameRegex) && data.name.length > 2){
        SetOpen(true)
        SetErr((preValue)=>{
            return{
                ...preValue,
                emailErr: "Please enter valid name"
            }})
    }
      else if(data.userName===""){
          SetOpen(true)
          SetErr((preValue)=>{
              return{
                  ...preValue,
                  emailErr: "Please enter username"
              }
          })
      }else if(data.password.length<6){
          SetOpen(true)
          SetErr((preValue)=>{
              return{
                  ...preValue,
                  emailErr: "Password Minimum Length is 6"
              }
          })
      }
      else if(data.email.trim()===""){
        SetOpen(true)
          SetErr((preValue)=>{
              return{
                  ...preValue,
                  emailErr: "Please enter email"
              }})
      }
      else if(!data.email.match(mailformat)){
        SetOpen(true)
          SetErr((preValue)=>{
              return{
                  ...preValue,
                  emailErr: "Enter a valid email"
              }})
      }
      else{
      axios.post('https://abdhesh.herokuapp.com/auth/register', data)
        .then(function (response) {
          console.log(response);
          SetData({userName:'',password:'',email:'',name:''});
          SetErr({userNameErr:'',passwordErr:'',emailErr:'',nameErr:''})
          
          // SetMessage("Check Your email to activate your account");
          // notify.showSuccess("Check Your email to activate your account")
          notify.showSuccess("Registration Successful!! Login to continue")
          SetOpen(true)
          history.push('/')
        })
        .catch(function (error) {
          // console.log(error.response);
          SetErr({userNameErr:'',passwordErr:'',emailErr:error.response.data.message,nameErr:''})
          notify.handleError(error)
          SetOpen(true);
        });
  }
}
    
    return (
      <>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* <Snack open={open} message={message} hclick={handleClick}/>  */}
        <small style={{color:"green"}}>{err.emailErr}</small><br/>
            <form className={classes.form} noValidate onSubmit={onSubmits}>
                <TextField type="text" label="Enter your name" fullWidth name="name" autoFocus onChange={inputEvent} value={data.name} required/><br/>
                <small style={{color:"red"}}>{err.nameErr}</small><br/>
                <TextField  type="text" label="Enter your Username" fullWidth name="userName" onChange={inputEvent}  value={data.userName} required /><br/>
                <small style={{color:"red"}}>{err.userNameErr}</small><br/>
                <TextField  type="password" label="Enter your password" fullWidth name="password" onChange={inputEvent} value={data.password} required/><br/>
                <small style={{color:"red"}}>{err.passwordErr}</small><br/>
                <TextField  type="email" label="Enter your email" fullWidth name="email" onChange={inputEvent} value={data.email} required/><br/>

                {open?<Button fullWidth variant="contained" color="primary" className={classes.submit} type="submit">Sign Up</Button>:<Button disabled fullWidth variant="contained" color="primary" className={classes.submit} >Signing Up</Button>}

                {gopen?<Button fullWidth variant="contained" color="primary" style={{backgroundColor:"red",marginTop:"20px"}}  onClick={signUp}>Sign Up With Google</Button>:<Button disabled fullWidth variant="contained" color="primary" style={{backgroundColor:"red",marginTop:"20px"}}  >Signing Up With Google</Button>}
                <Grid container justify="flex-end">
                <Grid item>
                <NavLink  variant="body2" exact to="/">Back to login</NavLink><br/><br/>
                </Grid>
                </Grid>
            </form><br/>
        </div>
        </Container>
      </>
    );
  }
  
  export default Register;