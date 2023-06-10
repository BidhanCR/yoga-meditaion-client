
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { toast } from "react-hot-toast";

const Login = () => {
  const {signIn} = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    
    console.log(data);
    signIn(data.email, data.password)
    .then(result=> {
      console.log(result.user)
      toast.success('logged in successfully')
      navigate(from, { replace: true })
    })
    .catch(error=> console.log(error))
  };
  

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
            </button>
          </div>
          {errors.password && <span className="text-red-500">Password is required</span>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <Link to="/register" className="text-blue-500 hover:text-blue-700 text-sm">
            Register
          </Link>
        </div>
        <SocialLogIn></SocialLogIn>
      </form>
      
    </div>
  );
};

export default Login;


