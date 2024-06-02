'use client'
// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ScoreContext } from '../Context/ScoreContext';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const selected = []

const TaskList = [
    'Price 1',
    'Price 2',
    'Price 3',
    'Price 4',
    'Price 5',
    'Price 6',
    'Price 7',
    'Price 8',
    'Price 9',
    'Price 10',
]

const CardComponent = (props)=>{
    const [color,setColor] = useState('bg-red-300');
    const [tasks,setTasks] = useState(false);
    const ChangeColor = ()=>{
        if(props.score<=0){
            setTasks(true);
            return;
        }
        setColor('bg-green-500');
            if(selected[props.idx]===false){
            selected[props.idx]=true;
            console.log(selected)
            props.setScore(props.score-1);
        }else{
            return;
        }
    }
    
    return (
        <>
            <div className={`${color} w-32 h-40 rounded-2xl px-2 py-4 font-semibold text-center text-xl ${selected[props.idx]?'text-white':'text-red-300'}`} onClick={()=>{ChangeColor()}}>
                <p>
                    {selected[props.idx]===true?TaskList[props.idx]:<></>}
                </p>
            </div>
        </>
    );
}


function page() {
    const {score,setScore} = useContext(ScoreContext)
    const notify = (message)=>{
        // toast(message);
        toast.success(message, {
            position: "top-center"
          });
    }

    useEffect(()=>{
        async function calling(){
            try {
                // const response = await axios.get('/api/backend');
                // if(response.data.status===200){
                //     setScore(response.data.score);
                // }
                setScore(Number(Cookies.get('score')));
            } catch (error) {
                console.log(error);
            }
        }
        calling();
        for(let i=0;i<10;i++){
            selected[i]=false;
        }
        // console.log(selected)
        
        notify("These are some Prices which you can choose !!!");
    },[]);

    const array = new Array(10).fill(null);
  return (
    <div className='min-h-screen w-screen bg-white text-black px-4 py-12'>
        {score===0?<h2 className='text-center font-semibold text-3xl text-black px-12 pb-10'>Congratulations Enjoy Your Prices!!!</h2>:<h2 className='text-center font-semibold text-3xl text-black px-24 pb-10' >Can Choose More {score} Wishes!!!</h2>}
        <div className='flex flex-wrap gap-10 justify-center'>
            {array.map((_, index) => (
                        <CardComponent idx={index} score={score} setScore={setScore}/>
                    ))}
        </div>
        <ToastContainer />
    </div>
  )
}

export default page