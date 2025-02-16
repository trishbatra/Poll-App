"use client"
import React, { useContext, useEffect, useState} from 'react';
import Link from "next/link";
import { FaPoll } from "react-icons/fa";
import {  toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from '@/Context/context';

const Nav = () => {
  const auth = useContext(authContext)
  const [token , settoken ] = useState(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
        settoken(localStorage.getItem("tkn"));
    }
}, []);
  
  const handleLogout = () => {
    auth.settkn(null); 
    localStorage.removeItem("tkn");
    settoken(null);

    toast.success(`Logged Out ✅`, {
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
    
  };
  return (
    <>
    <div className="flex justify-between items-center ml-[5rem] mr-[1rem] relative ">
      <div className="flex items-center space-x-4 my-4">
        <Link href="/">
          <FaPoll size={72} />
        </Link>
        <h1 className="text-2xl font-semibold">Pollify: Your Interactive Polling Platform</h1>
        <FaPoll size={72} />
      </div>
      <div className="flex space-x-14">
        <Link href="/Createpolls">
          <button className="btn btn-gradient btn-primary hover:scale-105">
            Create Polls
          </button>
        </Link>
        {!localStorage.getItem("tkn")? (
          <div className='mx-5'>
            <Link href="/signup">
              <button className="btn btn-gradient mx-2 btn-info hover:scale-105">
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button className="btn btn-gradient mx-2 btn-info  hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout} className="btn btn-gradient btn-accent hover:scale-105">
            Logout
          </button>
        )}
      </div>
    </div>
    </>
  )
}

export default Nav;
