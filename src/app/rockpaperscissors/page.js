import React from 'react'
import RockPaper from '../components/RockPaper'

function page() {
  return (
    <>
        <div className='min-h-screen bg-red-400 flex items-center justify-center'

            style={{
            background: `url('https://staticg.sportskeeda.com/editor/2021/01/83287-16106844175862-800.jpg')`, // replace 'your-gif-file.gif' with the actual path to your GIF file
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh', // set the height to cover the entire viewport
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            }}
            >
            <RockPaper/>
        </div>
    
    </>
  )
}

export default page