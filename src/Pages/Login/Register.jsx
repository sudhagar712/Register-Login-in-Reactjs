import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RegisterApi } from "../../Services/Api";
import { StoreData } from "../../Services/Storage";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../Services/Auth";
import Navbar from "../../Components/Navbar";


const Register = () => {

   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };


const initialStateErrors = {
    name: { required: false },
    email: { required: false },
    password: { required: false },
    custom_error: null,
  }

  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  


//   inputs states 
const [input , setInput] = useState({
    name : "",
    email: "",
    password: ""
})

// handleinput
const handleinput = (event) => {
    setInput({...input,[event.target.name]:event.target.value})
  
}
  

//   HandleSubmit

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let validationErrors = { ...initialStateErrors };
    let hasError = false;

    // Validate fields
    if (input.name === "") {
      validationErrors.name.required = true;
      hasError = true;
    }
    if (input.email === "") {
      validationErrors.email.required = true;
      hasError = true;
    }
    if (input.password === "") {
      validationErrors.password.required = true;
      hasError = true;
    }

    setErrors(validationErrors); // Fix: use validationErrors
    setLoading(false);

    if (!hasError) {
         setLoading(true);

      RegisterApi(input)
        .then((response) => {
          StoreData(response.data.idToken);
        })
        .catch((err) => {
          setErrors({
            ...validationErrors,
            custom_error: "Registration failed. Try again.",
          });
        })
        .finally(() => {
          setLoading(false);
        });

    }
  };

if (isAuthenticated()) {
  // redirect to DashBoard
  return <Navigate to="/dashboard" />
}



  return (
    <>
    <Navbar/>
      <div>
       

        <div className="bg-white rounded-lg shadow-lg p-8 w-full mx-auto my-16 max-w-md ">
          <h2 className="text-xl  text-blue-600 mb-6">Welcome to Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                for="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter a Name"
                onChange={handleinput}
                className="mt-1 p-2 w-full border rounded-md text-gray-800 outline-blue-600 shadow-lg"
              />
              {errors.name.required == true ? (
                <span className="text-red-600 text-sm">Name is Required</span>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                for="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your @Gmail"
                onChange={handleinput}
                className="mt-1 p-2 w-full border rounded-md text-gray-800 outline-blue-600 shadow-lg"
              />
              {errors.email.required == true ? (
                <span className="text-red-600 text-sm">Email is Required</span>
              ) : null}
            </div>
            <div class="mb-6 relative">
              <label
                for="password"
                className="block text-sm font-medium text-gray-600 "
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleinput}
                className="mt-1 p-2  w-full border rounded-md text-gray-800 outline-blue-600 shadow-lg"
              />

              <button
                className="absolute right-4 bottom-[14px]"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
              {errors.password.required == true ? (
                <span className="text-red-600 text-sm">
                  password is Required
                </span>
              ) : null}

             
            </div>

            {loading ? (
              <div className="flex justify-center mb-4">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-20 p-2 rounded-md text-black ${
                  loading
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-white  shadow-lg border border-blue-200 text-black hover:bg-blue-200 hover:border-none   "
                }`}
                disabled={loading}
              >
                {loading ? "Submit..." : "Register"}
              </button>
            </div>
          </form>
          <div className="mt-5 text-right">
            <p className=" text-gray-600 text-sm ">Already have an account? </p>{" "}
            <Link to="/login">
              <span className="text-blue-600 cursor-pointer ">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
