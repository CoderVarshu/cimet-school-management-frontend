import { useDispatch, useSelector } from "react-redux"
import ConfirmationModal from "./ConfirmationModal"
import UpdateClassForm from "./admin/UpdateClassForm"
import { useEffect, useState } from "react"
import { classesLoading, deleteClass, fetchClasses, getClassesData } from "../redux/slices/classSlice"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Modal from "./Modal"
import { BiSolidEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListClasses = () => {

  const { id } = useParams()
  const [classes, setClasses] = useState([]);
  const [selectedClassUpdate, setSelectedClassUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null

  const dispatch = useDispatch()
  const loading = useSelector(classesLoading)
  const classesData = useSelector(getClassesData)

  useEffect(() => {
    if (id) {
      dispatch(fetchClasses(id))
    }
  }, [id])

  useEffect(() => {
    setClasses(classesData)
  }, [classesData])

  const openEditModal = (data) => {
    setSelectedClassUpdate(data);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedClassUpdate(null)
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setClassToDelete(ownerId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setClassToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteClass(classToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted SuccessFully");
        dispatch(fetchClasses(id));
        closeConfirmation();
      }
    } catch (err) {
      toast.error("Error", err);
      toast.error(err);
    }
  };


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All Classess({classes.length || 0})</h6>
        {role === 'admin' ? 
        <Link to={`add-class`}>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded">
            + Add New Class
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
          //   <p className="ml-2">Loading Classes Data ...</p>
          // </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2">Name</th>
                <th className="py-3 px-4 border-b-2">Section</th>
                <th className="py-3 px-4 border-b-2">Subjects</th>
                {role === 'admin' ? 
                <th className="py-3 px-4 border-b-2">Actions</th>
                :''}
              </tr>
            </thead>
            <tbody>
              {classes?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Classes Data available
                  </td>
                </tr>
              ) : (classes.length && classes?.map((data, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b"> {data.className}</td>
                  <td className="py-3 px-4 border-b">{data.section}</td>
                  
                  <td className="py-3 px-4 border-b">
                    {data.subjects.length > 0 ? (
                      data.subjects.map((subject, index) => (
                        <span key={index}>
                          {subject.subjectName}
                          {index !== data.subjects.length - 1 && ', '}
                        </span>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </td>
                  {role === 'admin' ? 
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
          <UpdateClassForm
            type="Update"
            selectedClassUpdate={selectedClassUpdate}
            setSelectedClassUpdate={setSelectedClassUpdate}
            closeModal={closeModal}
          />
        </Modal>
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={() => handleDelete({ classToDelete })}
          ownerName={
            classToDelete
              ? classes.find((teacher) => teacher._id === classToDelete)?.className
              : ""
          }
        />
      </div>
    </div>
  )
}

export default ListClasses