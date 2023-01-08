import React, { useContext, useEffect, useState } from "react"
import "./details.css"
import "../../components/header/header.css"

import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { Context } from "../../context/Context"

export const DetailsPages = () => {
  const location = useLocation()
  console.log(location)
  const path = location.pathname.split("/")[2]


  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)


  const [post, setPost] = useState({})
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path)
      console.log(res)

      setPost(res.data)

      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    getPost()
  }, [path])


  const PublicFlo = "https://stories-x536.onrender.com/images/"
  const { user } = useContext(Context); const config = {headers: {Authorization: `Bearer ${user.token}`}};

  const handleDelete = async () => {
    try {
      await axios.delete(`https://stories-x536.onrender.com/post/${post._id}`, { data: { username: user.other.username } }, config)
      window.location.replace("/")
    } catch (error) {}
  }


  const handleUpdate = async () => {
    try {
      await axios.put(`https://stories-x536.onrender.com/post/${post._id}`, { username: user.other.username, title, desc }, config)
      window.location.reload()
    } catch (error) {}
  }

  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='left'>{post.photo && <img src={PublicFlo + post.photo} alt='' />}</div>
          <div className='right'>
            {post.username === user.other.username && (
              <div className='buttons'>
                <button className='button' onClick={() => setUpdate(true)}>
                  <BsPencilSquare size={24}/>
                </button>
                <button className='button' onClick={handleDelete}>
                  <AiOutlineDelete size={24}/>
                </button>
                {update && (
                  <button className='button' onClick={handleUpdate}>
                    Update
                  </button>
                )}
              </div>
            )}

            {update ? <input type='text' value={title} className='updateInput' onChange={(e) => setTitle(e.target.value)} /> : <h1>{post.title}</h1>}
            {update ? <textarea value={desc} cols='30' rows='10' className='updateInput' onChange={(e) => setDesc(e.target.value)}></textarea> : <p>{post.desc}</p>}

            <p>
              Author: <Link to={`https://stories-x536.onrender.com/?user=${post.username}`}>{post.username}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )}
