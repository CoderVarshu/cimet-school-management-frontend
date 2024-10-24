/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, getSubjectData } from "../../redux/slices/subjectSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SelectSubject = ({ onChange, multiple, selectedSubject }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const subjectData = useSelector(getSubjectData);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSubjects(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (subjectData) {
      setSubjects(subjectData);
    }
  }, [subjectData]);

  const handleChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    onChange(selectedOptions);
  };

  const handleRemove = (subjectId) => {
    const updatedSubjects = selectedSubject.filter((id) => id !== subjectId);
    onChange(updatedSubjects);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Subject
      </label>
      { multiple ? 
      <div className="flex flex-wrap mb-4">
        {selectedSubject.length > 0 && selectedSubject?.map((subjectId) => {
          const subject = subjects.find((cls) => cls._id === subjectId);
          return (
            subject && (
              <div key={subjectId} className="flex items-center bg-orange-500 text-white rounded-full px-3 py-1 mr-2 mb-2">
                <span>{subject.subjectName}</span>
                <button onClick={() => handleRemove(subjectId)} className="ml-2 text-blue-600 hover:text-blue-800">&times;</button>
              </div>
            )
          );
        })}
      </div> :''}
      <select
        onChange={handleChange}
        multiple={multiple}
        value={selectedSubject}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
       {!multiple ? <option value=''>Select Subject</option> :""}
        {subjects.map((cls) => (
          <option key={cls._id} value={cls._id} disabled={selectedSubject.includes(cls._id)}>
            {cls.subjectName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSubject;
