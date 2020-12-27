import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './../Css/Comments.css'
import Reply from './Reply'
import notify from './../Utils/notification'
import { getUser } from '../Utils/common'


function Comments(props) {
    let data="true"
    const [reply,setReply]=useState({"display":"none"})
    const [text,setText]=useState("")
    const [user,setUser]=useState("")
    useEffect(()=>{
        axios.get(`https://abdhesh.herokuapp.com/auth/user/${props.username}`)
        .then((res)=>{setUser(res.data)})
        .catch((err)=>{console.log(err)})
    },[props.username])
    const replyClick=()=>{
        if(data){
            data=!data
            setReply({"display":"block"});
        }else{
            data=!data
            setReply({"display":"none"});
        }
        // console.log(props.answer)
    }
    const inputEvent=(event)=>{
        setText(event.target.value)
        // console.log(event.target.value)
        // console.log(data)
    }
    const submitIt = (e)=>{
        e.preventDefault();
        if(data.length>3){
            // console.log(data);
             
            axios.put(`https://abdhesh.herokuapp.com/question/${props.id}`,{answer:text},{
                headers:{token:getUser()._id}
            })
            .then((res)=>{
                // console.log(res)
                // setUser(res.data);
                setText('')
            })
            .catch((err)=>{ 
                console.log(err)
            })
            setText("");  
            }else{
                notify.showSuccess("Please fill question")
            }
    } 
    const onDelete =()=>{
        axios.delete(`https://abdhesh.herokuapp.com/question/${props.id}`,{headers:{token:getUser()._id}})
            .then((res)=>{
                // console.log(res)
                // setUser(res.data);
                // setText('')
                notify.showSuccess("Deleted")
            })
            .catch((err)=>{ 
                console.log(err)
            })
    }
    return (
        <div className="comments">
                <h4>{user?.toUpperCase()}</h4>
                <small>{props.time}</small>
                <h5>{props?.question}</h5>
                <div  style={reply}>
                    {props?.answer.map((dat,index)=><Reply key={index} ans={dat.ans} id={dat.auser}/>)}
                    <input type="text" placeholder="Reply here" value={text} onChange={inputEvent}/><button onClick={submitIt}>send</button>
                </div>
               <button onClick={replyClick}>{reply?"Reply":"HideReply"}</button>
               {props?.delete?<button onClick={onDelete}>Delete</button>:""}
        </div>
    )
}

export default Comments
