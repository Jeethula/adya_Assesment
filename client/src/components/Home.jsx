import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar';

function Home() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

  return (
    <div>
        <Navbar/>
        <div className='mt-[60px]'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home
