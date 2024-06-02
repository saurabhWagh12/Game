'use client'
import React, { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../Context/ScoreContext';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GuessNumberGame = () => {
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [Score, setscore] = useState(5);
  const [message, setMessage] = useState('Start guessing...');
  const [userInput, setUserInput] = useState('');
  const [win,setWin] = useState(false);
  const {score,setScore} = useContext(ScoreContext);
  const notify = (message)=>{
    // toast(message);
    toast.success(message, {
        position: "top-center"
      });
}

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20 + 1);
  }

  useEffect(()=>{
    async function CookieExtract(){
      try {
        // const response = await axios.get('/api/backend');
        // setScore(response.data.score);  
        const value = Cookies.get('score');
        setScore(value);
      } catch (error) {
          console.log(error);
      }
    }
    CookieExtract()
    notify("This is Second Game:\nIf you guess the correct number in first chance you will get 2 points\nElse you will get 1 point if you win the game\nAll the best!!!");
  },[]);

  useEffect(()=>{
    if(Score===0){
      setMessage('GAME OVER ❌');
    }
  },[Score]);


  function incrementScore(){

    async function calling(x){
      try {
        // const response = await axios.post('/api/backend',{score:score+x});
        Cookies.set('score',Number(score)+x);
          setTimeout(()=>{
            notify(`Congratulations You won!!!`);
          },3000);
        
      } catch (error) {
        console.log(error)
      }
    }
   
      if(Score===4){
        calling(2)
      }else{
        calling(1)
      }
     
  }

  const checkGuess = () => {
    if(Score<=0){
      return
    }
    if (!userInput) {
      setMessage('⛔ No Number !!!');
    } else if (parseInt(userInput) === secretNumber) {
      setMessage('🎉 Congratulations! You guessed it right!');
      setWin(true);
      incrementScore();

    } else if (Score >= 1) {
      setscore((prevScore) => prevScore - 1);
      if (parseInt(userInput) > secretNumber) {
        setMessage('Too High!');
      } else if (parseInt(userInput) < secretNumber) {
        setMessage('Too Low!');
      }
    } else {
      setMessage('GAME OVER ❌');
    }
  };

  // const resetGame = () => {
  //   setscore(20);
  //   setSecretNumber(generateRandomNumber());
  //   setMessage('Start guessing...');
  //   setUserInput('');
  //   document.body.style.backgroundColor = '#222';
  // };

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center justify-center ${win ? 'bg-green-500' : null} ${win ? 'text-white' : 'text-black'}`}
    
    style={win===false? {
      background: `url('https://i.ytimg.com/vi/gsEaPpnBtPQ/maxresdefault.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    } : null}
    >
      
      <div className={`${win?null:'bg-white opacity-80 px-4 py-2 rounded-2xl'}`}>
      <header className="mb-8 mt-6">
      <h1 className="text-4xl text-center pb-6">Guess My Number!</h1>
        <div className="top flex gap-10 items-center justify-center">
        
          <p className="between text-xl">(Between 1 and 20)</p>
          {/* <button className="btn again border-black border-2 px-4 py-2 rounded-2xl" onClick={resetGame}>
            Again!
          </button> */}
        </div>
        <div className="number text-center text-2xl">{parseInt(userInput) === secretNumber ? secretNumber : '?'}</div>
      </header>
      <main className="flex justify-center w-full">

      <div>
        <div className="">
          <input
            type="number"
            className="guess border-4 border-black rounded-3xl bg-white text-black font-bold text-5xl p-2.5 w-44 text-center mb-8 mx-6"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className={`btn check ${win?'border-white':'border-black'} border-2 rounded-2xl px-4 py-2`} onClick={checkGuess}>
            Check!
          </button>
        </div>

        <section className="right text-2xl text-center mb-10">
          <p className="message mb-8">{message}</p>
          {(Score>=1 && win===false)?<p className="label-Score">💯 Score: {Score}</p>:<a href='/slot' className={`${win?'border-white':'border-black'} border-2 px-4 py-2 rounded-2xl mb-4`}>Go to next Game</a>}
        </section>
        </div>
      </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GuessNumberGame;
