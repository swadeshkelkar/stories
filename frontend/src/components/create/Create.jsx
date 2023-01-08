import React from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"

export const Create = () => {
  const [title, setTitle] = useState("")
  const [cat , setCat ] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const config = {headers: {Authorization: `Bearer ${user.token}`}};
    console.log(cat); const newPost = {
      username: user.other.username,
      title,
      category: cat,
      desc,
      file,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename

      try {
        await axios.post("/upload", data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.post("https://stories-x536.onrender.com/post", newPost, config)  
      window.location.replace("/post/" + res.data._id)
    } catch (error) {}
  }

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                <IoIosAddCircleOutline />
              </label>
              <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <select
              name='cat'              
              id='cat'        placeholder="Category"      value={cat}              onChange={(e) => {   setCat(e.target.value);    }}

            >
              <option value={this}>Life</option> 
              <option value="" disabled selected hidden>Choose a category</option>
              <option value={this}>Fashion</option>
              <option value={this}>Travel</option>
              <option value={this}>Sport</option>
              <option value={this}>Fun</option>
              <option value={this}>Health</option>
              <option value={this}>Business</option>
              <option value={this}>Technology</option>
            </select>
            <textarea name='' id='' cols='30' rows='30' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button className='button'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )}
