import React from "react"
import "./blog.css"

import { AiOutlineTags, AiOutlineClockCircle } from "react-icons/ai"
import { Link } from "react-router-dom"

export const Card = ({ posts }) => {

  const PublicFlo = "http://localhost:5000/images/"
  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {posts.map((item) => ( 
            <div className='box boxItems' key={item.id}>
              {/* first ma yo  <div className='img'>{item.photo && <img src={item.cover} alt='' />}</div>*/}
              <div className='img'>{item.photo && <img src={PublicFlo + item.photo} alt='' />}</div>
              <div className='details'>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
 
                    <a href={`/?cat=${item.category}`}>#{item.category}</a>

                </div>


                <Link to={`/post/${item._id}`}>
                  <h3>{item.title.slice(0, 30)}</h3>
                </Link>
                <p>{item.desc.slice(0, 100)}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{new Date(item.createdAt).toDateString()}</label>
                  
                  {/* <button onClick={copy} value={item._id}><AiOutlineShareAlt className='icon' /> <label htmlFor=''>Share</label></button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
