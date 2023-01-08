import React, { useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"

import { CgProfile } from "react-icons/cg"

import { BiLogOut } from "react-icons/bi"; import { useHistory } from "react-router-dom";
import { Context } from "../../context/Context"
import { Link } from "react-router-dom"

export const User = () => {
  const { user, dispatch } = useContext(Context);
  let history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem('user');
    history.push('/login');

  }
  const [profileOpen, setProfileOpen] = useState(false)
  const close = () => {
    setProfileOpen(false)
  }

  const PublicFlo = "http://localhost:5000/images/"

  return (
    <>
      <div className='profile'>
        {user ? (
          <>
            <button className='img' onClick={() => setProfileOpen(!profileOpen)}>
              <img src={user? PublicFlo + user.other.profilePic : ""} alt='' />
            </button>
            {profileOpen && (
              <div className='openProfile boxItems' onClick={close}>
                
                    <div className='box'><CgProfile className='icon' />
                      <h4>{user.other.username}</h4>
                      
                    </div>
                  
                <Link to={"/account"}>
                <button className='box'>
                  <IoSettingsOutline className='icon' />
                  <h4>My Profile</h4>
                </button>
                </Link>
                <button className='box' onClick={handleLogout}>
                  <BiLogOut className='icon' />
                  {user && <h4>Log Out</h4>}
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to='/login'>
            <button>Sign In</button>
          </Link>
        )}
      </div>
    </>
  )
}
