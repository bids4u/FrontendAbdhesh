import React, { useEffect, useState } from 'react';
import Comments from '../shared/comments';
import './../Css/Pquestion.css';
import axios from 'axios';
import notify from './../Utils/notification'
import {getToken, getUser} from './../Utils/common';
import { useHistory } from 'react-router-dom';
function Pquestion() {
    // console.log(getUser())
    const history = useHistory()
    const[data,setData]=useState("")
    const[question,setQuestion]=useState()
    useEffect(()=>{
        axios.get('https://abdhesh.herokuapp.com/question',{headers:{token:getUser()?._id}})
        .then((res)=>{
            if(question!=res.data){
                setQuestion(res.data);
            }
           
        //    console.log(res.data)
        })
        .catch(
            (err)=>console.log(err.response)
        )
    },[question])
    const inputEvent=(event)=>{
        setData(event.target.value)
        // console.log(event.target.value)
        // console.log(data)
    }
    onsubmit=(e)=>{
        e.preventDefault();
        if(data.length>5){
        // console.log(data);
         
        axios.post('https://abdhesh.herokuapp.com/question',{question:data},{headers:{token:getUser()?._id}})
        .then((res)=>{
            // console.log(res)
            setData("")
        })
        .catch((err)=>{ 
            console.log(err)
        })
        setData("");  
        }else{
            notify.showSuccess("Please fill question")
        }
     }
     const onBack =()=>{
        history.push('/dashboard')
    }
    return (
        <div className="pquestion">
         <button onClick={onBack}>Back</button>
            <div className="pquestion_form">
            <h1>Post a question</h1>
            <form>
                <textarea className="pquestion_form_input" type="text" placeholder="Do you h ave any question post here?" onChange={inputEvent} value={data} minLength="5" maxLength="1000"/><br/>
                <div>
                    {(data.length<5&&data.length!==0)?<small>Minimum length is 5</small>:""}
                    {(data.length>200&&data.length!==0)?<small>Maximum length is 200</small>:""}
                </div>
                <button onClick={onsubmit} type="submit">Submit</button><br/>
            </form>
            </div>
            
            <div>
            {question?.map((dat)=>
                <Comments key={dat._id} id={dat._id} username={dat.user?._id} time={dat.createdAt} question={dat.question} answer={dat.answer}/>
            )}
            {question?"Post Some question":"Loading Please wait"}
            </div>
        </div>
    )
}

export default Pquestion
