import React from "react";
import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import axios from 'axios';
import PrivateRoute from "./components/PrivateRoute";
import Houses from "./components/Houses";
import Rent from "./components/Rent";
import Booking from "./components/Booking";
import MyBooking from "./components/MyBooking";
import SignUp from "./components/SignUp";

function App() {

   axios.defaults.baseURL = 'http://localhost:3001';
  //axios.defaults.baseURL = 'https://adya-assesment.onrender.com';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
     setIsLoggedIn(storedIsLoggedIn === "true");
  }, []);


  const handleLogin = async (username, password) => {
    const result = await axios.get('/user/Login',{ params: { name: username, password: password  } })
    console.log(result,'wdwdwdd')
    if(result.data.message===true){
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username",username);
      }
      else{
        console.log("Login failed");
      }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Navigate to="/home" replace /> : <Login handleLogin={handleLogin} />,
    },
    {
      path:"signup",
      element:<SignUp/>
    },
    {
      path: "home",
      element: <PrivateRoute><Home /></PrivateRoute>,
      children: [
        { path: "", element: <Houses/> },
        { path: "booking", element: <Booking/>  },
        { path: "rent", element: <Rent/>},
        { path: "MyBookings", element: <MyBooking/>},
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
