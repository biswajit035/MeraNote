import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="#">MeraNote</Link>
        {localStorage.getItem('token') && <div className="navbar-nav ">
          <Link className={`nav-item nav-link ${location.pathname === "/" ? "active" : ""}`} to="/" >Home</Link>
          {/* <Link className={`nav-item nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/about">About</Link> */}
        </div>}
        {localStorage.getItem('token') ?
          <button className='btn btn-primary' onClick={handleLogout} >Logout</button>
          : <form className="form-inline d-flex flex-row-reverse ">
            <Link className="btn btn-outline-primary my-2 my-sm-0 mx-3" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-primary my-2 my-sm-0 " to="/signup" role="button">Signup</Link>
          </form>}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${localStorage.getItem('token') ? "justify-content-between" : "justify-content-center"}`} id="navbarNavAltMarkup">
          
        </div>
      </nav>
    </div>
  )
}

export default Navbar