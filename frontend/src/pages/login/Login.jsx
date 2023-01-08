import React, { useContext, useRef } from "react"
import "./login.css"
import back from "../../assets/images/banner.jpg"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"
import axios from "axios"

export const Login = () => {
  const userRef = useRef()
  const passRef = useRef()
  const { dispatch, FetchData } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGINSTART" })
    try {
      const res = await axios.post("https://stories-x536.onrender.com/auth/login", {
        email: userRef.current.value,
        password: passRef.current.value,
      })
      dispatch({ type: " LOGINSUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "LOGINFAILED" })
    }
     window.location.replace("/")
  }
  //console.log(user)
  console.log(FetchData)
  return (
    <>
      <section className='login'>
        <div className='container'>
          <div className='backImg'>
            <img src={back} alt='' />
            {/* <div className='text'>
              <h3>Login</h3>
              <h1>My account</h1>
            </div> */}
          </div>

          <form onSubmit={handleSubmit}>
            <span>Email Address *</span>
            <input type='email' required ref={userRef} />
            <span>Password *</span>
            <input type='password' required ref={passRef} />
            <button className='button' type='submit' disabled={FetchData}>
              Log in
            </button>

            <p className='link-text'> Don't have an account? <Link to='/register' className='link'>
              Register
            </Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
