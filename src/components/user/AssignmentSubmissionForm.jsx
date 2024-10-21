import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { addSubmission } from "../../redux/slices/assignmentSubmissionSlice";
import { toast } from "react-toastify";

const AssignmentSubmissionForm = ({type,selectedAssignment,closeSubmissionModal}) => {

    const [task, setTask] = useState('');
    const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []

    const dispatch = useDispatch()

    const handleSubmit = (e) => {

        e.preventDefault()

        const payload = {
            task,
            checked: false,
            assignmentId: selectedAssignment?._id,
            studentId : data?._id ,
            classId: selectedAssignment?.classId?._id,
            subjectId : selectedAssignment?.subjectId?._id,
            schoolId: selectedAssignment?.schoolId?._id,
        }

        dispatch(addSubmission(payload)).then((response) => {
            if (response?.payload?.status) {
                toast.success(response?.payload?.message || "Assignment Submitted Successfully")
                closeSubmissionModal()
            }
            else {
                toast.warning(response?.payload?.message)
                closeSubmissionModal()
            }
        }).catch((error) => {
            toast.error(error.message)
        })

    }

    return (
        <div className="flex justify-center m-5 items-center ">
        <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'Update' ? 'Update Submission' : "Add Submission" }
        </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Task
                    </label>
                    <input
                        type="text"
                        name="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded hover:bg-black-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    )
}

export default AssignmentSubmissionForm