import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";

const ManageClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/manageClasses");
    return res.data;
  });

  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
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
            title: `${c.name} class is denied Now!`,
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
  const handleSendFeedback = () => {
    if (feedback.trim() === "") {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please enter your feedback",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    axios
      .patch(`http://localhost:5000/classes/feedback/${selectedClass._id}`, {
        feedback,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          setFeedback("");
          setSelectedClass(null);
          setShowModal(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${selectedClass.name} class feedback sent successfully!`,
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
                    setSelectedClass(c);
                    setShowModal(true);
                  }}
                >
                  Send Feedback
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-lg p-8 max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Send Feedback</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <div className="flex justify-end">
              <button
                className="btn-sm btn mr-2"
                onClick={() => {
                  setFeedback("");
                  setSelectedClass(null);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-sm btn-primary"
                onClick={handleSendFeedback}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClass;
