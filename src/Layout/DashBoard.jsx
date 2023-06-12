import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useInstructor from '../Hooks/useInstructor';
import useAuth from '../Hooks/useAuth';

const DashBoard = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  return (
    <div className="flex flex-row bg-[#f2ecf9]">
      {/* Left side */}
      <div className="w-1/4 bg-gray-200 h-screen">
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
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/myClass">My Class</Link>
              </li>
            </>
          )}
          {user && !isAdmin && !isInstructor && (
            <>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/studentHome">Student Home</Link>
              </li>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/mySelectedClass">My Selected Class</Link>
              </li>
              <li className="px-6 py-2 hover:bg-gray-300">
                <Link to="/dashboard/myEnrolledClass">My Enrolled Class</Link>
              </li>
            </>
          )}

          <li className="px-6 py-2 hover:bg-gray-300">
            <Link to="/">Home</Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>

      {/* Right side */}
      <div className="w-3/4">
        {/* Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;






