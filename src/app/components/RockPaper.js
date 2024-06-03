'use client'
import React, { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../Context/ScoreContext';
import GifPlayer from './GifPlayer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RockPaper() {

    const { score , setScore } = useContext(ScoreContext);
    const [computerScore, setComputerScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerChoise,setComputerChoise] = useState(null);
    const [playerChoise,setPlayerChoise] = useState(null);

    const [rounds, setRounds] = useState(10);

    const notify = (message)=>{
        // toast(message);
        toast.success(message, {
            position: "top-center"
          });
    }

    useEffect(()=>{
        notify("This is First game \n You will earn points if you win this game!!!\n All the best!!!");
        setScore(0);
    },[]);

    useEffect(() => {
        async function storeScore(){
            // const response = await axios.post('/api/backend',{score:score});
            // if(response.status===200){
            //     navigateToNextLink();
            // }else{
            //     alert('Error');
            // }
            Cookies.set('score',score);
            navigateToNextLink();
        }
        if(score>=1){
            // alert(`You Won!!! Score: ${score}`);
            notify(`You Won!!! Score: ${score}`)
            storeScore();
        }
    }, [score]);

    const navigateToNextLink = () => {
        window.location.href = '/guessnumber';
      };
    

    const arr = ['Rock', 'Paper', 'Scissor'];
    const images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKX3bCHoOuJJ-wPQ1OM8oDsEyZ9E0YJ0St4_4G7Y5TKNbCXFVqVaSBWg8hUX0Xo3iDGko&usqp=CAU',
                    'https://www.pngitem.com/pimgs/m/592-5920636_rock-paper-scissors-clipart-rock-paper-scissors-png.png',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKyJob5hcksKHEhaDgqD7g1122-WhLmEQAKVJiozWqvSjHlNr8Qy0rD2HG8ocMWBWS9QU&usqp=CAU']
    useEffect(()=>{
        function updateScore(){
            setScore((prevScore) => prevScore + 1);
        }
        function calling(){
            if (rounds === 0) {
                if(playerScore>computerScore){
                    updateScore();
                    updateScore();
                }else if(computerScore===playerScore){
                    setRounds(3);
                    setPlayerScore(0);
                    setComputerScore(0);
                    setComputerChoise(null);
                }else{
                    alert(`Computer Won`)
                    Cookies.set('score',0);
                    navigateToNextLink();
                }
                return;
            }
        }
        calling();
    }, [rounds, playerScore, computerScore, setScore]);

    const Play = (x) => {
        if(rounds===0){
            return;
        }        

        const number = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        // console.log(arr[x] + (x + 1) + '   ' + arr[number - 1] + number);

        setComputerChoise(number - 1);
        setPlayerChoise(x);
        x++;
        switch (x) {
            case 1:
                if (x === 1 && number === 2) {
                    setComputerScore(computerScore+1);
                } else if (x === 1 && number === 3) {
                    setPlayerScore(playerScore+1);
                }
                break;
            case 2:
                if (x === 2 && number === 1) {
                    setPlayerScore(playerScore+1);
                } else if (x === 2 && number === 3) {
                    setComputerScore(computerScore+1);
                }
                break;
            case 3:
                if (x === 3 && number === 2) {
                    setPlayerScore(playerScore+1);
                } else if (x === 3 && number === 1) {
                    setComputerScore(computerScore+1);
                }
                break;
        }
        setRounds(rounds - 1);
    };


    return (
        <div className='p-10 bg-white bg-opacity-90 rounded-2xl'>


            <p className='text-black text-center text-2xl pb-10'>Round:{rounds}</p>
            <div className='text-black text-2xl flex justify-between pb-5'>
                <p>Player: {playerScore}</p>
                <p>Computer: {computerScore}</p>
            </div>

            {computerChoise!==null?<div className="text-black flex text-2xl justify-between pb-10">
                <img className='rounded-xl w-14 h-14' src={images[playerChoise]}/>
                <img className='rounded-xl w-14 h-14' src={images[computerChoise]}/></div>:<></>}

            <p className='text-black text-2xl text-center py-6'>Players's Choices:</p>

            <div className='flex items-center justify-around gap-5'>
                <button onClick={() => Play(0)}>
                    <img className='rounded-2xl w-20 h-20' src={images[0]} alt='Rock'/>
                </button>
                <button onClick={() => Play(1)}>
                    <img className='rounded-2xl w-20 h-20' src={images[1]} alt='Paper'/>
                </button>
                <button  onClick={() => Play(2)}>
                    <img className='rounded-2xl w-20 h-20'  src={images[2]} alt='Scissors'/>
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RockPaper;
