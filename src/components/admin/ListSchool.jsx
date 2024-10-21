import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../Modal.jsx";
import ConfirmationModal from "../ConfirmationModal.jsx";
import UpdateSchoolForm from "./UpdateSchoolForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  allSchoolData,
  deleteSchool,
  getSchool,
  removeSChool,
  schoolLoading,
} from "../../redux/slices/schoolSlice.js";
import { toast } from "react-toastify";

export const ListSchool = () => {
  const [schools, setSchools] = useState([]);
  const [selectedSchoolUpdate, setSelectedSchoolUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  const dispatch = useDispatch();
  const schoolsData = useSelector(allSchoolData);
  const loading = useSelector(schoolLoading);

  useEffect(() => {
    setSchools(schoolsData);
  }, [schoolsData, loading]);


  useEffect(() => {
    dispatch(getSchool());
    dispatch(removeSChool())
  }, []);

  const openEditModal = (owner) => {
    setSelectedSchoolUpdate(owner);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSchoolUpdate(null);
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setSchoolToDelete(ownerId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setSchoolToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteSchool(schoolToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted SuccessFully");
        dispatch(getSchool());
        closeConfirmation();

      }
    } catch (err) {
      toast.error("Error", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All School({schools.length})</h6>
        <Link to="/register">
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Register School
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loader"></span>{" "}
            <p className="ml-2">Loading schools...</p>
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2">School Name</th>
                <th className="py-3 px-4 border-b-2">Contact Number</th>
                <th className="py-3 px-4 border-b-2">Email</th>
                <th className="py-3 px-4 border-b-2">Moto</th>
                <th className="py-3 px-4 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No schools available
                  </td>
                </tr>
              ) : (
                schools?.map((school) => (
                  <tr key={school._id} className="hover:bg-gray-100">
                    <td className="py-3 px-4 border-b"> <Link to={`/school/${school._id}/teacher/list-teachers`}>{school.name}</Link></td>
                    <td className="py-3 px-4 border-b">{school.phone}</td>
                    <td className="py-3 px-4 border-b">{school.email}</td>
                    <td className="py-3 px-4 border-b">{school.moto}</td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => openEditModal(school)}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        onClick={() => openConfirmation(school._id)}
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


        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <UpdateSchoolForm
            selectedSchoolUpdate={selectedSchoolUpdate}
            setSelectedSchoolUpdate={setSelectedSchoolUpdate}
            closeModal={closeModal}
          />
        </Modal>

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={() => handleDelete({ schoolToDelete })}
          ownerName={
            schoolToDelete
              ? schools.find((school) => school._id === schoolToDelete)?.name
              : ""
          }
        />
      </div>
    </div>
  );
};
