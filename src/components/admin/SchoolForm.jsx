import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import { validateEmail, validateNumber } from "../../utils/constants";

const SchoolForm = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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

  const validate = () => {
    const errors = {};

    if (!getSchoolDetails.name) {
      errors.name = "Name is required";
    }

    const validateEmails = validateEmail(getSchoolDetails.email)
    if(validateEmails.error){
      errors.email = validateEmails.message
    }

    const validatePhone = validateNumber(getSchoolDetails.phone)
    if(validatePhone.error){
      errors.phone = validatePhone.message
    }
    
    if (!getSchoolDetails.address) {
      errors.address = "Address is required";
    }
    // if (!getSchoolDetails.moto) {
    //   errors.moto = "School moto is required";
    // }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop form submission if validation fails
    }
    setLoading(true);
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
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="flex justify-center m-5 items-center min-h-[75vh] ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add School Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={getSchoolDetails.name}
              onChange={handleInputChange}
              // required
              className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={getSchoolDetails.email}
              onChange={handleInputChange}
              className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={getSchoolDetails.phone}
              onChange={handleInputChange}
              className={`w-full p-2 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded`}
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={getSchoolDetails.address}
              onChange={handleInputChange}
              className={`w-full p-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded`}
              />
              {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
            </div>
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
            />
            {/* className={`w-full p-2 border ${errors.moto ? "border-red-500" : "border-gray-300"} rounded`}
              />
              {errors.moto && <div className="text-red-500 text-sm mt-1">{errors.moto}</div>} */}

          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
              disabled={loading}
              >
                {loading ? "Submitting..." : "Add School"}
              </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SchoolForm;
