import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

const ListSubject = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const loading = useSelector(subjectloading);
  const subjectsData = useSelector(getSubjectData);
  const dispatch = useDispatch();

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
    console.log("Subjects", subjectsData)
  }, [subjectsData]);

  const openEditModal = (data) => {
    setSelectedSubjectUpdate(data);
    setIsModalOpen(true);
  };


  // Close the modal
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
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All Subjects({subjects?.length})</h6>
        <Link to={`add-subject`}>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Subject
          </button>
        </Link>
      </div>

      {/* Teachers List Table */}

      <div className="overflow-x-auto">
        {loading ? ( // Conditional rendering based on loading state
          <div className="flex justify-center items-center py-10">
            <span className="loader"></span>{" "}
            {/* Add your loading spinner or text here */}
            <p className="ml-2">Loading Subjects Data ...</p>
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2">Name</th>
                <th className="py-3 px-4 border-b-2">Actions</th>
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
                      {console.log("DATA", data)}
                      {data.subjectName}
                    </td>
                   
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
