import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "http://localhost:8000/"
  // const host = "https://meranoteserver.herokuapp.com/"
  const { showalert } = props
  let navigate = useNavigate();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: ""
  })
  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cred.name,
        email: cred.email,
        password: cred.password
      })
    });
    const json = await response.json();
    if (json.success) {
      // save auth-token and redirect to home 
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showalert("Account created succefully", "success");
    }
    else {
      props.showalert(json.error, "warn")
    }
    // console.log(json);
  }
  return (
      <div className='signup'>
        <div className="signup_heading">
          <strong>Create Account to Continue</strong>
        </div>
        <div className='signup_form'>
          <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name </label>
              <input type="text" onChange={onChange} name="name" id="name" placeholder="Enter Name.." />
              <label htmlFor="email ">Email address</label>
              <input type="email" onChange={onChange} name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
              <label htmlFor="password">Password</label>
          <input type="password" onChange={onChange} name="password" id="password" placeholder="Password" minlength="5" />
            <button type="submit" className="signup_btn">Signup</button>
          </form>
        </div>
      <div className='signup_link'>Already have an account? <Link to='/landing/login'>Sign in</Link></div>

      </div>
  )
}

export default Signup