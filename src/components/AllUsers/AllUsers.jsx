import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (user) => {
    axios
      .patch(`http://localhost:5000/users/admin/${user._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex flex-col md:w-1/2  space-y-2 ">
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-primary btn-sm"
                    disabled={user.role === "admin"}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    disabled={user.role === "instructor"}
                  >
                    Make Instructor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
