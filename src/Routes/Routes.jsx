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
import PrivateRoute from "./PrivateRoute";

import StudentHome from "../components/StudentHome/StudentHome";
import ManageClass from "../components/ManageClass/ManageClass";
import MyClass from "../components/MyClass/MyClass";
import MySelectedClass from "../components/MySelectedClass/MySelectedClass";
import Payment from "../components/Payment/Payment";


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
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
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
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageClass",
        element: (
          <AdminRoute>
            <ManageClass></ManageClass>
          </AdminRoute>
        ),
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
        path: "myClass",
        element: (
          <InstructorRoute>
            <MyClass></MyClass>
          </InstructorRoute>
        ),
      },
      {
        path: "addUsers",
        element: (
          <InstructorRoute>
            <AllUsers></AllUsers>
          </InstructorRoute>
        ),
      },
      {
        path: "studentHome",
        element: <StudentHome></StudentHome>,
      },
      {
        path: "mySelectedClass",
        element: <MySelectedClass></MySelectedClass>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      }
    ],
  },
]);

export default router;
