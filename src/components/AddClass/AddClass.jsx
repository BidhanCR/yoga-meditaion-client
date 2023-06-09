
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const AddClass = () => {
  const {user} = useAuth();
    const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Perform submit logic here
    console.log(data);
  };

  return (
    <div className='w-full md:w-1/2 mx-auto'>
      <div>
      <h1  className="text-2xl font-bold mb-4 text-center">Add a Class</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="className">
            Class Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="className"
            type="text"
            placeholder="Enter class name"
            {...register('className', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="classImage">
            Class Image
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="classImage"
            type="text"
            placeholder="Enter class image URL"
            {...register('classImage', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="availableSeats">
            Available Seats
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="availableSeats"
            type="number"
            placeholder="Enter available seats"
            {...register('availableSeats', { required: true })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Enter price"
            {...register('price', { required: true })}
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
