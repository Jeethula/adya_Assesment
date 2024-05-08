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
    <nav className="fixed top-0 left-0 w-full bg-blue-500 z-10">
      <div className="container mx-auto px-2 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-bold mr-2">jeethu</span>
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

