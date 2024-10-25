import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudent,
  getStudentByClass,
  getStudentsData,
  studenstLoading,
  studentsData,
} from "../redux/slices/studentsSlice";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import { toast } from "react-toastify";
import UpdateStudentForm from "./admin/UpdateStudentForm";
import ConfirmationModal from "./ConfirmationModal";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListStudents = () => {
  const [students, setStudents] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudentUpdate, setSelectedStudentUpdate] = useState();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(studentsData);
  const loading = useSelector(studenstLoading);

  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  const userData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null
  const classId = userData?.class[0]?._id
  
  console.log("Role", role, classId)

  useEffect(() => {
    if (role === 'admin' && id) {
      dispatch(getStudentsData(id));
    }
   if (role === "teacher" )  {
    dispatch(getStudentByClass({schoolId: id,teacherId:userData?._id}))
    }
  }, [classId, id, role])

  useEffect(() => {
    setStudents(data.data);
  }, [data]);

  const openEditModal = (std) => {
    setSelectedStudentUpdate(std);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudentUpdate(null);
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setStudentToDelete(ownerId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setStudentToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteStudent(studentToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted SuccessFully");
        dispatch(getStudentsData(id));
        closeConfirmation();
      }
    } catch (err) {
      toast.error("Error", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All Students({students?.length})</h6>
        {role === 'admin' ? 
        <Link to={`add-student`}>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Student
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
          //   <p className="ml-2">Loading Students Data ...</p>
          // </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2">Name</th>
                <th className="py-3 px-4 border-b-2">Gender</th>
                <th className="py-3 px-4 border-b-2">Class</th>
                <th className="py-3 px-4 border-b-2">Number</th>
                <th className="py-3 px-4 border-b-2">Email</th>
                {role === 'admin' ? 
                <th className="py-3 px-4 border-b-2">Actions</th>
                :''}
              </tr>
            </thead>
            <tbody>
              {students?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Students Data available
                  </td>
                </tr>
              ) : (
                students?.map((data, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b">
                      {" "}
                      {data.firstname} {data.lastname}
                    </td>
                    <td className="py-3 px-4 border-b">{data.gender}</td>
                    <td className="py-3 px-4 border-b">{data.class?.className} {data.class?.section}</td>
                    <td className="py-3 px-4 border-b">{data.phone}</td>
                    <td className="py-3 px-4 border-b">{data.email}</td>
                    {role === 'admin' ? 
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
                    </td> : ""}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

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
