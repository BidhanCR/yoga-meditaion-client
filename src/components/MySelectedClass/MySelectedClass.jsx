import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const MySelectedClass = () => {
  const { user } = useAuth();
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/selectedClasses?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setSelectedClasses(data));
  }, [user]);

  const handleDeleteClass = (selectedClass) => {
    fetch(`http://localhost:5000/selectedClasses/${selectedClass._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedClasses(
          selectedClasses.filter((c) => c._id !== selectedClass._id)
        );
        if (data.deletedCount > 0) {
          toast.success("Selected class deleted successfully");
        }
      })
      .catch((error) => {
        console.error("Failed to delete selected class:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Selected Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedClasses.map((selectedClass) => (
          <div key={selectedClass._id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">
              {selectedClass.class.name}
            </h2>
            <p className="text-gray-500">
              Instructor: {selectedClass.class.instructor}
            </p>
            <p className="text-gray-500">Price: ${selectedClass.class.price}</p>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2">
                <Link
                  to="/dashboard/payment"
                  state={{ classData: selectedClass }}
                >
                  Pay
                </Link>
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2"
                onClick={() => handleDeleteClass(selectedClass)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySelectedClass;
