import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Question from './Question';
import Timer from 'react-compound-timer';
import {  NavLink, useHistory, useParams } from "react-router-dom";
import $ from "jquery";
import notify from './../Utils/notification';
import {getUser,removeExam,getExam} from './../Utils/common'

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
  },
  stopwatch:{
    padding:0,
    margin:0,
    height:"5vh"
  }
}));

export default function Quiz() {
  const user = getUser();
  const {lang} = useParams();
  const classes = useStyles();
  const history = useHistory();
  // const theme = useTheme();
  const [qsetid, setQsetid] = useState('')
  const [qset,setQset] = useState()
  const [open, setOpen] = React.useState(false);
  const [anser,setAnswer] = useState({uid:"",'qset':qsetid,ansSet:[]})
  var left = false;
  useEffect(()=>{
    $.ajax({url:'https://kamla.com.np/progman/test/test.php',type: "POST",data:{qset:lang.toLowerCase()}
      }).then((res)=>{
        console.log(res)
        res = JSON.parse(res)
        setQsetid(res.qsetID)
        setQset(res.qset)
        setAnswer({uid:user.name,'qset':res.qsetID,ansSet:[]})
      })
      .catch((error)=>{
        // console.log(error)
        notify.showInfo('Unable to fetch Questions')
      })
  },[qsetid,lang,user.name])
 

  const sAnswer = (ans)=>{
    setAnswer((prevValue)=>{
      prevValue.ansSet.forEach((item,index)=>{
        if(item?.qid===ans.qid){
          let newAns = prevValue.ansSet;
          if(index>=0){
            newAns.splice(index,1)
          }
          return newAns
        }
      })
      return{uid:prevValue.uid,'qset':prevValue.qset,ansSet:[...prevValue.ansSet,ans]}
    })
  }

  const onSubmit =()=>{
    if(anser.ansSet.length===0){
      notify.showInfo("Please select some answer")}
    else if(anser.ansSet.length < qset.length){
      notify.showInfo("Please select all answer")}
    else{
    $.ajax({url:'https://kamla.com.np/progman/test/submit.php',type: "POST",data:{ansList:anser}
      }).then((res)=>{
        // console.log(res)
        localStorage.setItem('ExamResult',JSON.stringify({len:qset.length,result:res}))
        // alert(`Full Marks:${qset.length} Obtained Marks:${res.obtainedMark}`)
        removeExam();
        history.push('/result')
      }).catch((error)=>{
        // console.log(error)
        notify.showInfo("Error Submitting Answer")
        
      })
    }
  }
  const handlerCopy = (e)=> {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    alert('Don\'t copy it!');
  }
  const handlerMoveLeave = ()=> {
    // console.log(' leave called')
    // left = true;
    // notify.showInfo('Don\'t leave the page! Your exam might get cancelled');
    // setTimeout(()=>{
    //   if(left){
    //   notify.showWarnings("Your Exam has been Cancelled");
    //   removeExam()
    //   history.push('/')
    //   }
    // },5000)
    if(getExam()){
      left = true;
      if (left){
      notify.showInfo('Don\'t leave the page! Your exam might get cancelled');
      }
      setTimeout(()=>{
        if(left){
        notify.showWarnings("Your Exam has been Cancelled");
        removeExam()
        history.push('/')
          left = false;
        }
      },5000)
  
    
  }}
  
  const handlerMoveEnter =()=>{
    // console.log(' enter called')
    left=false;
  }
  if (!getExam()){
    history.push('/cquiz')
    return (<div>Please Click on button to continue to give exam<NavLink to="/cquiz" exact>Click</NavLink></div>)
  }else{
  return (
    <div style={{scrollbarColor:"white"}}  className={classes.root} onCopy={handlerCopy} onCut={handlerCopy}  onMouseEnter={handlerMoveEnter} onMouseLeave={handlerMoveLeave}>
    {/* <Prompt
          message={location => `Are you sure you quit quiz to go to ${location.pathname}`}
        /> */}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <span><img style={{filter: 'invert(100%)',width:'2em',height:'2em',marginRight: '.2em',marginLeft: '.5em'}} src="https://prog-man.web.app/logo.svg" alt="logo"/></span>
          <Typography variant="h6" noWrap className={classes.title}>
            Quiz-{qsetid}
          </Typography>  
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        
        <div className={classes.drawerHeader} />
        <Timer
              initialTime={15*60*1000}
              direction="backward"
              checkpoints={[
            {
                time: 0,
                callback: () => onSubmit(),
            },
                          ]}
          >
            Time Left:<Timer.Minutes /> minutes
            <Timer.Seconds /> seconds
          </Timer>
        <Container component="main" maxWidth="xs" style={{overflow: 'scroll',height:'80vh'}}>
          {qset?.map((item)=><Question key={item.qn} qid={item.qid} qn={item.qn} question={item.ques} option1={item.ans[0]} option2={item.ans[1]} option3={item.ans[2]} option4={item.ans[3]} ans={sAnswer} code={item.code}/> )}
          <Button variant="contained" color="secondary" onClick={onSubmit}>Submit</Button>
        </Container>
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
      </Drawer>
    </div>
  );}
}