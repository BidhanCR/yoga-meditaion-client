import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";

const MyClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(
    ["classes", user.email],
    async () => {
      const res = await axiosSecure.get(`/myClass?email=${user.email}`);
      return res.data;
    }
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>AvailableSeats</th>
              <th>Enrolled Students</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes.map((classItem, index) => (
              <tr key={classItem._id}>
                <th>{index + 1}</th>
                <td>{classItem.name}</td>
                <td>{classItem.availableSeats}</td>
                <td>{classItem.students}</td>
                <td className="text-green-600">{classItem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
