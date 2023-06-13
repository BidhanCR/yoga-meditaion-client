import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const PopularClass = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch("https://yoga-mindfulness-server.vercel.app/popularClass")
      .then((res) => res.json())
      .then((data) => setPopularClasses(data));
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="bg-[#f2ecf9]">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center py-12">
          Popular Classes
        </h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {popularClasses.map((c) => (
            <div
              data-aos="flip-up"
              key={c._id}
              className="card w-full bg-base-100 shadow-xl"
            >
              <figure className="px-10 pt-10">
                <img
                  src={c.image}
                  alt={c.name}
                  className="rounded-xl h-[250px] w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Class Name: {c.name}</h2>
                <h2 className="card-title">Instructor: {c.instructor}</h2>
                <p>Enrolled Students: {c.students}</p>
                <p>Available Seats: only {c.availableSeats}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center py-8">
          <Link to="/classes">
            <button className="btn bg-[#7aa011] hover:bg-[#98c619] text-white">
              Explore More Classes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularClass;
