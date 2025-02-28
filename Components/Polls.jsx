import { authContext } from '@/Context/context';
import {React, useContext, useState} from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { ToastContainer, toast, Bounce } from "react-toastify";

const Page = ({ data }) => {
    const { deleteSpecificPoll, user} = useContext(authContext);
    console.log("data is data: ", data)
    const [userr, setuserr] = useState(()=>{
        if(Object.keys(user).length > 0){
            return user
        }else{
            if(localStorage.getItem("loggedInUser")){
                return JSON.parse(localStorage.getItem("loggedInUser"))
            }else{
                return {name: "not logged in"}
            }
        }
    })
    return (
        <>
            <div className='grid grid-cols-3 mx-48 gap-12 '>
                {data.allPoles?.length === 0 ? <p> Create some polls first.... </p> : 
                  data.allPoles?.length === 0 ? <p 
                  className="text-center w-[100%]"> Create some polls first.... </p> : ""
                }
                {data.allPoles?.map((poll,index) => (
                    <div className="relative bg-[linear-gradient(169deg,_rgba(34,40,49,1)_60%,_rgba(39,68,93,1)_85%)]
                     shadow-xl  p-6 m-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                    bg-customBackground backdrop-blur-md backdrop-saturate-26 rounded-lg 
                     ">

                        {
                        (data.user?.name && data.user?.name === userr.name) || 
                        (poll.user?.name && poll.user?.name === userr.name) ? (
                            <div
                            onClick={() => {
                                deleteSpecificPoll(poll._id);
                            }}
                            >
                            <MdOutlineDeleteOutline className="absolute cursor-pointer text-3xl left-[85%]" />
                            </div>
                        ) : null
                        }

                        <h1 className="text-3xl m-2">{poll.pollQuestion}</h1>
                        {poll.pollOptions.map((option, index) => (
                            <div className='flex relative m-4' key={index}>
                                <label 
                                     htmlFor={`option-${index}-${index}`}
                                     className="ml-15 mr-2 "
                                     >
                                    {option}
                                    </label>
                                <input 
                                    type="radio" 
                                    id={`option-${index}-${index}`} 
                                    name={`${poll.pollQuestion}`} 
                                    value={option}
                                    checked={option}
                                    className="radio radio-primary ml-5 absolute"
                                />
                            </div>
                        ))}
                        <button className="btn btn-gradient"
                            onClick={() => console.log("Poll result for", poll.pollQuestion, "is", pollResult[poll.id])}
                        >
                            Cast Your Vote
                        </button>
                        {/* <p
                            className="mt-4"
                        > Created By  :  {poll.user.name ? poll.user.name : data.user.name? data.user.name : "dadd" } </p> */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Page;
