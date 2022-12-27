import React from 'react'
import Login from './Login'
import Signup from './Signup'
import './landing.css'
import Navbar from '../Navbar/Navbar'

const Landing = (props) => {
  const pathName = window.location.pathname;
  return (
    <div className='landing'>
      <div className='left'>

      </div>

      <div className='right'>
        {
          pathName === "/landing/login" ?
            <Login showalert={props.showalert} /> :
            <Signup showalert={props.showalert} />
        }
      </div>
    </div>
  )
}

export default Landing