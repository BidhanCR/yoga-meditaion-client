import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Classes from "../Pages/Classes/Classes";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../components/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddClass from "../components/AddClass/AddClass";
import InstructorRoute from "./InstructorRoute";
import AdminHome from "../components/AdminHome/AdminHome";
import InstructorHome from "../components/InstructorHome/InstructorHome";
import PrivateRoute from "./PrivateRoute"
import UserHome from "../components/UserHome/UserHome";

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
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      {
        path: "adminhome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "addUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>
      },
      {
        path: "instructorhome",
        element: (
          <InstructorRoute>
            <InstructorHome></InstructorHome>
          </InstructorRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "userhome",
        element: <UserHome></UserHome>
      }
    ],
  },
]);

export default router;
