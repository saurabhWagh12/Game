'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ScoreContext } from '../Context/ScoreContext';
// import axios from 'axios';
import Marquee from "react-fast-marquee";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function page() {
  const {score,setScore } = useContext(ScoreContext);
  const notify = (message)=>{
    // toast(message);
    toast.success(message, {
        position: "top-center"
      });
}

  let arr1,arr2,arr3;
  const [chances,setChances] = useState(10);
  const [got,setGot] = useState(true);
  const [win,setWin] = useState(false);

    function FillStacks(){
        arr1=[]
        arr2=[]
        arr3=[]
      
      function fill(arr){
        let r = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < r; i++) {
            arr.push(Math.floor(Math.random() * 5));
        }
      }

      fill(arr1);
      fill(arr2);
      fill(arr3);

    }

    useEffect(()=>{
        async function backend(){
            try {
              // const response = await axios.get('/api/backend');
              setScore(Number(Cookies.get('score')));  
            } catch (error) {
                console.log(error);
            }
        }
        backend()
        notify("This is the Final Game:\nYou will earn 2 points if you win this!!!\nBest of Luck!!!");
    },[]);

    useEffect(() => {
      async function storeScore(){
        setScore(score);
          // const response = await axios.post('/api/backend',{score:score+1});
          Cookies.set('score', score+1);
          // if(response.status===200){
          // }else{
          //     alert('Error');
          // }
      }
      

      if(score!==0){
        setTimeout(() => {
          notify("You Won!!!");
        }, 5000);
          storeScore();
      }
  }, [win]);

    const [x1,setX1] = useState(-1);
    const [x2,setX2] = useState(-1);
    const [x3,setX3] = useState(-1);

    const images = ['https://i.pinimg.com/originals/7d/92/54/7d9254704e0f2c3fa895f157287b801a.png',
                    'https://www.nicepng.com/png/full/278-2789894_pokemon-charmander-vector.png',
                    'https://purepng.com/public/uploads/large/purepng.com-pokemonpokemonpocket-monsterspokemon-franchisefictional-speciesone-pokemonmany-pokemonone-pikachu-1701527784579tobow.png',
                    'https://clipart.info/images/ccovers/1528080659Pokemon-PNG-Image.png',
                    'https://purepng.com/public/uploads/medium/purepng.com-pokemonpokemonpocket-monsterspokemon-franchisefictional-speciesone-pokemonmany-pokemonone-pikachu-1701527785141q7x67.png',
                    'http://img08.deviantart.net/dce1/i/2015/277/f/2/eevee_by_ruki_makino-d9by2a2.png',
                  ];
    
    const Play = () => {
      if(chances<=0){
        return;
      }
      FillStacks();
                
        function findSum(arr) {
            return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        }
                
                
        while (arr1.length > 0 && arr2.length > 0 && arr3.length > 0) {
            const s1 = findSum(arr1);
            const s2 = findSum(arr2);
            const s3 = findSum(arr3);
                
            if (s1 === s2 && s2 === s3) {
                setWin(true);
                setGot(false);

                setPlay(true);

                // console.log(arr1[arr1.length - 1]);
                setX1(arr1[arr1.length - 1]);
                setX2(arr1[arr1.length - 1]);
                setX3(arr1[arr1.length - 1]);
                setScore(score+1);

                if(got===true)
                console.log(x1,x2,x3);

                setTimeout(() => {
                  setPlay(false);
                }, 3000);
                
                return;
            }
                
            if (s1 >= s2 && s1 >= s3) {
                arr1.pop();
            } else if (s2 >= s3 && s2 >= s1) {
                arr2.pop();
            } else if (s3 >= s2 && s3 >= s1) {
                arr3.pop();
            }
        }
        setChances(chances-1);
        
        function setX(x,arr){
          if(x===1){
            if(arr.length>0){
              setX1(arr.pop())
            }else{
              setX1(5);
            }
          }else if(x===2){
            if(arr.length>0){
              setX2(arr.pop())
            }else{
              setX2(5);
            }
          }else if(x===3){
            if(arr.length>0){
              setX3(arr.pop())
            }else{
              setX3(5);
            }
          }

        }
        if (got===true) {
          setX(1,arr1);
          setX(3,arr3);
          setX(2,arr2);  
        }
        
        
        setPlay(true);

        if(got===true)
          console.log(x1,x2,x3);

        setTimeout(() => {
          setPlay(false);
        }, 3000);
        
    };
                

const MarqueeConponent= ()=>{
      return (
        <div className='bg-white text-black rounded-2xl opacity-90'>
    
              <div className='flex justify-center items-center pt-10'>
    
              <div className='flex border-4 p-6 justify-center border-slate-800 items-center rounded-2xl'>
    
                <Marquee direction='up' speed='300' className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[0]} />
                  <img className='w-20 h-20' src={images[1]} />
                  <img className='w-20 h-20' src={images[2]} />
                  <img className='w-20 h-20' src={images[3]} />
                  <img className='w-20 h-20' src={images[4]} />
                </Marquee>
    
                <Marquee direction='down' speed='300' className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[4]} />
                  <img className='w-20 h-20' src={images[3]} />
                  <img className='w-20 h-20' src={images[2]} />
                  <img className='w-20 h-20' src={images[1]} />
                  <img className='w-20 h-20' src={images[0]} />
                </Marquee>
    
                <Marquee direction='up' speed='300' className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[0]} />
                  <img className='w-20 h-20' src={images[1]} />
                  <img className='w-20 h-20' src={images[2]} />
                  <img className='w-20 h-20' src={images[3]} />
                  <img className='w-20 h-20' src={images[4]} />
                </Marquee>
              </div>
              </div>
              {/* <div className='flex justify-center pt-6'><button className='border-2 border-black px-4 py-2 rounded-xl' onClick={()=>{Play()}}>Play</button></div> */}
    
            </div>
      );
    }
    
 const SlotConponent= ()=>{
      return (
        <div className=' bg-white text-black rounded-2xl opacity-90'>
    
              <div className='flex justify-center items-center pt-10'>
    
              <div className='flex border-4 gap-4 p-6 justify-center border-slate-800 items-center rounded-2xl'>
    
                <div className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[x1]} />
                </div>
    
                <div className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[x2]} />
                </div>
    
                <div className='max-w-24 border-black border-2'>
                  <img className='w-20 h-20' src={images[x3]} />
                </div>
              </div>
              </div>
              <div className='flex justify-center pt-6'>
              {(win||chances===0)?<a className='text-black  border-2 border-black px-4 py-2 rounded-xl' href='/prices'>Use Your Points</a>:<button className='border-2 border-black px-4 py-2 rounded-xl' onClick={()=>{Play();}}>Play</button>}
              </div>
            </div>
      );
    }


    const [play,setPlay] = useState(false);

  return (
    <>
      <div className='bg-white text-black min-h-screen'
      
      style={{
        background: `url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/02/Pokemon-Underrated-Fighting-Promo.jpg')`, // replace 'your-gif-file.gif' with the actual path to your GIF file
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // set the height to cover the entire viewport
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}

      >
        <p className='text-white  text-2xl font-medium text-center pt-4'>{win?<>Score: {score+1}</>:<>Chances: {chances}</>}</p>
      {play?<MarqueeConponent/>:<SlotConponent/>}
      {/* <div> */}
        {/* {win?:<></>}</div> */}
      </div>
      <ToastContainer />
    </>
  )
}

export default page