import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Circles } from "react-loader-spinner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";
import { Helmet } from "react-helmet";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [imageFile, setImageFile] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setIsRegister(true);
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
      .then((imageData) => {
        const photoUrl = imageData.data.display_url;
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, photoUrl)
              .then(() => {
                const saveUser = {
                  name: data.name,
                  email: data.email,
                  role: "student",
                  image: photoUrl,
                  gender: data.gender,
                  phoneNumber: data.phoneNumber,
                  account_created_date: new Date(),
                };
                fetch("https://yoga-mindfulness-server.vercel.app/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(saveUser),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.insertedId) {
                      reset();
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User created successfully.",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate(from, { replace: true });
                    }
                  });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.log(error);
            setIsRegister(false);
            let errorMessage =
              "An error occurred during registration. Please try again later.";
            if (error.code === "auth/email-already-in-use") {
              errorMessage = "Email is already in use.";
            } else if (error.code === "auth/invalid-email") {
              errorMessage = "Invalid email.";
            } else if (error.code === "auth/weak-password") {
              errorMessage =
                "Weak password. Password should be at least 6 characters long.";
            }
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text: errorMessage,
            });
          });
      });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const password = watch("password");

  return (
    <div className="bg-[#f2ecf9]">
      <Helmet>
        <title>Inner Pease | Register</title>
      </Helmet>
      <div className="flex justify-center items-center pt-8">
        <form
          className="w-full md:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl text-center mt-8 mb-2">Register Here</h2>
          <hr className="border-t-2 border-gray-300 mx-auto mb-16" />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
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
                type={passwordVisible ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be 6 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must have one Uppercase, one lower case, one number and
                one special character.
              </span>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <HiEyeOff size={18} />
                ) : (
                  <HiEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photoUrl"
            >
              Photo URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photoUrl"
              type="file"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            {errors.photoUrl && (
              <span className="text-red-500">Invalid Photo URL</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              {...register("gender", { required: true })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">Invalid phone number</span>
            )}
          </div>
          <div className="">
            <button
              className="btn-success hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full relative"
              type="submit"
              disabled={isRegister}
            >
              {!isRegister ? (
                "Register"
              ) : (
                <>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Circles
                      height={30}
                      width={30}
                      color="#4fa94d"
                      ariaLabel="circles-loading"
                    />
                  </span>
                  <span className="invisible">Register</span>
                </>
              )}
            </button>
            <p className="text-center mt-4">
              Already have an account? Please{" "}
              <Link to="/login" className="btn-link">
                Login here
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

export default Register;
