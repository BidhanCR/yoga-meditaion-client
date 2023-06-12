import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularInstructor = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/popularInstructors")
      .then((res) => res.json())
      .then((data) => setPopularInstructors(data));
  }, []);

  return (
    <div className="bg-[#f2ecf9]">
      <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center py-12">Popular Instructor</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {popularInstructors.map((instructor) => (
          <div key={instructor._id} className="card  bg-base-100 shadow-xl">
            <figure>
              <img className="h-[300px] w-full object-cover" src={instructor.instructorImage} alt={instructor._id} />
            </figure>
            <div className="p-4">
              <h2 className="card-title">
               Instructor Name: {instructor._id}
                <div className="badge badge-secondary">Popular</div>
              </h2>
              <p>Total Enrolled Students: {instructor.totalStudents}</p>
              <p>Courses:</p>
              <div className="ms-8">
                {instructor.classNames.map((className) => (
                  <li key={className}>{` ${className}`}</li>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="text-center py-8">
          <Link to="/instructor">
            <button className="btn bg-[#7aa011] hover:bg-[#98c619] text-white">Show all our Instructors</button>
          </Link>
        </div>
    </div>
  );
};

export default PopularInstructor;
