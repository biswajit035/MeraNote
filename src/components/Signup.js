import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "https://meranoteserver.herokuapp.com/"
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
      props.showalert("Invalid credintials", "danger")
    }
    // console.log(json);
  }
  return (
    <>
      <h1 class="text-center"><strong>Create Account to Continue</strong></h1>
      <div className='w-25 loginform'>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name ">Name: </label>
            <input type="text" onChange={onChange} name="name" className="form-control" id="name" placeholder="Enter Name.." />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email ">Email address</label>
            <input type="email" onChange={onChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group my-3">
            <label htmlFor="password">Password</label>
            <input type="password" onChange={onChange} name="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary subbt">Signup</button>
        </form>
      </div>
    </>
  )
}

export default Signup