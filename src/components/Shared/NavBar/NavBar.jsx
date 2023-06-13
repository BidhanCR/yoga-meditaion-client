import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import useInstructor from "../../../Hooks/useInstructor";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (paths) => {
    return paths.some((path) => location.pathname === path)
      ? "text-success"
      : "";
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="navbar bg-base-100 flex justify-between">
        <div className="">
          {/* Dropdown Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              {/* Dropdown icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            {/* Dropdown content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 border border-gray-400 rounded-box w-52"
            >
              <li className={isActive(["/"])}>
                <Link to="/" className={isActive(["/"]) ? "active-link" : ""}>
                  Home
                </Link>
              </li>
              <li className={isActive(["/instructor"])}>
                <Link
                  to="/instructor"
                  className={isActive(["/instructor"]) ? "active-link" : ""}
                >
                  Instructors
                </Link>
              </li>
              <li className={isActive(["/classes"])}>
                <Link
                  to="/classes"
                  className={isActive(["/classes"]) ? "active-link" : ""}
                >
                  Classes
                </Link>
              </li>
              {user && (
                <li
                  className={isActive([
                    "/dashboard/adminhome",
                    "/dashboard/instructorhome",
                    "/dashboard/studentHome",
                  ])}
                >
                  <Link
                    to={
                      isAdmin
                        ? "/dashboard/adminhome"
                        : isInstructor
                        ? "/dashboard/instructorhome"
                        : "/dashboard/studentHome"
                    }
                    className={
                      isActive([
                        "/dashboard/adminhome",
                        "/dashboard/instructorhome",
                        "/dashboard/studentHome",
                      ])
                        ? "active-link"
                        : ""
                    }
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* Logo */}
          <img
            className="w-24 h-24"
            src="https://i.ibb.co/MDbg7D8/2.jpg"
            alt=""
          />
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className={`text-xl ${isActive(["/"])}`}>
              <Link to="/" className={isActive(["/"]) ? "active-link" : ""}>
                Home
              </Link>
            </li>
            <li className={`text-xl ${isActive(["/instructor"])}`}>
              <Link
                to="/instructor"
                className={isActive(["/instructor"]) ? "active-link" : ""}
              >
                Instructors
              </Link>
            </li>
            <li className={`text-xl ${isActive(["/classes"])}`}>
              <Link
                to="/classes"
                className={isActive(["/classes"]) ? "active-link" : ""}
              >
                Classes
              </Link>
            </li>
            {user && (
              <li
                className={`text-xl ${isActive([
                  "/dashboard/adminhome",
                  "/dashboard/instructorhome",
                  "/dashboard/studentHome",
                ])}`}
              >
                <Link
                  to={
                    isAdmin
                      ? "/dashboard/adminhome"
                      : isInstructor
                      ? "/dashboard/instructorhome"
                      : "/dashboard/studentHome"
                  }
                  className={
                    isActive([
                      "/dashboard/adminhome",
                      "/dashboard/instructorhome",
                      "/dashboard/studentHome",
                    ])
                      ? "active-link"
                      : ""
                  }
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-none">
          {/* Dropdown Menu */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-16 rounded-full">
                <img
                  src={
                    user
                      ? user.photoURL
                      : "https://i.ibb.co/6B8n1th/placeholder.jpg"
                  }
                  alt="Profile"
                />
              </div>
            </label>
            {/* Dropdown content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 border border-gray-400 rounded-box w-52"
            >
              <li
                className={isActive([
                  "/dashboard/adminhome",
                  "/dashboard/instructorhome",
                  "/dashboard/studenthome",
                ])}
              >
                <Link
                  to={
                    isAdmin
                      ? "/dashboard/adminhome"
                      : isInstructor
                      ? "/dashboard/instructorhome"
                      : "/dashboard/studenthome"
                  }
                  className={
                    isActive([
                      "/dashboard/adminhome",
                      "/dashboard/instructorhome",
                      "/dashboard/studenthome",
                    ])
                      ? "active-link"
                      : ""
                  }
                >
                  Profile
                </Link>
              </li>
              {user ? (
                <li>
                  <button onClick={handleLogOut}>Log out</button>
                </li>
              ) : (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
