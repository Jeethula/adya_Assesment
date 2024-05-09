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
import { useDispatch } from "react-redux";
import { setId } from "./Redux/bookingSlice";
import Api from "./Api";

function App() {

   //axios.defaults.baseURL = 'http://localhost:3001';
  //axios.defaults.baseURL = 'https://adya-assesment.onrender.com';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
     setIsLoggedIn(storedIsLoggedIn === "true");
  }, []);


  const handleLogin = async (username, password) => {
    const result = await Api.get('/user/Login',{ params: { name: username, password: password  } })
    console.log(result,'wdwdwdd')
    if(result.data.message===true){
        setIsLoggedIn(true);
        dispatch(setId({
          id:result.data.user.id,
        }))
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token",result.data.token)
        sessionStorage.setItem("username",username);
        sessionStorage.setItem("id",result.data.user.id);
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
