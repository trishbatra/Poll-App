import {React, useState} from 'react';

const Page = ({ data }) => {
    const [pollResult, setPollResult] = useState({})
    return (
        <>
            <div className='grid grid-cols-3 mx-48 gap-10'>
                {data.allPoles.length <= 0 && <p> Create some polls first.... </p>}
                {data.allPoles.map((poll,index) => (
                    <div key={index} className='border border-purple-600 p-4 rounded-xl text-center'>
                        <h1 className="text-3xl m-2">{poll.pollQuestion}</h1>
                        <p>Vote Below:</p>
                        {poll.pollOptions.map((option, index) => (
                            <div className='flex flex-col m-4' key={index}>
                                <label htmlFor={`option-${index}-${index}`}>{option}</label>
                                <input 
                                    type="radio" 
                                    id={`option-${index}-${index}`} 
                                    name={`${poll.pollQuestion}`} 
                                    value={option}
                                    checked={option}
                                />
                            </div>
                        ))}
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 m-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => console.log("Poll result for", poll.pollQuestion, "is", pollResult[poll.id])}
                        >
                            Submit Vote
                        </button>
                        <p> Created By  :  {poll.user.name ? poll.user.name : data.user.name} </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Page;
