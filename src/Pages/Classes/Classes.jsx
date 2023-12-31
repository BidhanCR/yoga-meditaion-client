import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import { Bounce } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Classes = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [] } = useQuery(
    ["classes", user?.email],
    async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    }
  );

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/selectedEnrolledClasses?email=${user?.email}`)
        .then((res) => {
          setSelectedClasses(res.data);
        });
    }
  }, [user, axiosSecure]);

  const handleSelectedClass = (c) => {
    if (user) {
      const selectedClass = {
        user: {
          student_name: user.displayName,
          student_email: user.email,
        },
        class: c,
        selected_status: "Selected",
        selected_date: new Date(),
      };

      fetch("https://yoga-mindfulness-server.vercel.app/selectedClasses", {
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
    <div className="bg-[#f2ecf9]">
      <Helmet>
        <title>Inner Pease | Classes</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold py-12 text-center">
          Approved Classes
        </h1>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pb-16">
          {classes.map((c) => (
            <div
              key={c._id}
              className={`card  shadow-xl border border-green-500 ${
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
                <h2 className="card-title">
                  <Bounce delay={1e3} cascade damping={1e-1}>
                    {c.name}
                  </Bounce>
                </h2>
                <p className="text-xl">Instructor: {c.instructor}</p>
                <p className="text-xl">Enrolled Students: {c.students}</p>
                <p className="text-xl">
                  Available Seats:{" "}
                  <span className="text-green-500">{c.availableSeats}</span>
                </p>
                <p className="text-xl">
                  Price: <span className="text-green-500">${c.price}</span>
                </p>
                <div className="card-actions justify-end">
                  {user ? (
                    isAdmin || isInstructor ? (
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
                        className="btn bg-[#7aa011] hover:bg-[#98c619] text-white"
                      >
                        Select
                      </button>
                    ) : (
                      <button className="btn btn-disabled" disabled>
                        Sold Out
                      </button>
                    )
                  ) : (
                    <p>
                      <Link to="/login" className="text-blue-500">
                        Please log in to select a course.
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;
