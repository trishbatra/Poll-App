"use client"
import { authContext } from '@/Context/context';
import Link from 'next/link';
import React, { useState, useContext } from 'react'

const page = () => {
  const [creds, setcreds] = useState({email: "", name: "", password: ""})
  const context = useContext(authContext);
  if(localStorage.getItem("tkn")){
    return(
      <p className="text-center text-purple-600 my-52 text-8xl"> You are already logged in </p>
    )
  }
  return (
    <>
   <form className='border border-purple-600 p-4 rounded-xl text-center mx-64'   >
      <h1 className="text-2xl font-bold">SignUp for Pollify</h1>
        <label className='block text-center'  htmlFor="name">Name</label>
        <input 
        className='flex m-auto  text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none  my-3 p-2 rounded-2xl'
        type="text" 
        name='name'
        required="true"
        onChange={(e)=>{ setcreds({...creds, [e.target.name] : e.target.value})}}
         />
        <label className='block text-center'  htmlFor="email">Email</label>
        <input 
        className='flex m-auto  text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none my-3  p-2 rounded-2xl'
        type="email" 
        name='email'
        required="true"
        onChange={(e)=>{ setcreds({...creds, [e.target.name]: e.target.value}) }}
         />
        <label className='block text-center' htmlFor="password">Password</label>
        <input 
        className='flex m-auto text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none  my-3  p-2 rounded-2xl'
        type="password" 
        name='password'
        required="true"
        onChange={(e)=>{ setcreds({...creds, [e.target.name]: e.target.value}) }}
         />
        <button 
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={(e)=> {context.signUpTheUser(e,creds)}}
        type='button'
        >
          Sign Up
        </button>
        <Link href={"/login"}> <p className='text-center m-3 text-purple-400 hover:underline hover:font-medium' > Already have an account? Login Here </p> </Link>
      </form>
    </>
  )
}

export default page