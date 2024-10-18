/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClasses, getClassesData } from "../../redux/slices/classSlice"
import { useParams } from "react-router-dom"

const SelectClass = ({ multiple, selectedClasses, onChange }) => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const classesData = useSelector(getClassesData)
  const [classes, setClasses] = useState([])

  
  useEffect(() => {
    if (id) {
      dispatch(fetchClasses(id))
    }
  }, [id])

  useEffect(() => {
    if (classesData) {
      setClasses(classesData)
    }
  }, [classesData])


  const handleChange = (event) => {
    if (multiple) {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      onChange(selectedOptions);
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
      <select
        onChange={handleChange}
        multiple={multiple}
        value={multiple ? selectedClasses : selectedClasses[0] || ""}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a class</option>
        {classes.map((cls) => (
        
            <option key={cls._id} value={cls._id}>
              {cls.className}  {cls.section}
            </option>
        
        ))}
      </select>
    </>

  )
}

export default SelectClass