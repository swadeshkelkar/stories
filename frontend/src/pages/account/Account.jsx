import React, { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./account.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from "axios"

export const Account = () => {
  const { user, dispatch } = useContext(Context); const {token, other} = user;

  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")
  const [succ, setSucc] = useState(false)
  const PublicFlo = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    console.log(user);
    const config = {headers: {Authorization: `Bearer ${token}`}};
    const updateUser = {
      userId: user._id,
      username,
      email: other.email,
      password,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      updateUser.profilePic = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.put("/user/" + other._id, updateUser, config)
      setSucc(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
      console.log(res.data);
      // const user = {token: token, other: res.data};
      // localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } catch (error) {
      dispatch({ type: "UPDATE_FAILED" })
    }
  }
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Profile</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <img src={file ? URL.createObjectURL(file) : PublicFlo + user.other.profilePic} alt='' />
                <label htmlFor='file'>
                  <IoIosAddCircleOutline className='icon' />
                </label>
                <input type='file' id='file' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <form className='right' onSubmit={handleSubmit}>
              <label htmlFor=''>Username</label>
              <input type='text' placeholder={other.username} onChange={(e) => setUsername(e.target.value)} />
              {/* <label htmlFor=''>Email</label>
              <input type='email' placeholder={other.email} onChange={(e) => setEmail(e.target.value)} /> */}
              <label htmlFor=''>Password</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
              <button className='button' type='submit'>
                Update
              </button>
              {succ && <span>Profile is Updated</span>}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
