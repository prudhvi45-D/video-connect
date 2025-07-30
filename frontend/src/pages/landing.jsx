import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom';
export default function landing() {
  return (
    <div className='landingpage'>
      <nav>
        <div className='navheader'>
          <h2>
            Meetly
          </h2>
        </div>
        <div className='navlist'>
          <p>Join as guest</p>
          <p>Register</p>
          <div role='button' className='navbtn'>
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className='landingpagecontent'>
        <div>
          <h1> <span style={{color:"#ff9839"}}>Meetly  </span>
            Connect with your loved ones
        </h1>
        <br></br>
        <p>Cover a distance by just a click on Meetly</p>
        <div role='button' className='btn'>
          <Link to="/home">
            Get Started
          </Link>
        </div>
        </div>
        <div>
          <img src="/public/mobile.png" alt="mobile" />
        </div>
        
        
      </div>

    </div>
  )
}
