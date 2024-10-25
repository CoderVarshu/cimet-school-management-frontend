/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SelectSubject from "../common/SelectSubject";
import SelectClass from "../common/SelectClass";
import { addAssignment, getAssignment } from "../../redux/slices/assignmentSlice";


const AssignmentsForm = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const getProfileData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) :null
const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
 const {id} = useParams()

const [teacherId, setTeacherId] = useState(role === 'teacher' ? getProfileData?._id : null )

  const [getAssignmentsDetails, setAssignmentsDetails] = useState({
    title: "",
    description: "",
    subjectId: "",
    classId: "",
    teacherId,
    schoolId: id,
  });

  useEffect(()=>{
   if(role === 'teacher' && getProfileData ){
    setTeacherId(getProfileData?._id)
   }
  }, [role])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentsDetails({
      ...getAssignmentsDetails,
      [name]: value,
    });
  };

  const handleClassChange = (selectedClass) => {
    console.log(selectedClass)
    setAssignmentsDetails({
      ...getAssignmentsDetails, classId: selectedClass
    })
  }
  const handleSubjectChange = (selectedSubject) => {
    setAssignmentsDetails({
      ...getAssignmentsDetails, subjectId: selectedSubject[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addAssignment(getAssignmentsDetails)).then((res) => {
      if (res?.payload?.status) {
        toast.success(res?.payload?.message);
        navigate(-1);
        dispatch(getAssignment())
      }
      else{
        toast.warning(res?.payload?.message)
      }
    }).catch((eror) => {
      toast.error(eror?.message)
    })

  };


  return (
    <div className="flex justify-center m-5 items-center mt-24">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Assignment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Title
              </label>
              <input
                type="text"
                name="title"
                value={getAssignmentsDetails.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Discription
              </label>
              <input
                type="text"
                name="description"
                value={getAssignmentsDetails.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <SelectClass
              onChange={handleClassChange}
              selectedClasses={getAssignmentsDetails.classId}
            />
          </div>
          <div className="mb-4">
           <SelectSubject
             onChange ={handleSubjectChange}
             selectedSubject = {getAssignmentsDetails.subjectId}
           />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Add Assignment
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AssignmentsForm