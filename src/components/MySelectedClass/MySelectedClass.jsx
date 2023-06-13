import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MySelectedClass = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: selectedClasses = [], refetch } = useQuery(
    ["selectedClasses", user?.email],
    async () => {
      const res = await axiosSecure.get(`/selectedClasses?email=${user.email}`);
      return res.data;
    }
  );

  const handleDeleteClass = (selectedClass) => {
    axios
      .delete(`http://localhost:5000/selectedClasses/${selectedClass._id}`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        refetch();
        if (data.deletedCount > 0) {
          toast.success("Selected class deleted successfully");
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Inner Pease | My Selected Class</title>
      </Helmet>
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
              <Link
                to="/dashboard/payment"
                state={{ classData: selectedClass }}
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2">
                  Pay
                </button>
              </Link>

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
