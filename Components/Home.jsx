"use client"
import { authContext } from '@/Context/context';
import React, { useContext, useEffect } from 'react'
import Polls from '@/Components/Polls'
const Home = () => {
    const {getThePoll, polls} = useContext(authContext);
    console.log("polllllssss", polls)
    useEffect(() => {
        getThePoll();  
    }, []);  

    console.log("Polls data:", polls); 
    return (
       <>
       <h4 className="text-center text-[18px] mt-4 ">
         PollUp is your one-stop app for creating, discovering, and voting on polls.<br/> Join the community, share your opinions, and explore trending topics with ease!
       </h4>
       <h3 className="text-center text-[48px] my-12"> Explore Polls and Start Voting!!! </h3>

       <Polls data={polls} />
       </>
    )
}

export default Home