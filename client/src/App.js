import React from "react";
import {
  Link,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import Hai from "./components/Hai";
import Login from "./components/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Hai />,
    
  },
  {
    path: "about",
    element: <Login />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
