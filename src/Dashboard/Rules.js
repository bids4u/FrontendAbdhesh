import React,{useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import {removeExam,getExam} from './../Utils/common'

// const useStyles = makeStyles((theme) => ({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//     },
//     nested: {
//       paddingLeft: theme.spacing(4),
//     },
//   }));

function Rules() {
  const {lang} = useParams()
  const exam = getExam()
  const [state, setstate] = useState(false)
  const history = useHistory()
  const changeHandler = ()=>{
      setstate(true)
  }
  const backButton = ()=>{
    removeExam()
    history.push('/cquiz')
}
  const clickHandler = ()=>{
      if(state===true){
        history.push(`/quiz/${lang}`)
      }else{
          alert("Please check the checkbox.")
      }
  }
  if(!exam){
    history.push('/cquiz')
    return (<div>Please Click on button to continue to give exam<NavLink to="/cquiz" exact>Click</NavLink></div>)
  }else{
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <IconButton onClick={backButton} edge="start"  color="inherit" aria-label="menu">
                    <KeyboardBackspaceIcon />
                <span><img style={{filter: 'invert(100%)',width:'2em',height:'2em',marginRight: '.2em',marginLeft: '.5em'}} src="https://prog-man.web.app/logo.svg" alt="logo"/></span>
                </IconButton>
                <Typography variant="h6" >
                    Progman
                </Typography>
                </Toolbar>
            </AppBar>
            <CssBaseline/>
            <Container maxWidth="sm">
            <Paper style={{marginTop:"40px",padding:"20px"}}>
            <Typography variant="h4"  style={{textAlign:'center'}}>Rules To Follow</Typography>
            Test:{lang}
            <ul style={{padding:'20px',margin:'20px'}}>
                <li>Do not try to copy from text-book, internet.</li>
                <li>It is for yourself so please concentrate rather than copying.</li>
                <li>Do not take help from friends.</li>
                <li>Complete your paper with in 15 Minutes.</li>
                <li>Submit your paper on time or it would be auto submitted</li>
                <li>Don't leave the page while giving exam or your exam may get cnacelled</li>
            </ul>
            <FormControlLabel
                control={
                <Checkbox
                    name="checkedB"
                    color="primary"
                    onChange={changeHandler}
                />
                }
                label="I hereby declare I accept all the rules mentioned above and would follow all rules."
            />
            <Button onClick={clickHandler} style={{margin:"10px"}} variant="contained" fullWidth color="primary">
                Next
            </Button>
            </Paper>
      </Container>
        </div>
    )}
}

export default Rules
