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
    const removePolls = async ()=>{
        setpolls([])
        const token = localStorage.getItem("tkn")
        if(token){
            const makeReq = await fetch("http://localhost:5500/poll/DeleteAllPoles",
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type' : 'application/json',
                        token : token
                    },
                }
            )
            const reqRes = await makeReq.json()
            if(reqRes){
                toast.success(`ALL Poles Deleted`, {
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
        }else{
            console.log("NO TOKEN")
        }
    }
  return (
    <>
     <div id='optionFrom' className="flex border border-[#B0C4DE] flex-col item-center justify-center items-center  
      p-7 relative rounded-2xl mx-40 ">
    {tkn.tkn && <h1 className="text-2xl text-center">Welcome user {tkn.user.name 
     ? tkn.user.name : ""}</h1>}
         <button 
         className="bg-red-400 ml-[45em] 
          btn btn-gradient btn-error
          hover:bg-red-500 text-white font-bold py-2 
          px-4 rounded focus:outline-none focus:shadow-outline" 
         onClick={clearOptions}>
          Clear all Options
        </button>
        <div className='flex  justify-center items-center' >
        <label htmlFor="question" className='text-2xl absolute left-[15em] my-3'>
            Enter Poll Question 
        </label>
        <input 
            type="text" 
            name='question' 
            className='input max-w-md relative  no-focus border-0  w-[15em] left-[8em] m-1' 
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
                <button className="bg-blue-500 hover:bg-blue-700 btn btn-gradient btn-accent
                 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                onClick={AddOption}
                >
                    Add more options
                </button>
                <button 
                className="bg-green-500 hover:bg-green-700 text-white btn btn-gradient btn-success
                font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={createPoll}
                >
                    Create Poll
                </button>
            </div>
        </div>
        {/* <hr  className='mx-48 mt-4 border border-purple-600' /> */}
        <div className="flex">
            <h2 className="text-3xl p-3 ml-56">Your Polls</h2>
            <button 
            className="bg-red-400 m-3 hover:bg-red-500 text-white 
            btn btn-gradient btn-error
            font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={removePolls}
            >
            Delete All Polls 
            </button>
          </div>
        <Polls  data={polls}/>
    </>
  )
}

export default Page