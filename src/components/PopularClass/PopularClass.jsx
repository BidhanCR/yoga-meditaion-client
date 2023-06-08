import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PopularClass = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/popularClass')
      .then((res) => res.json())
      .then((data) => setPopularClasses(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Popular Classes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {popularClasses.map((c) => (
          <div key={c._id} className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={c.image} alt={c.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{c.name}</h2>
              <p>Students: {c.students}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center my-8'>
      <Link to="classes"><button className='btn btn-primary'>See All Classes</button></Link>
      </div>
    </div>
  );
};

export default PopularClass;
