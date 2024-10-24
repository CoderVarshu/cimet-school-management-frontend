import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSubject,
  fetchSubjects,
  getSubjectData,
  subjectloading,
} from "../redux/slices/subjectSlice";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "./ConfirmationModal";
import Modal from "./Modal";
import SubjectForm from "./admin/SubjectForm";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ListSubject = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const loading = useSelector(subjectloading);
  const subjectsData = useSelector(getSubjectData);
  const dispatch = useDispatch();
  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null


  const [selectedSubjectUpdate, setSelectedSubjectUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchSubjects(id));
  }, []);

  useEffect(() => {
    if (subjectsData) {
      setSubjects(subjectsData);
    }
  }, [subjectsData]);

  const openEditModal = (data) => {
    setSelectedSubjectUpdate(data);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setSelectedSubjectUpdate(null);
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setSubjectToDelete(ownerId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setSubjectToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteSubject(subjectToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted Successfully");
        closeConfirmation()
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All Subjects({subjects?.length})</h6>
        {role === 'admin' ?
          <Link to={`add-subject`}>
            <button
              type="button"
              className="bg-black text-white px-4 py-2 rounded"
            >
              + Add Subject
            </button>
          </Link> : ''}
      </div>


      <div className="overflow-x-auto">
        {loading ? (

          <div className="py-10">
            <Skeleton count={5} height={30} className="mb-2" />
          </div>
          // <div className="flex justify-center items-center py-10">
          //   <span className="loader"></span>{" "}
          //   <p className="ml-2">Loading Subjects Data ...</p>
          // </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2">Name</th>
                {role === 'admin' ?
                  <th className="py-3 px-4 border-b-2">Actions</th>
                  : ''}
              </tr>
            </thead>
            <tbody>
              {subjects?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Subjects Data available
                  </td>
                </tr>
              ) : (
                subjects?.map((data, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b">
                      {" "}
                      {data.subjectName}
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
                          onClick={() => openConfirmation(data._id)}
                          className="text-red-500 hover:underline"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td> : ''}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}


        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <SubjectForm
            type={"Update"}
            selectedSubjectUpdate={selectedSubjectUpdate}
            setSelectedSubjectUpdate={setSelectedSubjectUpdate}
            closeModal={closeModal}
          />
        </Modal>

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={() => handleDelete({ subjectToDelete })}
          ownerName={
            subjectToDelete
              ? subjects.find((std) => std._id === subjectToDelete)?.subjectName
              : ""
          }
        />
      </div>
    </div>
  );
};

export default ListSubject;
