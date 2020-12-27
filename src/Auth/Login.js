import React, { useState } from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { auth,provider } from './../Utils/firebase';
import notify from './../Utils/notification';
import axios from "axios";
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


function Login() {
    
    const classes = useStyles();
    const history = useHistory()
    const [data,SetData] = useState({userName:'',password:''});
    const [err,SetErr] = useState({userNameErr:'',passwordErr:'',Err:''});
    const [dis,setDis] = useState(true);
    const [gdis,setgDis] = useState(true);
    const signIn = ()=>{
      auth.signInWithPopup(provider)
      .then(result =>{
        setgDis(false)
        axios.post('https://abdhesh.herokuapp.com/auth/login', {email:result.user.email,method:"google"})
        .then((response)=>{
                setgDis(true)
                // console.log(response);
                localStorage.setItem('token',JSON.stringify(response.data.token));
                localStorage.setItem('user',JSON.stringify(response.data.user));
                notify.showSuccess(`Welcome ${result.user.displayName}`)
                history.push('/dashboard')
        })
        .catch((error)=>{
                setgDis(true)
                notify.showInfo(error.response.data.message)
        })
      })
      .catch(error =>{notify.showInfo(error.message)})
    }
    const inputEvent=(event)=>{
        
        const {name,value} = event.target;
        SetData((preValue)=>{
            return{
                ...preValue,
                [name]: value 
            }
        })
    }

    const onSubmits=async (event)=>{
            setDis(false)
            event.preventDefault();
            if(data.userName===""){
                setDis(true)
                SetErr((preValue)=>{
                    return{
                        ...preValue,
                        userNameErr: "Please enter username"
                    }
                })
            }else if(data.password.length<6){
                setDis(true)
                SetErr((preValue)=>{
                    return{
                        ...preValue,
                        passwordErr: "Minimum Length is 6"
                    }
                })
            }else{
           axios.post('https://abdhesh.herokuapp.com/auth/login', data)
              .then(function (response) {
                console.log(response);
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('user',JSON.stringify(response.data.user));
                notify.showSuccess(`Welcome ${data.userName}`)
                setDis(true)
                SetData({userName:'',password:''});
                SetErr({userNameErr:'',passwordErr:''})
                history.push("/profile");
              })
              .catch(function (error) {
                setDis(true)
                // console.log(error)
                SetErr({Err:error.response.data.message})
                // notify.handleError(error)
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
          Sign in
      </Typography>
      <small style={{color:"red"}}>{err.Err}</small><br/>
        <form className={classes.form} noValidate onSubmit={onSubmits}>
            <TextField variant="outlined" margin="normal" autoFocus fullWidth type="text" label="Enter your Username" name="userName" onChange={inputEvent}  value={data.userName}/><br/>
            <small style={{color:"red"}}>{err.userNameErr}</small><br/>
            <TextField variant="outlined" margin="normal" fullWidth type="password" label="Enter your password" name="password" onChange={inputEvent} value={data.password}/><br/>
            <small style={{color:"red"}}>{err.passwordErr}</small><br/>
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            {dis?<Button  fullWidth variant="contained" color="primary" className={classes.submit} type="submit">Sign In</Button>:<Button disabled fullWidth variant="contained" color="primary" className={classes.submit} >Signing In</Button>}
            <Grid container>
            <Grid item xs>
              {/* <NavLink  exact to="/forget" variant="body2">
                Forgot password?
              </NavLink> */}
            </Grid>
            <Grid item>
              <NavLink  exact to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
          {gdis?<Button fullWidth variant="contained" color="primary" style={{backgroundColor:"red",marginTop:"20px"}}  onClick={signIn}>Sign In With Google</Button>:<Button disabled fullWidth variant="contained" color="primary" style={{backgroundColor:"red",marginTop:"20px"}}>Signing With Google</Button>}
        </form><br/>
        </div>
        </Container>
      </>
    );
  }
  
  export default Login;