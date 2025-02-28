import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin7Line } from "react-icons/ri";
const Option = (props) => {
    const clearParticularOption = (text)=>{
        const index = text.split(" ")[1] - 1
        const newArr = [...props.optionArr]
        const newOptions = [...props.data.options]
        newOptions.splice(index,1)
        newArr.splice(index,1)
        props.set(newArr)
        props.setdata({...props.data, options: newOptions});
    }
    const setOptions = ()=>{
        
    }
  return (
    <div className='flex  justify-center items-center relative w-[28em] my-5' key={props.i} >
        <label htmlFor="question" className='text-2xl  w-full'>
            {props.optionText}
        </label>
        {
          props.length > 2  && props.optionText.split(" ")[1]> 2?
          <div className='flex w-20'>
          <input type="text" 
            name='question' 
            className='input max-w-md w-[52%] -right-5 no-focus border-0 absolute'
            onChange={(e) => {
                const newOptions = [...props.data.options];
                newOptions[parseInt(props.optionText.split(" ")[1], 10) - 1] = e.target.value;
                props.setdata({...props.data, options: newOptions});
            }}
            />  
            <RiDeleteBin7Line 
            onClick={()=>(clearParticularOption(props.optionText))} 
            className="text-red-500 cursor-pointer relative left-24"  
            size={28} 
          />
          </div>

          :
          <> 
           <input 
                type="text" 
                name='question' 
                className='input max-w-md w-[52%] -right-5 no-focus border-0 absolute' 
                onChange={(e) => {
                    const newOptions = [...props.data.options];
                    newOptions[parseInt(props.optionText.split(" ")[1], 10) - 1] = e.target.value;
                    props.setdata({...props.data, options: newOptions});
                    console.log(e.target.value)
                }}
            />
            
          </>
        }
        
    </div>
  )
}

export default Option