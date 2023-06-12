import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { toast } from "react-hot-toast";
import { Circles } from "react-loader-spinner";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    setIsLoggingIn(true);
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("logged in successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setIsLoggingIn(false);
        if (error.code === "auth/wrong-password") {
          setLoginError("Wrong password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setLoginError("Invalid user. Please try again.");
        } else {
          setLoginError("Error: User or password not found.");
        }
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-[#f2ecf9]">
      <div className="flex flex-col justify-center items-center pt-8">
        <form
          className="w-96 bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl text-center mt-8 mb-2">Login Here</h2>
          <hr className="border-t-2 border-gray-300 mx-auto mb-16" />
          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
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
            {errors.password && (
              <span className="text-red-500">Password is required</span>
            )}
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full relative"
              type="submit"
              disabled={isLoggingIn}
            >
              {!isLoggingIn ? (
                "Login"
              ) : (
                <>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Circles
                      height={30}
                      width={30}
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                    />
                  </span>
                  <span className="invisible">Login</span>
                </>
              )}
            </button>
            <p className="text-center mt-2">
              New here? Please{" "}
              <Link to="/register" state={{ from }} className=" btn-link">
                Register
              </Link>
            </p>
          </div>
          <div className="mt-8">
            <div className="divider">OR</div>
            <SocialLogIn></SocialLogIn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
