import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../../home.css'


const Login = (props) => {
  const host = "http://localhost:8000/"
  // const host = "https://meranoteserver.herokuapp.com/"
  const { showalert } = props
  const [cred, setCred] = useState({
    email: "",
    password: ""
  })
  let navigate = useNavigate();
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password
      })
    });
    
    const json = await response.json();
    if (json.success) {
      //save auth-token and redirect to home 
      localStorage.setItem('token', json.authtoken);

      navigate("/");
      props.showalert("Successfully loggedin", "success")

    }
    else {
      // navigate("/login");
      // props.showalert("Invalid details", "warn")
      props.showalert(json.error, "warn")

    }
  }
  return (
    <div className='login'>
      <div className="login_heading">
        <strong>Login to Your Account</strong>
      </div>
      <div className='login_form'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input type="email" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          <label htmlFor="password">Password</label>
          <input type="password" onChange={onChange} name="password" id="password" placeholder="Password" />
          <div className='forgotpassword'>Forgot password?</div>
          <button type="submit" className="login_btn">Login</button>
        </form>
        <div class="content">
          <p class="or">or</p>
        </div>
        <div className='login_social'>
          <i class="fa-brands fa-google" />
          <i class="fa-brands fa-facebook" />
        </div>
      </div>
      <div className='signup_link'>Don't have an account? <Link to='/landing/signup'>Sign up</Link></div>
    </div>
  )
}

export default Login