import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const MyEnrolledClass = () => {
  const { user } = useAuth();
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/myEnrolledClasses?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setEnrolledClasses(data));
  }, [user]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Class Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledClasses.map((c, index) => (
              <tr key={c._id}>
                <th>{index + 1}</th>
                <td>{c.class.name}</td>
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
