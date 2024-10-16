import { useState } from "react";
import { toast } from "react-toastify";
import { fetchClasses, newClass } from "../../redux/slices/classSlice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SelectSubject from "../common/SelectSubject";

const ClassesForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getClassDetails, setClassDetails] = useState({
    schoolId: id,
    className: "",
    section: "",
    subjects: [],
    students: [],
    teachers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassDetails({
      ...getClassDetails,
      [name]: value,
    });
  };

  const handleSubjectChange = (selectedSubjects) => {
    setClassDetails({
      ...getClassDetails,
      subjects: selectedSubjects,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("DTA", getClassDetails)
      const response = await dispatch(newClass(getClassDetails)).unwrap();

      if (response.status) {
        toast.success(response.message);
        dispatch(fetchClasses(id));
        navigate(-1);
        setTimeout(() => { }, 1000);
      }
    } catch (error) {
      toast.error(
        error.message || "Something went wrong In Classes. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center m-5 items-center ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Class Details
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="className"
              value={getClassDetails.className}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <input
              type="text"
              name="section"
              value={getClassDetails.section}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">

            <SelectSubject
              onChange={handleSubjectChange}
              multiple={true}
              selectedSubject={getClassDetails.subjects}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Add New Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassesForm;
