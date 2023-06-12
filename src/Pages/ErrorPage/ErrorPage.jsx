import { Link } from "react-router-dom";
import {AiOutlineArrowLeft} from "react-icons/Ai";
const ErrorPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-16">
      <img className='w-52 h-52 rounded-full object-fit border-2' src="https://i.ibb.co/DQG1Jrk/89867-404-error-1.gif" alt="" />
      <h1 className="text-xl my-6 text-red-300">Oops! Something went wrong.</h1>
      <p className="text-xl mb-4">We apologize for the inconvenience. Please try again later.</p>
      <button className="btn btn-success"><Link to="/"><AiOutlineArrowLeft className="inline-block text-xl"/> Go back to Home</Link></button>
    </div>
  );
};

export default ErrorPage;