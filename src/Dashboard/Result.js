import React from 'react';
import { useHistory } from 'react-router-dom';
import {getExamResult,removeExamResult} from './../Utils/common';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

function Result() {
    const history = useHistory()
    var result = getExamResult()
    const backButton = ()=>{
        removeExamResult()
        history.push('/cquiz')
    }
    // console.log(result)
    if(result){
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
        <div style={{display: 'flex',justifyContent: 'center',alignItems:'center', height:'80vh'}}>
            <div>
            {result?.result.result==="pass"?<img style={{width:'150px'}} src="https://img1.pnghut.com/17/17/13/JtbyERT8v6/website-brand-ico-finger-silhouette.jpg" alt='success'/>:<img style={{width:'150px'}} src='https://www.vhv.rs/dpng/d/180-1809719_payment-failure-svg-png-icon-free-download-payment.png' alt='failure'/>}
            {result?.result.result==="pass"?<h3>Horray!! you passed</h3>:<h3>Sorry! You Failed   </h3>} 
            <h3>FullMarks:{result?.result.fullMark}</h3>
            <h3>Obtained Marks:{result.result.obtainedMark}</h3>
            </div>
        </div>
        </div>
    )}
    else{
        history.push('/cquiz')
        return null;
    }
}

export default Result
