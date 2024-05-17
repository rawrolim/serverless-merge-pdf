import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from "react";
import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./pages/home";
import Merge from "./pages/merge";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/merge",
      element: <Merge />
    }
  ]);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <>
      <ToastContainer position={"top-left"} />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
