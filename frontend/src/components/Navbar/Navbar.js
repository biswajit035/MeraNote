import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './navbar.css'


function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/landing/login');
    }
    return (
        
        <div className='navbar'>
            <div className='navbar_heading'>MeraNote</div>
            {localStorage.getItem('token') &&<button className='logout_btn' onClick={handleLogout} >Logout</button>}
        </div>
    )
}

export default Navbar