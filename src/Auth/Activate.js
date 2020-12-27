import React, { useState } from 'react';
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
export default function  Activate(){
    const {id} = useParams();
    const [msg,SetMsg] = useState('');
    axios.get('https://gentle-brook-02164.herokuapp.com/auth/activate/'+id)
    .then((response)=>{
        // console.log(response);
        SetMsg(response.data.msg);
    })
    .catch((error)=>{
        // console.log(error.response.data.message.message);
        SetMsg(error.response.data.message.message)
    })
    return(
        <div className="activate">
           <p> {msg}</p>
           <p>Go to <NavLink exact to="/">Login</NavLink></p>
        </div>
    )
}