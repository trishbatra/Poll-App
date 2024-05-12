'use client'
const { authContext } = require("./context");
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
const ContextState = (props) => {
    const [tkn, settkn] = useState(localStorage.getItem("tkn"))
    const [user, setUser] = useState({})
    const [polls, setpolls] = useState({ allPoles: [] })
    const r = useRouter()
    const signUpTheUser = async (e,creds)=>{
        e.preventDefault()
        try {
          const request = await fetch("http://localhost:5500/api/auth/signup", {method: "POST", 
            headers: {
              'Content-Type': 'application/json'
            }
            ,
            body:JSON.stringify({
            name: creds.name,
            email: creds.email,
            password: creds.password
          })})
          const res = await request.json()
          console.log(res)
          if(res.err){
            console.log(res)
            return toast.error(`${res.err}`, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
          }
          toast.success(`user created with name ${res.userCreated.name}`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
            localStorage.setItem("tkn", res.token)
            settkn(res.token)
            setUser(res.userCreated)
        } catch (error) {
          toast.error(`${error.message}`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,

            });
        }
        r.push("/Createpolls")
      }
      const LogUserIn = async (e,creds)=>{
        e.preventDefault()
        try {
          const request = await fetch(`http://localhost:5500/api/auth/login`,{
            method: "POST",
            headers : {
              'Content-Type': "application/json"  
            },
            body : JSON.stringify({
              email: creds.email,
              password: creds.password
            })
          })
          const response = await request.json()
          if(response.err){
            return toast.error(`${response.err}`, {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
              });
          }
          toast.success(`Welcome To Your Account ${response.loogedInUser.name}`, 
              {position: "top-right",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,}
          )
          localStorage.setItem("tkn", response.token)
          settkn(response.token)
          setUser(response.loogedInUser)
          r.push("/Createpolls")
        } catch (error) {
          toast.error(`${error.message}`, {
            position: "top-right", 
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,

            });
        }
      }
      const createThePoll = async (e,pollData)=>{
        const request = await fetch("http://localhost:5500/poll/createPoll",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'token': tkn
          },
          body: JSON.stringify({
            pollQuestion : pollData.question,
            pollOptions: pollData.options 
          })
        })
        const response =  await request.json()
        if(response.err){
          return toast.error(`${response.err}`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
        }
        toast.success(`Poll Created ✅`, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          });
          
      }
      const getThePoll = async () => {
        const request = await fetch("http://localhost:5500/poll/getAllPoles")
        const response =  await request.json()
        console.log("response", response)
        setpolls(response)
      }
      const specificUserPolls = async ()=>{
        const request = await fetch("http://localhost:5500/poll/getSpecificUsersPolls",{
          headers: {
            token: localStorage.getItem("tkn")
          }
        })
        const response =  await request.json()
        setpolls(response)
      }
  return (
    <authContext.Provider value={{signUpTheUser, tkn,settkn,LogUserIn,user, createThePoll, getThePoll, polls, setpolls, specificUserPolls}}>
        {props.children}
    </authContext.Provider>
  )
}

export default ContextState