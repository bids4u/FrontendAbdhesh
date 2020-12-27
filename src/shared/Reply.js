import React from 'react';
import axios from 'axios';
import{ useEffect, useState } from 'react'
import './../Css/Reply.css'
function Reply(props) {
    const [user,setUser]=useState("");
    useEffect(()=>{
        axios.get(`https://abdhesh.herokuapp.com/auth/user/${props?.id}`)
        .then((res)=>{setUser(res.data)})
        .catch((err)=>{console.log(err.response)})
    },[props.id])
    return (
        <div className="reply">
            <h5>{user?.toLocaleUpperCase()}</h5>
            <p>{props?.ans}</p>
        </div>
    )
}

export default Reply
