import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddClass = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const onSubmit = (data) => {
    // Perform submit logic here
    console.log(data);
    const formData = new FormData();
    formData.append("image", imageFile);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imagedata) => {
        const image = imagedata.data.display_url;
        console.log(image);
        const classData = {
          name: data.className,
          image,
          instructor: user?.displayName,
          email: user?.email,
          instructor_image: user?.photoURL,
          availableSeats: parseFloat(data.availableSeats),
          students: parseFloat(0),
          price: parseFloat(data.price),
          status: "Pending",
          date: new Date()
        };
        fetch("http://localhost:5000/classes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(classData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "class added successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      });
  };

  return (
    <div className="w-full md:w-1/2 mx-auto">
      <Helmet>
        <title>Inner Pease | Add Class</title>
      </Helmet>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">Add a Class</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="className"
            >
              Class Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="className"
              type="text"
              placeholder="Enter class name"
              {...register("className", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="classImage"
            >
              Class Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="classImage"
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="instructorName"
            >
              Instructor Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              id="instructorName"
              type="text"
              value={user?.displayName}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="instructorEmail"
            >
              Instructor Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              id="instructorEmail"
              type="email"
              value={user?.email}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="availableSeats"
            >
              Available Seats
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="availableSeats"
              type="number"
              placeholder="Enter available seats"
              {...register("availableSeats", { required: true })}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Enter price"
              {...register("price", { required: true })}
            />
          </div>

          <div className="">
            <button
              className="bg-success w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
