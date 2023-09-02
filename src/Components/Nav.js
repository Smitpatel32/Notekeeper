import React from 'react'
import {
  Link, useLocation
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../Image/Logo1.png";

export default function Nav() {
  let location = useLocation();
  const navigate = useNavigate();
  const handleClick = ()=>{
    localStorage.removeItem('token')
    navigate('login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top position-sticky">
        <div className="container-fluid" >
          <Link className="navbar-brand d-flex align-item-center" to="/home">
            <img src={Logo} className="img-thumbnail mx-2" style={{height:"30px"}} alt="Logo"/>NoteKeeper</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/home" || location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
         {(!localStorage.getItem('token'))? <li className="nav-item d-flex">
            <Link className="nav-link" to="/login" role="button">Login</Link>
            <Link className="nav-link" to="/signup" role="button">Signup</Link>
          </li> :<li className="nav-item" ><button className="nav-link" onClick={handleClick}>Logout</button></li>}
            </ul>
        </div>
          </div>
      </nav>
    </>
  )
  }