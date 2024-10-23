/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubmission,
  getSubmissionByStudentId,
  submissiondata,
  submissionLoading,
  updateSubmission,
} from "../../redux/slices/assignmentSubmissionSlice";
import { toast } from "react-toastify";

const AssignmentSubmissionForm = ({
  selectedAssignment,
  closeSubmissionModal,
}) => {
  const [task, setTask] = useState("");
  const [type, setType] = useState("Create");
  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  const dispatch = useDispatch();

  const selectionSubmission = useSelector(submissiondata);
  const loading = useSelector(submissionLoading)

  useEffect(() => {
    if (data?._id && selectedAssignment?._id) {
      dispatch(
        getSubmissionByStudentId({
          studentId: data?._id,
          assignmentId: selectedAssignment?._id,
        })
      );
    }
  }, [selectedAssignment]);

  useEffect(() => {
    if (selectionSubmission?.length) {
      console.log("HII");
      setType("Update");
      setTask(selectionSubmission[0]?.task);
    }
    else {
      setTask('')
      setType('Create')
    }
  }, [selectionSubmission]);

  console.log("SELECTION", selectionSubmission[0]);

  const handleSubmit = (e) => {

    e.preventDefault();
    if (type !== 'Update') {
      const payload = {
        task,
        checked: false,
        assignmentId: selectedAssignment?._id,
        studentId: data?._id,
        classId: selectedAssignment?.classId?._id,
        subjectId: selectedAssignment?.subjectId?._id,
        schoolId: selectedAssignment?.schoolId?._id,
      };

      dispatch(addSubmission(payload))
        .then((response) => {
          if (response?.payload?.status) {
            toast.success(
              response?.payload?.message || "Assignment Submitted Successfully"
            );
            closeSubmissionModal();
          } else {
            toast.warning(response?.payload?.message);
            closeSubmissionModal();
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      const payload = {
        _id: selectionSubmission[0]?._id,
        task
      }
      dispatch(updateSubmission(payload)).then((res) => {
        if (res?.payload?.status) {
          toast.success(res?.payload?.message)
          closeSubmissionModal()
          // dispatch(getSubmissionByAssignmentId(selectedAssignment?._id))

        } else {
          toast.warning(res.message)
        }
      }).catch((error) => {
        toast.error(error.message)
      })
    }
  };

  if (loading) {
    return <div className="h-[300px] flex justify-center items-center">
      <div className="flex flex-col w-full mx-auto p-8 bg-white rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-300 rounded mb-6"></div>
        <div className="flex items-center justify-between bg-gray-100 p-2 mb-4 rounded">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </label>
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
        <div className="flex justify-end">
          <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>

    </div>
  }

  return (
    <div className="flex justify-center m-5 items-center ">
      <div className="flex flex-col w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {type === "Update" ? "Update Submission" : "Add Submission"}
        </h2>
        {selectionSubmission?.length > 0 && selectionSubmission[0]?.checked && (
          <div className="flex items-center justify-between bg-gray-100 p-2 mb-4 rounded">
            <span className="text-red-500 font-semibold">
              ✓ Assignment checked, can&lsquo;t be updated
            </span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task
            </label>
            <input
              disabled={
                selectionSubmission?.length
                  ? selectionSubmission[0]?.checked
                  : false
              }
              type="text"
              name="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              disabled={
                selectionSubmission?.length
                  ? selectionSubmission[0]?.checked
                  : false
              }
              type="submit"
              className={`px-4 py-2 rounded text-white ${selectionSubmission?.length && selectionSubmission[0]?.checked
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-black hover:bg-black-600 cursor-pointer"
                }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentSubmissionForm;
