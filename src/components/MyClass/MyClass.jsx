import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedClassData, setUpdatedClassData] = useState({
    name: "",
    image: "",
    availableSeats: 0,
    price: 0
  });

  const handleChange = (e) => {
    setUpdatedClassData({
      ...updatedClassData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClick = (classItem) => {
    setSelectedClass(classItem);
    setUpdatedClassData({
      name: classItem.name,
      image: classItem.image,
      availableSeats: classItem.availableSeats,
      price: classItem.price,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, image, availableSeats, price } = updatedClassData;
      const updatedData = {
        name,
        image,
        availableSeats: parseFloat(availableSeats),
        price: parseFloat(price),
      };
      await axiosSecure.patch(`/updateClass/${selectedClass._id}`, updatedData);
      toast.success('Class data updated successfully')
      console.log("Class data updated successfully");
      refetch();
    } catch (error) {
      console.error("Failed to update class data", error);
      toast.error(error.message);
    }
    setSelectedClass(null);
    setShowUpdateModal(false);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Class Name</th>
              <th>Available Seats</th>
              <th>Enrolled Students</th>
              <th>Status</th>
              <th>Action</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {classes.map((classItem, index) => (
              <tr key={classItem._id}>
                <th>{index + 1}</th>
                <td>{classItem.name}</td>
                <td>{classItem.availableSeats}</td>
                <td>{classItem.students}</td>
                <td className="text-green-600">{classItem.status}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleUpdateClick(classItem)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  {classItem.feedback && (
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        setSelectedClass(classItem);
                        setShowViewModal(true);
                      }}
                    >
                      View Feedback
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewModal && selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Feedback</h2>
            <p>{selectedClass.feedback}</p>

            <div className="flex justify-end">
              <button
                className="btn btn-sm mr-2"
                onClick={() => {
                  setSelectedClass(null);
                  setShowViewModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative bg-white rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4">
              Update Class: {selectedClass.name}
            </h2>
            <form onSubmit={handleUpdateSubmit} className="flex flex-col">
              <label htmlFor="name">Class Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedClassData.name}
                onChange={handleChange}
              />

              <label htmlFor="availableSeats">Available Seats:</label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                value={updatedClassData.availableSeats}
                onChange={handleChange}
              />
              
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedClassData.price}
                onChange={handleChange}
              />

              <button type="submit" className="btn btn-primary mt-4">
                Save
              </button>
            </form>

            <div className="flex justify-end mt-2">
              <button
                className="btn btn-sm mr-2"
                onClick={() => {
                  setSelectedClass(null);
                  setShowUpdateModal(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;
