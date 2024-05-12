import React from 'react'
import { RxCross1 } from "react-icons/rx";
const Option = (props) => {
    const clearParticularOption = (text)=>{
        const index = text.split(" ")[1] - 1
        const newArr = [...props.optionArr]
        const newOptions = [...props.data.options]
        newOptions.splice(index,1)
        newArr.splice(index,1)
        console.log("newOptions", newOptions, "index", index)
        props.set(newArr)
        props.setdata({...props.data, options: newOptions});
    }
    const setOptions = ()=>{
        
    }
  return (
    <div className='flex flex-col justify-center items-center' key={props.i} >
        <label htmlFor="question" className='text-2xl m-3'>
            {props.optionText}
        </label>
        {
          props.length > 2  && props.optionText.split(" ")[1]> 2?
          <div className='flex ml-6'>
          <input type="text" 
            name='question' 
            className='rounded-xl p-2 w-[350px] text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none mx-4 '
            onChange={(e) => {
                const newOptions = [...props.data.options];
                newOptions[parseInt(props.optionText.split(" ")[1], 10) - 1] = e.target.value;
                props.setdata({...props.data, options: newOptions});
                console.log(e.target.value)
            }}
            />  
            <RxCross1 
            onClick={()=>(clearParticularOption(props.optionText))} 
            className="text-red-500 cursor-pointer" 
            size={32} 
          />
          </div>
          :  <input 
                type="text" 
                name='question' 
                className='rounded-xl p-2 w-[350px] text-purple-400 focus:ring-[3px] focus:ring-purple-400 focus:outline-none ' 
                onChange={(e) => {
                    const newOptions = [...props.data.options];
                    newOptions[parseInt(props.optionText.split(" ")[1], 10) - 1] = e.target.value;
                    props.setdata({...props.data, options: newOptions});
                    console.log(e.target.value)
                }}
            />
        }
        
    </div>
  )
}

export default Option