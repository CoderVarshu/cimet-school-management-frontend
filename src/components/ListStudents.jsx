import { BiSolidEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent, getStudentsData, studenstLoading, studentsData } from '../redux/slices/studentsSlice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { selectSchoolById } from '../redux/slices/schoolSlice';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import UpdateStudentForm from './admin/UpdateStudentForm';
import ConfirmationModal from './ConfirmationModal';

const ListStudents = () => {

  const [students, setStudents] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentUpdate, setSelectedStudentUpdate] = useState()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const {id} = useParams()
  const schoolById = useSelector((state) => selectSchoolById(state, id));
  const dispatch = useDispatch()
  const  data = useSelector(studentsData)
  const loading = useSelector(studenstLoading)


  useEffect(()=>{
    if(schoolById) dispatch(getStudentsData(schoolById?._id))
  }, [schoolById])

useEffect(()=>{
 setStudents(data)
}, [data])

const openEditModal = (std) => {
  setSelectedStudentUpdate(std);
  setIsModalOpen(true);
};

// Close the modal
const closeModal = () => {
  setSelectedStudentUpdate(null)
  setIsModalOpen(false);
};

const openConfirmation = (ownerId) => {
  setStudentToDelete(ownerId); // Set the owner ID to delete
  setIsConfirmationOpen(true); // Open the confirmation modal
};
  
const closeConfirmation = () => {
  setStudentToDelete(null); // Reset the owner ID
  setIsConfirmationOpen(false); // Close the confirmation modal
};


const handleDelete = async() => {
  try {
    const response = await dispatch(deleteStudent(studentToDelete)).unwrap();
    if (response.status) {
      toast.success("Deleted SuccessFully");
      dispatch(getStudentsData(schoolById?._id));
      closeConfirmation();

    }
  } catch (err) {
    toast.error("Error", err);
    toast.error(err);
  }
};

  return (
    <div className="p-8">
       <ToastContainer />
    {/* Header with the Register School button */}
    <div className="flex justify-between items-center mb-6">
      <h6 className="text-xl font-bold">All Students({students.length})</h6>
        <Link to={`/student/addStudent?schoolId=${schoolById._id}`}>
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded">
          + Add Student
        </button>
      </Link>
    </div>

    {/* Teachers List Table */}

    <div className="overflow-x-auto">
      {loading ? ( // Conditional rendering based on loading state
        <div className="flex justify-center items-center py-10">
          <span className="loader"></span>{" "}
          {/* Add your loading spinner or text here */}
          <p className="ml-2">Loading Students Data ...</p>
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
            {students?.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No Students Data available
                </td>
              </tr>
            ) : ( students?.map((data, i) => (
                <tr key={i} className="hover:bg-gray-100">
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
        <UpdateStudentForm
        selectedStudentUpdate={selectedStudentUpdate}
        setSelectedStudentUpdate={setSelectedStudentUpdate}
          closeModal={closeModal}
        />
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmation}
        onConfirm={() => handleDelete({ studentToDelete })}
        ownerName={
          studentToDelete
            ? students.find((std) => std._id === studentToDelete)?.firstname
            : ""
        }
      />
    </div>
  </div>
  );
};

export default ListStudents;
