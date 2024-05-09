import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar({ username }) {

    const navigate = useNavigate();
    const name = sessionStorage.getItem("username");

    const date = new Date();
    const currentHour = date.getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Good afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      greeting = 'Good evening';
    } else {
      greeting = 'Good night';
    }

    const handleSignout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token")
        navigate("/");
        window.location.reload();
    }

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-500 z-10">
      <div className="container px-3 flex h-16 items-center justify-between">
        <div className="flex gap-x-5 items-center ">
          <img className=' h-14 w-14 rounded-[100%]' src="https://cdn1.vectorstock.com/i/1000x1000/82/80/lorem-ipsum-business-logo-template-vector-36328280.jpg" alt="" />
          <span className="text-lg text-white font-bold mr-2">{greeting}, {name}</span>
        </div>
        <div>
          <button className="bg-white font-semibold h-fit w-fit p-2 rounded-md" onClick={handleSignout}>
              Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

