import React from 'react'
import { useEffect, useState } from 'react';
import Comments from '../shared/comments';
import './../Css/Pquestion.css';
import axios from 'axios';
import notify from './../Utils/notification'
import {getToken, getUser} from './../Utils/common';
import { useHistory } from 'react-router-dom';
function MQuestion() {
    const[questions,setQuestion]=useState()
    const history = useHistory()
    useEffect(()=>{
        axios.get('https://abdhesh.herokuapp.com/question/user',{
            headers:{"token":getUser()._id}})
        .then((res)=>{
           setQuestion(res.data);
        //    console.log(res)
        })
        .catch((err)=>{
            console.log(err.response)
        })
    },[questions])
    const onBack =()=>{
        history.push('/dashboard')
    }
    return (
        <div className="pquestion">
        <button onClick={onBack}>Back</button>
        <div className="pquestion_form">
            <h1> Question Asked</h1>
        </div>
        
        <div>
        {questions?.map((dat)=>
                <Comments key={dat._id} id={dat._id} username={dat.user} time={dat.createdAt} question={dat.question} answer={dat.answer} delete="true"/>
            )}
            {questions?"":"Please Post Some  Question on Forum"}
        </div>
        </div>
    )
}

export default MQuestion
