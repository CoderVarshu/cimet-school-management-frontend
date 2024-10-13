import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTeachersData, teachersData, teachersLoading } from "../redux/slices/teacherSlice"
import { AiOutlineDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
import ConfirmationModal from "./ConfirmationModal"
import { Link, useParams } from "react-router-dom"
import Modal from "./Modal"
import UpdateTeachersForm from "./admin/UpdateTeachersForm"
import { selectSchoolById } from "../redux/slices/schoolSlice"

const Teachers = () => {

  const {id} = useParams()
  const schoolById = useSelector((state) => selectSchoolById(state, id));
 
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherUpdate, setSelectedTeacherUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);


  const dispatch = useDispatch()
  const data = useSelector(teachersData)
  const loading = useSelector(teachersLoading)

  useEffect(()=>{
   dispatch(getTeachersData(schoolById?._id))
  }, [])

useEffect(()=>{
  setTeachers(data)
},[data])

  const openEditModal = (owner) => {
    setSelectedTeacherUpdate(owner);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedTeacherUpdate(null)
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setTeacherToDelete(ownerId); // Set the owner ID to delete
    setIsConfirmationOpen(true); // Open the confirmation modal
  };


  return (
    <div className="p-8">
    {/* Header with the Register School button */}
    <div className="flex justify-between items-center mb-6">
      <h6 className="text-xl font-bold">All Teachers({teachers.length})</h6>
        <Link to={`/teacher/addTeacher?schoolId=${schoolById._id}`}>
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded">
          + Add Teacher
        </button>
      </Link>
    </div>

    {/* Teachers List Table */}

    <div className="overflow-x-auto">
      {loading ? ( // Conditional rendering based on loading state
        <div className="flex justify-center items-center py-10">
          <span className="loader"></span>{" "}
          {/* Add your loading spinner or text here */}
          <p className="ml-2">Loading Teachers Data ...</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b-2">Name</th>
              <th className="py-3 px-4 border-b-2">Gender</th>
              <th className="py-3 px-4 border-b-2">Number</th>
              <th className="py-3 px-4 border-b-2">Email</th>
              <th className="py-3 px-4 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Teachers Data available
                </td>
              </tr>
            ) : ( teachers?.map((data) => (
                <tr key={data._id} className="hover:bg-gray-100">
               <td className="py-3 px-4 border-b"> {data.firstname} {data.lastname}</td>
                  <td className="py-3 px-4 border-b">{data.gender}</td>
                  <td className="py-3 px-4 border-b">{data.phone}</td>
                  <td className="py-3 px-4 border-b">{data.email}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openEditModal(data)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      <BiSolidEdit />
                    </button>
                    <button
                      onClick={() => openConfirmation(data._id)}
                      className="text-red-500 hover:underline"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      
      )}

      {/* modal for edit  */}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateTeachersForm
          selectedSchoolUpdate={selectedTeacherUpdate}
          setSelectedSchoolUpdate={setSelectedTeacherUpdate}
          closeModal={closeModal}
        />
      </Modal>

      {/* <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={() => handleDelete({ schoolToDelete })}
        ownerName={
          schoolToDelete
            ? schools.find((school) => school._id === schoolToDelete)?.name
            : ""
        }
      /> */}
    </div>
  </div>
  )
}

export default Teachers