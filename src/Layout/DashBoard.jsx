import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import useAuth from '../Hooks/useAuth';

const DashBoard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="flex flex-row h-screen">
      {/* Left side */}
      <div className="w-1/4 bg-gray-200">
        {/* Link menu */}
        <ul className="py-4">
          {isAdmin && (
            <>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/adminhome">Admin Home</Link>
              </li>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/allUsers">Manage Users</Link>
              </li>
              <li className="px-6 py-2 hover:bg-gray-300"><Link to='/dashboard/manageClass'>Manage Class</Link></li>
            </>
          )}
          {isInstructor && (
            <>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/instructorhome">Instructor Home</Link>
              </li>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/addClass">Add Class</Link>
              </li>
              {user && !isAdmin && !isInstructor && (
                <>
                  <li className="px-6 py-2 hover:bg-gray-300">
                    <Link to="/dashboard/studentHome">Student Home</Link>
                  </li>
                  <li className="px-6 py-2 hover:bg-gray-300">
                    <Link to="">Enrolled Class</Link>
                  </li>
                </>
              )}
            </>
          )}

          <li className="px-6 py-2 hover:bg-gray-300">
            <Link to="/">Home</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>

      {/* Right side */}
      <div className="w-3/4 bg-white">
        {/* Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;






