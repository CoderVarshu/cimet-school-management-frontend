import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import { editTeacher, getTeachersData } from "../../redux/slices/teacherSlice";
import { useDispatch } from "react-redux";
import SelectClass from "../common/SelectClass";

const UpdateTeachersForm = ({ selectedTeacherUpdate,
  setSelectedTeacherUpdate,
  closeModal, }) => {

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editTeacher(selectedTeacherUpdate)).unwrap();
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


  const handleClassChange =(selectedClass)=>{
    setSelectedTeacherUpdate({
      ...selectedTeacherUpdate, class:selectedClass
    })
  }

  return (
    <div className="flex justify-center m-5 items-center min-h-fit">
      <div className="flex flex-col w-full mx-auto p-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Teacher Details</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="flex mb-4 space-x-4">
          <div className="flex-1">
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

          <div className="flex-1">
          <div className="mb-4">
          <SelectClass
              onChange={handleClassChange}
              selectedClasses={selectedTeacherUpdate.class._id}
            />
          </div>
          </div>
           </div>
           <div className="flex mb-4 space-x-4">
          <div className="flex-1">
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
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="text"
              name="salary"
              value={selectedTeacherUpdate ? selectedTeacherUpdate.salary : ""}
              onChange={(e) =>
                setSelectedTeacherUpdate({
                  ...selectedTeacherUpdate,
                  salary: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          </div>
          
          <div className="flex-1">
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
          
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-black w-fit text-white px-4 py-2 rounded hover:bg-black-600"
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