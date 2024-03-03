import React, { useState,useEffect } from "react";


// custom hook
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { useDispatch, useSelector } from "react-redux";
// import { updateResultAction } from "../Redux/result_reducer";
import { updateResult } from "../hooks/setResult";


const Question=({onChecked})=>{

    const [checked,setChecked]=useState(undefined);
    const [{isLoading,apiData,serverError}]=useFetchQuestion()
    // useSelector(state=>console.log(state));
    const questions =useSelector(state => state.questions.queue[state.questions.trace])
    const trace =useSelector(state => state.questions.trace)
    const result =useSelector(state => state.result.result)
    const dispatch=useDispatch()

    useEffect(()=>{
        // console.log({trace, checked})
        dispatch(updateResult({trace, checked}));
    // console.log(questions)
    },[checked])

    useEffect(()=>{
        //  //console.log(isLoading);
        // console.log(apiData);
        // // console.log(serverError);
    })
    
    function onSelect(i){
        // console.log(i);
        onChecked(i);
        setChecked(i);
        dispatch(updateResult({trace, checked}));

    }

    if (isLoading)return <h3 className="text-light">isLoding</h3>
    if (serverError)return <h3 className="text-light">{serverError || "Unknown Error"}</h3>

    return(
        // question?.question this indicates we only want to access the property value wehn we have the value
        <div className="questions">
            <h2 className="text-light">{questions?.question}</h2>

            <ul key={questions?.id}>
            {
                    questions?.options.map((q, i)=>(
                        <li key={i}>
                    <input type="radio" value={false} name="options" 
                    id={`q${i}-option`} 
                    onChange={()=>onSelect(i)}></input>

                    <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                    <div className={`check ${result[trace]==i ? 'checked':''}`}></div>
                </li>
                    ))
                }
            </ul>
        </div>
    );
}
export default Question;