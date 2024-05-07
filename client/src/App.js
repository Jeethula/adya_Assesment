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

function App() {

  axios.defaults.baseURL = 'http://localhost:3001';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
     const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
     setIsLoggedIn(storedIsLoggedIn === "true");
  }, []);


  const handleLogin = async (username, password) => {
    const result = await axios.get('/user/Login',{ params: { name: username, password: password  } })
    if(result.data.message===true){
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
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
      path: "home",
      element: <PrivateRoute><Home /></PrivateRoute>,
      children: [
        { path: "", element: <h1>Welcome to Home</h1>},
        { path: "complete", element: <h1>Welcome to Home</h1> },
        { path: "about", element: <h1>About</h1> },
        { path: "contact", element: <h1>Contact</h1> },
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
