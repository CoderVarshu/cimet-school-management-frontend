import { useDispatch, useSelector } from "react-redux";
import { assignmentsData, assignmentsLoading, deleteAssignment, getAssignment, getAssignmentBySchool } from "../redux/slices/assignmentSlice";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UpdateAssignments from "./user/UpdateAssignments";
import Modal from "./Modal";
import ConfirmationModal from "./ConfirmationModal";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import AssignmentSubmissionForm from "./user/AssignmentSubmissionForm";
import ListSubmission from "./admin/ListSubmission";

const ListAssignments = () => {

  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  const userData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null
  const classId = userData?.class?._id
  const { id } = useParams()

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentUpdate, setSelectedAssignmentUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionModal, setSubmissionModal] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState([])

  const dispatch = useDispatch()
  const data = useSelector(assignmentsData)
  const loading = useSelector(assignmentsLoading)

  useEffect(() => {
    if (role === 'admin' && id) {
      dispatch(getAssignmentBySchool(id))
    }
    else if ((role === "teacher" || role === "student") && classId) {
      dispatch(getAssignment(classId));
    }
  }, [classId, id, role])

  useEffect(() => {
    if (data) {
      setAssignments(data)
    }
  }, [data])


  const openEditModal = (data) => {
    setSelectedAssignmentUpdate(data);
    setIsModalOpen(true);
  };

  const closeSubmissionModal = () => {
    setSubmissionModal(false)
    setSelectedAssignment(false)
  }

  const closeModal = () => {
    setSelectedAssignmentUpdate(null)
    setIsModalOpen(false);
  };

  const openConfirmation = (ownerId) => {
    setAssignmentToDelete(ownerId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setAssignmentToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteAssignment(assignmentToDelete)).unwrap();
      if (response.status) {
        toast.success("Deleted SuccessFully");
        dispatch(getAssignment(classId));
        closeConfirmation();
      }
    } catch (err) {
      toast.error("Error", err);
    }
  };


  const handleClickSubmission = (data) => {

    setSelectedAssignment(data)
    setSubmissionModal(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h6 className="text-xl font-bold">All Assignments({assignments?.length || 0})</h6>
        <Link to={`add-assignment`}>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded">
            + Add Assignment
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loader"></span>{" "}
            <p className="ml-2">Loading Assignments Data ...</p>
          </div>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b-2" >Title</th>
                <th className="py-3 px-4 border-b-2">Description</th>
                <th className="py-3 px-4 border-b-2">Subject</th>
                <th className="py-3 px-4 border-b-2">Class</th>
                {/* <th className="py-3 px-4 border-b-2">Date</th> */}
                { (role === 'teacher' || role === 'admin') ?
                <th className="py-3 px-4 border-b-2">Actions</th>
                :''}
              </tr>
            </thead>
            <tbody>
              {assignments?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No Assignment available
                  </td>
                </tr>
              ) : (assignments?.length && assignments?.map((data, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b cursor-pointer" onClick={() => handleClickSubmission(data)}> {data.title}</td>
                  <td className="py-3 px-4 border-b">{data.description}</td>
                  <td className="py-3 px-4 border-b">{data.subjectId?.subjectName}</td>
                  <td className="py-3 px-4 border-b">{data.classId?.className} {data.classId?.section}</td>
                  { (role === 'teacher' || role === 'admin') ?
                  <td className="py-3 px-4 border-b">
                    <button
                      onClick={() => openConfirmation(data?._id)}
                      className="text-red-500 hover:underline"
                    >
                      <AiOutlineDelete />
                    </button>
                   
                  </td>
                  :''}
                </tr>
              ))
              )}
            </tbody>
          </table>
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <UpdateAssignments
            selectedAssignmentUpdate={selectedAssignmentUpdate}
            setSelectedAssignmentUpdate={setSelectedAssignmentUpdate}
            closeModal={closeModal}
          />
        </Modal>
        <Modal isOpen={submissionModal} onClose={closeSubmissionModal} >
          {role === "student" ?
          <AssignmentSubmissionForm
            selectedAssignment={selectedAssignment}
            closeSubmissionModal={closeSubmissionModal}
          /> : 
            <ListSubmission
            selectedAssignment={selectedAssignment}
            closeSubmissionModal={closeSubmissionModal}
            />}

        </Modal>

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmation}
          onConfirm={() => handleDelete({ assignmentToDelete })}
          ownerName={
            assignmentToDelete
              ? assignments.find((assignment) => assignment._id === assignmentToDelete)?.title
              : ""
          }
        />
      </div>
    </div>
  )
}

export default ListAssignments