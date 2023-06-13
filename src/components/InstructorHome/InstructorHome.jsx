import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const InstructorHome = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();
  const { data: userInfo = [] } = useQuery(
    ["userInfo", user.email],
    async () => {
      const res = await axiosSecure.get(`/userInfo?email=${user?.email}`);
      return res.data;
    }
  );
  return (
    <div className="">
      <Helmet>
        <title>Inner Pease | Instructor Profile</title>
      </Helmet>
        <h1 className="ml-8 text-3xl mb-16">Instructor Profile</h1>
        <div>
          {userInfo.map((user) => (
            <div
              key={user._id}
              className="flex flex-col md:flex-row ml-8 gap-4"
            >
              <div>
                <img className="w-48 h-48" src={user.image} alt="" />
              </div>
              <div className="ml-0 md:ml-8">
                <h2>Student Name: {user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Mobile: {user.phoneNumber}</p>
                <p>Role: {user.role}</p>
                <p>Gender: {user.gender}</p>
                <button className="btn btn-success hover:bg-green-500 mt-6">Update profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default InstructorHome;
