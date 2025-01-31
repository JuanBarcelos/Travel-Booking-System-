import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Booking from "./pages/Booking/Booking";
import CreateUser from "./pages/CreateUser/CreateUser";
import RegisterUser from "./pages/RegisterUser/RegisterUser";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/booking",
    element: <Booking />
  },
  {
    path: "/register",
    element: <RegisterUser />
  },
  {
    path: "/register/user",
    element: <CreateUser />
  },
]); 
