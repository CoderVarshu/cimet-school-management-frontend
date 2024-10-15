import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClasses, getClassesData } from "../../redux/slices/classSlice"

const SelectClass = ({ schoolId }) => {

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

    const handleChange=()=>{

    }

    return (
        <>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <select
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <>
            {console.log("CLASS", cls)}
            <option key={cls._id} value={cls.id}>
              {cls.name}
            </option>
            </>
          ))}
        </select>
      </>
      
    )
}

export default SelectClass