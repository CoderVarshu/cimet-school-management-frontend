import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTeachersData, registerTeacher } from "../../redux/slices/teacherSlice";
import SelectClass from "../common/SelectClass";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const {id} = useParams()

  const [showPassword, setShowPassword] = useState(false);
  const [getUserDetails, setUserDetails] = useState({
    schoolId: id,
    firstname: "",
    lastname: "",
    gender: "male",
    email: "",
    phone: "",
    class: [""],
    salary:'',
    role: "teacher",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...getUserDetails,
      [name]: value,
    });
  };

  const handleClassChange=(selectedClass)=>{
    setUserDetails({
      ...getUserDetails, class:selectedClass
    })
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(registerTeacher(getUserDetails)).then((res)=>{
      if(res?.payload?.message){
        toast.success(res?.payload?.message);
        navigate(-1);
        dispatch(getTeachersData(id))
      }
      if(res?.payload?.error){
        toast.warning(res?.payload?.error)
      }
     }).catch((eror)=>{
        toast.error(eror?.message)
     })
  };

  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Teacher Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
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
            <div className="flex-1">
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
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={getUserDetails.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              value={getUserDetails.salary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <SelectClass
              onChange={handleClassChange}
              selectedClasses={getUserDetails.class}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
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

          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default TeacherForm;
