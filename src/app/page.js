
export default function Home() {
  return (
      <>
      
      <div className='min-h-screen w-screen bg-white text-black pt-5'>
        <h1 className="text-4xl text-center my-10 font-medium">
          Welcome to my website!
        </h1>
        <h2 className="text-center text-xl font-lg">
          Here You can play 3 fun games:
          <div className="flex justify-center">
          <ul className="py-4 text-left">
            <li>1) Rock Paper Scissor</li>
            <li>2) Guess My Number</li>
            <li>3) Slot Machine</li>
          </ul>
          </div>
          By Playing these Games You can earn points which you can use further to gain rewards!!!
        </h2>
        <div className='flex justify-center pt-10'><a href='/rockpaperscissors' className='border-black border-2 rounded-2xl px-6 py-4 '>Start Playing</a></div>
      </div>
      
      </>
  )
}
