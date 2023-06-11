import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";

const Classes = () => {
  const { user } = useAuth();
  const [ isAdmin ] = useAdmin();
  const [ isInstructor ] = useInstructor();

  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/selectedEnrolledClasses?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedClasses(data);
        })
        .catch((error) => {
          console.error("Failed to fetch selected classes:", error);
        });
    }
  }, [user]);

  const handleSelectedClass = (c) => {
    if (user) {
      const selectedClass = {
        user: {
          student_name: user.displayName,
          student_email: user.email,
        },
        class: c,
        selected_status: "Selected",
      };

      fetch("http://localhost:5000/selectedClasses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Class is selected successfully");
          setSelectedClasses([...selectedClasses, selectedClass]);
        })
        .catch((error) => {
          console.error("Failed to save selected class:", error);
        });
    }
  };

  const isClassSelected = (c) => {
    return selectedClasses.some((sc) => sc.class._id === c._id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Classes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <div
            key={c._id}
            className={`card card-compact w-96 bg-base-100 shadow-xl ${
              c.availableSeats === 0 ? "bg-red-200" : ""
            }`}
          >
            <figure>
              <img
                className="h-[300px] w-full object-cover"
                src={c.image}
                alt={c.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{c.name}</h2>
              <p className="text-gray-500">{c.instructor}</p>
              <p className="text-gray-500">
                Available Seats: {c.availableSeats}
              </p>
              <p className="text-gray-500">Price: ${c.price}</p>
              <div className="card-actions justify-end">
              {user ? (
  (isAdmin || isInstructor) ? (
    <button className="btn btn-disabled" disabled>
      Select
    </button>
  ) : isClassSelected(c) ? (
    <button className="btn btn-disabled" disabled>
      Select
    </button>
  ) : c.availableSeats > 0 ? (
    <button
      onClick={() => handleSelectedClass(c)}
      className="btn btn-primary"
    >
      Select
    </button>
  ) : (
    <button className="btn btn-disabled" disabled>
      Sold Out
    </button>
  )
) : (
  <p>Please log in to select a course.</p>
)}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
