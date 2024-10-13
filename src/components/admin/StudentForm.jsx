import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerStudent } from "../../redux/slices/studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  //schoolId,firstname, lastname,gender,email,phone,class:classArray,role,password,
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [getUserDetails, setUserDetails] = useState({
    schoolId: "670be3720823163c55cde061",
    firstname: "",
    lastname: "",
    gender: "male",
    email: "",
    phone: "",
    class: ["12A"],
    role: "student",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...getUserDetails,
      [name]: value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(registerStudent(getUserDetails)).unwrap();
      if (response.status) {
        toast.success(response.message);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.error || "Something went wrong. Please try again.");
      console.error("Error222:", error);
    }
  };

  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <ToastContainer />
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Student Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={getUserDetails.firstname}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={getUserDetails.lastname}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={getUserDetails.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={getUserDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={getUserDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class
            </label>
            <input
              type="text"
              name="class"
              value={getUserDetails.class}
              onChange={() => {}}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={getUserDetails.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
