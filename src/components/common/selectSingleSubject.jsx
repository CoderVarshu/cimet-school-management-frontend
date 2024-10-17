import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjects, getSubjectData } from '../../redux/slices/subjectSlice';

const selectSingleSubject = ({onChange, multiple, selectedSubject}) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const subjectData = useSelector(getSubjectData);
    const [subjects, setSubjects] = useState([])

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


    return (
        <div>

            <select
                onChange={handleChange}
                multiple={multiple}
                value={selectedSubject}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {subjects.map((cls) => (
                    <option key={cls._id} value={cls._id} disabled={selectedSubject.includes(cls._id)}>
                        {cls.subjectName}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default selectSingleSubject