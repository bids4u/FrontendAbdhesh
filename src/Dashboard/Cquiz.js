import React from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

function Cquiz() {
  const classes = useStyles()
  const history = useHistory()
  const P_lang = ['Python','Java','C++','JavaScript','C#','C']
  const handleClick = (value) => {
    // console.log(value)
    localStorage.setItem('exam',true)
    history.push(`/rules/${value}`)
  };
  const backButton = ()=>{
      history.push('/dashboard')
  }
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
            <Container component="main" maxWidth="xs">
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    Choose a Programming Language for quiz
                    </ListSubheader>
                }
                className={classes.root}
                >
                {P_lang.map((item,index)=><ListItem onClick={()=>handleClick(item)} style={{backgroundColor:'whitesmoke',margin:'10px',textAlign:'center'}} key={index} button>
                    <ListItemText primary={item} />
                </ListItem> )}
                           
                </List>
            </Container>
        </div>
    )
}

export default Cquiz
