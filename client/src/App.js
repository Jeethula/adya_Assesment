import React from "react";
import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import Hai from "./components/Hai";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import axios from 'axios';

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
      element: isLoggedIn ? <Navigate to="/Home" replace /> : <Login handleLogin={handleLogin} />,
    },
    {
      path: "Home",
      element: isLoggedIn ? <Hai /> : <Navigate to="/" replace />,
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
