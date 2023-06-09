import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

const ManageClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/manageClasses");
    return res.data;
  });
  const handleApprove = (c) => {
    axios
      .patch(`http://localhost:5000/classes/approved/${c._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${c.name} class is approved Now!`,
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
  const handleDeny = (c) => {
    axios
      .patch(`http://localhost:5000/classes/denied/${c._id}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${c.name} class is denied!`,
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
      <h1>Manage Classes</h1>
      <div className="grid grid-cols-1 gap-4">
        {classes.map((c) => (
          <div
            className="flex justify-between rounded items-center border border-lime-600"
            key={c._id}
          >
            <div className="ml-2 md:ml-0">
              <figure className="hidden md:block">
                <img
                  className="md:h-[250px] w-[250px] object-cover rounded"
                  src={c.image}
                  alt={c.name}
                />
              </figure>
            </div>
            <div>
              <h2>Class Name: {c.name}</h2>
              <p>Available Seats: {c.availableSeats}</p>
              <p>Price: {c.price}</p>
              <p>Instructor: {c.instructor}</p>
              <p>Email: {c.email}</p>
              <p className="mt-4">
                Status: <span className=" text-blue-700">{c.status}</span>
              </p>
            </div>
            <div className="flex flex-col space-y-2 mr-3">
              <button
                className="btn-sm btn"
                disabled={c.status === "Approved" || c.status === "Denied"}
                onClick={() => handleApprove(c)}
              >
                Approve
              </button>
              <button
                className="btn-sm btn"
                disabled={c.status === "Approved" || c.status === "Denied"}
                onClick={() => handleDeny(c)}
              >
                Deny
              </button>
              {c.status === "Denied" && (
                <button
                  className="btn-sm btn"
                  onClick={() => {
                    // const feedback = prompt("Enter your feedback");
                    // handleSendFeedback(c.id, feedback);
                  }}
                >
                  Send Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClass;
