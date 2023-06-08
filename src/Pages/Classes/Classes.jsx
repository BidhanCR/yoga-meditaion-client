import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Classes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((c) => (
          <div
            key={c.id}
            className={`card card-compact w-96 bg-base-100 shadow-xl ${
              c.availableSeats === 0 ? "bg-red-200" : ""
            }`}
          >
            <figure>
              <img src={c.image} alt={c.name} />
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
                  c.availableSeats > 0 ? (
                    <Link to={`/select-class/${c.id}`}>
                      <button className="btn btn-primary">Select</button>
                    </Link>
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




