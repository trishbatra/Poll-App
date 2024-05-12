"use client"
import Option from '@/Components/Option'
import React, { useContext, useEffect, useState } from 'react'
import Polls from '@/Components/Polls'
import { authContext } from '@/Context/context';
import { ToastContainer, toast, Bounce } from "react-toastify";
const Page = () => {
    const tkn = useContext(authContext)
    const [OptionArr, setOptionArr] = useState(["1", "2"])
    const [optionData,setoptionData] = useState({question: "", options: []})
    const [pollData, setpollData] = useState([])
    const {getThePoll, polls, setpolls, specificUserPolls} = useContext(authContext);

    useEffect(() => {
        if(localStorage.getItem("tkn")){
            specificUserPolls()
        }
    }, []);
    console.log("Polllls", polls)
    const AddOption = ()=>{
        const arr = [...OptionArr]
        const elemToPush = OptionArr.length + 1
        arr.push(elemToPush.toString())
        setOptionArr(arr)
    }
    const clearOptions = ()=>{
        setOptionArr(["1", "2"])
    }
    const createPoll = async ()=>{
        try {
            const postThePoll = await fetch(`http://localhost:5500/poll/createPoll`, {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                     token : tkn.tkn
                },
                body : JSON.stringify({
                    pollQuestion : optionData.question,
                    pollOptions  : optionData.options,
                })
            })
            const pollResponse = await postThePoll.json()
            const newPollData = [...pollData, pollResponse.CreatePoll]; 
            console.log("newPollData", newPollData)
            setpollData(newPollData);
            setpolls(pollResponse);
            console.log("newPollData", newPollData );
            toast.success(`Poll created by ${pollResponse.name}`, {
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
    const removePolls = ()=>{
        setpollData([])
    }
  return (
    <>
     <div id='optionFrom' className="flex  flex-col item-center justify-center items-center border border-purple-600 mx-56 p-7 rounded-2xl">
    {tkn.tkn && <h1 className="text-2xl text-center">Welcome user {tkn.user.name}</h1>}
         <button 
         className="bg-red-400 ml-[45em] hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
         onClick={clearOptions}>
          Clear all Options
        </button>
        <div className='flex flex-col justify-center items-center' >
        <label htmlFor="question" className='text-2xl m-3'>
            Enter Poll Question 
        </label>
        <input 
            type="text" 
            name='question' 
            className='rounded-xl p-2 w-[350px] text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none ' 
            onChange={(e)=>setoptionData({...optionData, question: e.target.value})} 
        />
        </div>
        {
            OptionArr.map((element,i)=>{
                return <Option  
                length={OptionArr.length} 
                optionText={"Option "+ element}
                optionArr={OptionArr}
                set={setOptionArr}
                data={optionData}
                setdata={setoptionData}
                i={i}
                />
            })
        }
            <div className="flex  mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={AddOption}
                >
                    Add more options
                </button>
                <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={createPoll}
                >
                    Create Poll
                </button>
            </div>
        </div>
        <hr  className='mx-48 mt-4 border border-purple-600' />
        <div className="flex">
            <h2 className="text-3xl p-3 ml-56">Your Polls</h2>
            <button 
            className="bg-red-400 m-3 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={removePolls}
            >
            Deletr All Polls 
            </button>
          </div>
        <Polls data={polls} />
    </>
  )
}

export default Page