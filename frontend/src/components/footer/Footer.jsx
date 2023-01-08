import React from "react"
import { AiFillGithub } from "react-icons/ai"

export const Footer = () => {
  const link = () =>{window.open('https://github.com/swadeshkelkar/stories', '_blank');}
  return (
    <>
    
      <footer className='boxItems'>
        <div className='container flex'>
          <p><center>Developed with MERN stack</center></p>
          <div className='social'>
            Source Code: <AiFillGithub className="icon" onClick={link}/>
          </div>
        </div>
      </footer>
    </>
  )
}
