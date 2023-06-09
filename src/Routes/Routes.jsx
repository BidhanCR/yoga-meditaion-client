import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/Classes/Classes";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../components/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <AdminRoute><DashBoard></DashBoard></AdminRoute>,
    children: [
      {
        path: "",
        element: <AllUsers />,
      },
    ],
  },
]);

export default router;
