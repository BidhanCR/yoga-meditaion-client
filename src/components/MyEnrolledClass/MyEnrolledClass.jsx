import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyEnrolledClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolledClasses = [] } = useQuery(
    ["enrolledClasses", user?.email],
    async () => {
      const res = await axiosSecure.get(
        `/myEnrolledClasses?email=${user.email}`
      );
      return res.data;
    }
  );

  return (
    <div>
      <Helmet>
        <title>Inner Pease | My Enrolled Class</title>
      </Helmet>
      <h2 className="text-2xl text-center pb-16">My Enrolled Classes</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Enrolled Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses.map((c, index) => (
              <tr key={c._id}>
                <th>{index + 1}</th>
                <td>{c.class.name}</td>
                <td>{new Date(c.enrolled_date).toLocaleDateString()}</td>
                <td>{c.class.price}</td>
                <td className="text-green-500">{c.selected_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrolledClass;
