/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addSubject,
  editSubject,
  fetchSubjects,
} from "../../redux/slices/subjectSlice";
import { useNavigate, useParams } from "react-router-dom";

const SubjectForm = ({
  type,
  selectedSubjectUpdate,
  closeModal,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    if (type === "Update") {
      setSubjectName(selectedSubjectUpdate?.subjectName);
    }
  }, [selectedSubjectUpdate, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Update") {
      const payload = {
        _id: selectedSubjectUpdate._id,
        subjectName: subjectName || selectedSubjectUpdate.subjectName,
        schoolId: id || selectedSubjectUpdate.schoolId,
      };

      try {
        const response = await dispatch(editSubject(payload)).unwrap();
        if (response.status) {
          toast.success(response.message);
          dispatch(fetchSubjects(id));
          closeModal()
          setTimeout(() => {}, 1000);
        }
      } catch (error) {
        toast.error(
          error.message || "Something went wrong !!. Please try again."
        );
      }
    } else {
      const payload = {
        subjectName,
        schoolId: id,
      };
      try {
        const response = await dispatch(addSubject(payload)).unwrap();
        if (response.status) {
          toast.success(response.message);
          dispatch(fetchSubjects(id));
          navigate(-1);
          setTimeout(() => {}, 1000);
        }
      } catch (error) {
        toast.error(
          error.message || "Something went wrong !!. Please try again."
        );
      }
    }
  };

  return (
    <div className="flex justify-center m-5 items-center ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'Update' ? 'Update Subject details' : "Add Subject Details" }
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject Name
            </label>
            <input
              type="text"
              name="subjectName"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
             {type === 'Update' ? 'Update Subject' : "Add Subject" }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
