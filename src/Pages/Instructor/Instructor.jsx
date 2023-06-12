
import { useEffect } from "react";
import { useState } from "react";

const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/instructors")
      .then((res) => res.json())
      .then((data) => setInstructors(data));
  }, []);
  return (
    <div className="bg-[#f2ecf9]">
      <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="rounded-full w-[150px] h-[150px]"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Name: {instructor.name}</h2>
              <p>Email: {instructor.email}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Instructor;
