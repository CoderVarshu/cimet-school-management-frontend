/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClasses, getClassesData } from "../../redux/slices/classSlice"

const SelectClass = ({  schoolId, multiple, selectedClasses, onChange }) => {

    const dispatch = useDispatch()
    const classesData = useSelector(getClassesData)
    const [classes,setClasses ] = useState([])

    useEffect(() => {
        if(schoolId){
        dispatch(fetchClasses(schoolId))
        }
    }, [schoolId])

    useEffect(()=>{
        if(classesData){
            setClasses(classesData)
        }
    },[classesData])


    const handleChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value)
      onChange(selectedOptions)  // Pass selected values to parent
  }

    return (
        <>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <select
           onChange={handleChange}
           multiple={multiple}
           value={selectedClasses} 
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {/* <option value="">Select a class</option> */}
          {classes.map((cls) => (
            <>
            <option key={cls._id} value={cls._id}>
              {cls.className}  {cls.section}
            </option>
            </>
          ))}
        </select>
      </>
      
    )
}

export default SelectClass