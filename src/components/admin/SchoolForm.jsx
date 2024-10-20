import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";

const SchoolForm = () => {
    const dispatch = useDispatch()

  const navigate = useNavigate();
  const [getSchoolDetails, setSchoolDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    moto: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolDetails({
      ...getSchoolDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await dispatch(registerSchool(getSchoolDetails)).unwrap();
     if(response.status){
        toast.success(response.message)
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1000);
     }
  
    } catch (error) {
        toast.error(error.message || "Something went wrong. Please try again.")
      console.error('Error222:', error);
    }
  };

  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add School Details
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={getSchoolDetails.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={getSchoolDetails.email}
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
              value={getSchoolDetails.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Address Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={getSchoolDetails.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Moto Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School Moto
            </label>
            <input
              type="text"
              name="moto"
              value={getSchoolDetails.moto}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Add School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchoolForm;
