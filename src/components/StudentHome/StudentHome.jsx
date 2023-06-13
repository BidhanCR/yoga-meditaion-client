
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const StudentHome = () => {
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
    <div >
      <Helmet>
        <title>Inner Pease | Student Profile</title>
      </Helmet>
      <h1 className="text-3xl mb-16 ml-8">Student Profile</h1>
      <div>
        {userInfo.map((user) => (
          <div key={user._id} className="flex flex-col md:flex-row ml-8 gap-4">
            <div>
              <img className="w-48 h-48" src={user.image} alt="" />
            </div>
            <div className="">
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

export default StudentHome;
