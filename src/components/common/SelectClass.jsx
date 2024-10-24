/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchClasses, getClassesData } from "../../redux/slices/classSlice"
import { useParams } from "react-router-dom"
import Select from "react-select"

const SelectClass = ({ multiple, selectedClasses, onChange }) => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const classesData = useSelector(getClassesData)
  const [classes, setClasses] = useState([])
  let [temp, setTemp] = useState([]);

  console.log("CLASS", selectedClasses)

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


  const options = classes.map((cls) => ({
    value: cls._id,
    label: `${cls.className} ${cls.section}`,
  }));

  const handleChange = (selectedOptions) => {
    if (multiple) {

      const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
      onChange(selectedIds);
    } else {
      const selectedId = selectedOptions ? selectedOptions.value : null;
      onChange(selectedId);
    }
  };

  useEffect(() => {
    let gt = []
    if (typeof selectedClasses[0] === "object") {
      selectedClasses.forEach((ele) => (gt.push(ele._id)))
    } else {
      gt = selectedClasses
    }
    setTemp(gt)

  }, [selectedClasses])

  // console.log(temp,"Temp")


  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
      <Select
        isMulti={multiple}
        options={options}
        value={multiple
          ? options?.filter(option => temp?.includes(option?.value))
          : options?.find(option => option.value === selectedClasses?._id)
        }
        onChange={handleChange}
        className="basic-select"
        classNamePrefix="select"
        placeholder={multiple ? "Select classes..." : "Select a class"}
      />
    </div>
  )
}

export default SelectClass