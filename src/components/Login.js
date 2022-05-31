import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../home.css'

const Login = (props) => {
  const host = "https://meranoteserver.herokuapp.com/"
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
      props.showalert("Logged in successfully", "success")
    }
    else {
      // navigate("/login");
      props.showalert("Invalid details", "danger")
    }
    // console.log(json.success);
  }
  return (
    <>
      <h1 className="text-center"><strong>Login to Your Account</strong></h1>
      <div className='w-25 loginform'>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="email ">Email address</label>
            <input type="email" onChange={onChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={onChange} name="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary subbt">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login