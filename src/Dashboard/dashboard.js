import { Button, TextField } from '@material-ui/core';
import React,{useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { NavLink, useHistory } from 'react-router-dom';
import { removeUserSession } from './../Utils/common';
import notify from './../Utils/notification'
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import $ from "jquery";
// import axios from 'axios'


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
      textTransform: 'uppercase'
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    quiz_card:{
        padding:"10px"
    }
  }));
export default function Dashboard(){
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [data,setData] = useState("print('Hello')")
    const [open, setOpen] = React.useState(false);
    const [result,setResult] = useState('Result')
    const logout=()=>{
        removeUserSession();
        notify.showSuccess('Logout Success')
        history.push('/')
    }
    const changeHandler =(e)=>{
        console.log(e.target.value)
        setData(e.target.value)
    }
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
    const onRun = ()=>{
          setResult("Running")
          $.ajax({url:'https://kamla.com.np/progman/ide/forBidhan.php',type: "POST",
          data:{"LanguageChoice": "5",
          "Program": data,
          "Input": "",
          "CompilerArgs" : ""}
        }).then((res)=>{
          // console.log(res)
          setResult(`Result:${res?.Result} ${res?.Errors} Status:${res.Stats}`)
        }).catch((error)=>{console.log(error)})
    }
    return(
       
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
            >
            <Toolbar>
            <span><img style={{filter: 'invert(100%)',width:'2em',height:'2em',marginRight: '.2em',marginLeft: '.5em'}} src="https://prog-man.web.app/logo.svg" alt="logo"/></span>
            <Typography variant="h6" className={classes.title}>
                    <NavLink exact to="/dashboard" style={{textDecoration:'none',color:'white'}}>Progman</NavLink>
            </Typography>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            </Toolbar>
            </AppBar>
            <main
                className={clsx(classes.content, {
                [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <TextField id="filled-multiline-flexible"
                value={data}
                fullWidth
                multiline
                rows={30}
                variant="filled"
                onChange={changeHandler}
                />
                <Button variant="contained" color="secondary" onClick={onRun}>Run</Button>
                <div style={{margin:"20px",padding:"10px"}}>
                  <p>{result}</p>
                </div>
            </main>
            <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <Typography variant="h6">Progman</Typography>
                </div>
                <Divider />
                <List>
                    <NavLink to="/cquiz" exact style={{textDecoration:"none"}}>
                    <ListItem button >
                        <ListItemText primary='Quiz'/>
                    </ListItem></NavLink>
                    <NavLink to="/quest" exact style={{textDecoration:"none"}}>
                    <ListItem button >
                        <ListItemText primary='Forum'/>
                    </ListItem></NavLink>
                    <NavLink to="/mquest" exact style={{textDecoration:"none"}}>
                    <ListItem button >
                        <ListItemText primary='Question Posted'/>
                    </ListItem></NavLink>
                    <ListItem button onClick={logout}>
                        <ListItemText primary='Logout'/>
                    </ListItem>
                </List>
            </Drawer>
            
        </div>
      
    )
}