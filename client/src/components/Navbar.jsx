import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar({ username }) {

    const navigate = useNavigate();

    const handleSignout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
        window.location.reload();
    }

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-400 z-10">
      <div className="container mx-auto px-2 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">jeethu</span>
        </div>
        <div className="flex-grow flex items-center">
          <input type="text" className="rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" placeholder="Search..." />
        </div>
        <button className="focus:outline-none bg-red-300 " onClick={handleSignout}>
            Sign out
        </button>
      </div>
    </nav>
  )
}

export default Navbar;

