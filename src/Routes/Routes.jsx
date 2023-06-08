import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/Classes/Classes";
import DashBoard from "../Pages/DashBoard/DashBoard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: '/classes',
          element: <Classes></Classes>
        },
        {
          path: '/dashboard',
          element: <DashBoard></DashBoard>
        }
    ]
    },
  ]);

export default router;