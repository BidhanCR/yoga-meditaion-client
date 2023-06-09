
import { Link, Outlet } from 'react-router-dom';

const DashBoard = () => {
    return (
        <div className="flex flex-row h-screen">
            {/* Left side */}
            <div className="w-1/4 bg-gray-200">
                {/* Link menu */}
                <ul className="py-4">
                    <li className="px-6 py-2 hover:bg-gray-300"><Link to="">All Users</Link></li>
                    <li className="px-6 py-2 hover:bg-gray-300">Link 2</li>
                    <li className="px-6 py-2 hover:bg-gray-300">Link 3</li>
                    <li className="px-6 py-2 hover:bg-gray-300"><Link to="/">Home</Link></li>
                    {/* Add more links as needed */}
                </ul>
            </div>

            {/* Right side */}
            <div className="w-3/4 bg-white">
                {/* Content */}
                <div className="p-4">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;




