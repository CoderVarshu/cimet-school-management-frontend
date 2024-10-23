import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTeacher,
  //  getClassTeachersData,
    getTeachersData, teachersData, teachersLoading } from "../redux/slices/teacherSlice"
import { AiOutlineDelete } from "react-icons/ai"
import { BiSolidEdit } from "react-icons/bi"
import ConfirmationModal from "./ConfirmationModal"
import { Link, useParams } from "react-router-dom"
import Modal from "./Modal"
import UpdateTeachersForm from "./admin/UpdateTeachersForm"
import { toast} from "react-toastify"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListTeachers = () => {

  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  // const userData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null
  // const classId = userData?.class?._id

  const {id} = useParams()
 
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherUpdate, setSelectedTeacherUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

   const dispatch = useDispatch()
  const data = useSelector(teachersData)
  const loading = useSelector(teachersLoading)

  useEffect(()=>{
    if(id){
   dispatch(getTeachersData(id))
    }
  }, [id])

  // useEffect(() => {
  //   if (role === 'admin' && id) {
  //     dispatch(getTeachersData(id))
  //   }
  //   if ((role === "teacher" || role === "student") && classId) {
  //     dispatch(getClassTeachersData(id))
  //   }
  // }, [classId, id, role])

useEffect(()=>{
  if(data){
  setTeachers(data.data)
  }
},[data])


  const openEditModal = (data) => {
    setSelectedTeacherUpdate(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacherUpdate(null)
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setTeacherToDelete(ownerId); 
    setIsConfirmationOpen(true); 
  };

  const closeConfirmation = () => {
    setTeacherToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async() => {
    try {
      const response = await dispatch(deleteTeacher(teacherToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted SuccessFully");
        dispatch(getTeachersData(id));
        closeConfirmation();
      }
    } catch (err) {
      toast.error("Error", err);
    }
  };

  return (
    <div className="p-8">
    <div className="flex justify-between items-center mb-6">
      <h6 className="text-xl font-bold">All Teachers({teachers?.length || 0})</h6>
      { role === 'admin' ?
        <Link to={`add-teacher`}>
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded">
          + Add Teacher
        </button>
      </Link> :''}
    </div>

    <div className="overflow-x-auto">
      {loading ? ( 
        <div className="py-10">
        <Skeleton count={5} height={30} className="mb-2" />
      </div>

        // <div className="flex justify-center items-center py-10">
        //   <span className="loader"></span>{" "}
        //   <p className="ml-2">Loading Teachers Data ...</p>
        // </div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 border-b-2">Name</th>
              <th className="py-3 px-4 border-b-2">Gender</th>
              <th className="py-3 px-4 border-b-2">Number</th>
              <th className="py-3 px-4 border-b-2">Email</th>
              { role === 'admin' ?
              <th className="py-3 px-4 border-b-2">Salary</th>
              :''}
              <th className="py-3 px-4 border-b-2">Class</th>
              { role === 'admin' ?
              <th className="py-3 px-4 border-b-2">Actions</th> :''}
            </tr>
          </thead>
          <tbody>
            {teachers?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Teachers Data available
                </td>
              </tr>
            ) : (teachers?.length &&  teachers?.map((data, i) => (
                <tr key={i} className="hover:bg-gray-100">
               <td className="py-3 px-4 border-b"> {data.firstname} {data.lastname}</td>
                  <td className="py-3 px-4 border-b">{data.gender}</td>
                  <td className="py-3 px-4 border-b">{data.phone}</td>
                  <td className="py-3 px-4 border-b">{data.email}</td>
                  { role === 'admin' ?
                  <td className="py-3 px-4 border-b">{data.salary}</td>
                  :''}
                  <td className="py-3 px-4 border-b">{data.class?.className} {data.class?.section}</td>
                  { role === 'admin' ?
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openEditModal(data)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      <BiSolidEdit />
                    </button>
                    <button
                      onClick={() => openConfirmation(data?._id)}
                      className="text-red-500 hover:underline"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td> :''}
                </tr>
              ))
            )}
          </tbody>
        </table>
      
      )}


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateTeachersForm
          selectedTeacherUpdate={selectedTeacherUpdate}
          setSelectedTeacherUpdate={setSelectedTeacherUpdate}
          closeModal={closeModal}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={() => handleDelete({ teacherToDelete })}
        ownerName={
          teacherToDelete
            ? teachers.find((teacher) => teacher._id === teacherToDelete)?.firstname
            : ""
        }
      />
    </div>
  </div>
  )
}

export default ListTeachers