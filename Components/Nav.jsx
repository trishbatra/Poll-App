"use client"
import React, { useContext} from 'react';
import Image from "next/image";
import logo from '../Images/logo.png';
import Link from "next/link";
import { FaPoll } from "react-icons/fa";
import {  toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from '@/Context/context';

const Nav = () => {
    const auth = useContext(authContext)
  const handleLogout = () => {
    auth.settkn(null); 
    localStorage.removeItem("tkn")
    toast.success(`Loggeed Out ✅`, {
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
    <div className="flex justify-between items-center mx-36 my-4">
      <div className="flex items-center space-x-4 ">
        <Link href="/">
          <FaPoll size={72} />
        </Link>
        <h1 className="text-2xl font-semibold">Pollify: Your Interactive Polling Platform</h1>
        <FaPoll size={72} />
      </div>
      <div className="flex space-x-14">
        <Link href="/Createpolls">
          <button className="bg-purple-400 text-white p-3 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
            Create Polls
          </button>
        </Link>
        {!localStorage.getItem("tkn")? (
          <div className='mx-5'>
            <Link href="/signup">
              <button className="bg-purple-400 text-white p-3 mx-5 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-purple-400 text-white p-3 mx-5  rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <button onClick={handleLogout} className="bg-purple-400 text-white p-3 rounded-lg transition duration-300 ease-in-out hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
            Logout
          </button>
        )}
      </div>
    </div>
    </>
  )
}

export default Nav;
