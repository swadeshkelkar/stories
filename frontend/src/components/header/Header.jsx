import React, { useContext } from "react"
import stories from "../../assets/images/stories.svg"
import { Context } from "../../context/Context"
import "./header.css"
import { User } from "./User"
import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"
export const Header = () => {
  const { user, dispatch } = useContext(Context);
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })  
  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <img src={stories} alt='logo' width='100px' />
          </div>
          <nav>
            <ul>
                <li key={1}>
                  <Link to='/'>Home</Link>
                </li>
                <li key={2}>
                  <Link to={user==null ? '/login' : '/create'}>Write</Link>
                </li>
                <li key={3}>
                  <Link to='/about'>About</Link>
                </li>
              
            </ul>
          </nav>
          <div className='account flexCenter'>
            <User />
          </div>
        </div>
      </header>
    </>
  )
}
