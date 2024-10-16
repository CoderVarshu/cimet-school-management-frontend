import React from 'react'
import { useDispatch } from 'react-redux'
import { editStudent, getStudentsData } from '../../redux/slices/studentsSlice';
import { toast } from 'react-toastify';
import SelectClass from '../common/SelectClass';

const UpdateStudentForm = ({ setSelectedStudentUpdate, selectedStudentUpdate, closeModal }) => {


  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("DETAILS", selectedStudentUpdate)
      const response = await dispatch(editStudent(selectedStudentUpdate)).unwrap();
      if (response.status) {
        toast.success(response.message);
        dispatch(getStudentsData(selectedStudentUpdate?.schoolId))
        setTimeout(() => {
          closeModal()
        }, 100);
      }
    } catch (error) {
      toast.error(error.error || "Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleClassChange =(selectedClass)=>{
    setSelectedStudentUpdate({
      ...selectedStudentUpdate, class:selectedClass
    })
  }

  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Student's Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={selectedStudentUpdate ? selectedStudentUpdate.firstname : ""}
                onChange={(e) =>
                  setSelectedStudentUpdate({
                    ...selectedStudentUpdate,
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
                value={selectedStudentUpdate ? selectedStudentUpdate.lastname : ""}
                onChange={(e) =>
                  setSelectedStudentUpdate({
                    ...selectedStudentUpdate,
                    lastname: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={selectedStudentUpdate ? selectedStudentUpdate.gendername : ""}
              onChange={(e) =>
                setSelectedStudentUpdate({
                  ...selectedStudentUpdate,
                  gender: e.target.value,
                })
              }
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
              value={selectedStudentUpdate ? selectedStudentUpdate.email : ""}
              onChange={(e) =>
                setSelectedStudentUpdate({
                  ...selectedStudentUpdate,
                  email: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={selectedStudentUpdate ? selectedStudentUpdate.phone : ""}
              onChange={(e) =>
                setSelectedStudentUpdate({
                  ...selectedStudentUpdate,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <SelectClass
              onChange={handleClassChange}
              selectedClasses={selectedStudentUpdate.class._id}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudentForm