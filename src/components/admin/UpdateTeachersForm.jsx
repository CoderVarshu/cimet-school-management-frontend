import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import { editTeacher, getTeachersData } from "../../redux/slices/teacherSlice";
import { useDispatch } from "react-redux";

const UpdateTeachersForm = ({ selectedTeacherUpdate,
  setSelectedTeacherUpdate,
  closeModal, }) => {

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editTeacher(selectedTeacherUpdate)).unwrap();
      console.log("RESPONSE", response)
      if (response.status) {
        toast.success(response.message);
        dispatch(getTeachersData(selectedTeacherUpdate?.schoolId))
        setTimeout(() => {
          closeModal()
        }, 100);
      }
    } catch (error) {
      toast.error(error.error || "Something went wrong. Please try again.");
      console.error("Error222:", error);
    }
  };




  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Teacher Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={selectedTeacherUpdate ? selectedTeacherUpdate.firstname : ""}
                onChange={(e) =>
                  setSelectedTeacherUpdate({
                    ...selectedTeacherUpdate,
                    firstname: e.target.value,
                  })
                }
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
                value={selectedTeacherUpdate ? selectedTeacherUpdate.lastname : ""}
                onChange={(e) =>
                  setSelectedTeacherUpdate({
                    ...selectedTeacherUpdate,
                    lastname: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={selectedTeacherUpdate ? selectedTeacherUpdate.gendername : ""}
              onChange={(e) =>
                setSelectedTeacherUpdate({
                  ...selectedTeacherUpdate,
                  gender: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={selectedTeacherUpdate ? selectedTeacherUpdate.email : ""}
              onChange={(e) =>
                setSelectedTeacherUpdate({
                  ...selectedTeacherUpdate,
                  email: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={selectedTeacherUpdate ? selectedTeacherUpdate.phone : ""}
              onChange={(e) =>
                setSelectedTeacherUpdate({
                  ...selectedTeacherUpdate,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Class Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
            <input
              type="text"
              name="class"
              value={selectedTeacherUpdate ? selectedTeacherUpdate.class : ""}
              onChange={() => { }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Password Field */}
          {/* <div className="mb-4">
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
          </div> */}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Edit Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTeachersForm