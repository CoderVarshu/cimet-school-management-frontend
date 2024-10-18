import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSubmissionByAssignmentId, submissiondata, submissionLoading, updateSubmission } from "../../redux/slices/assignmentSubmissionSlice"
import { BiSolidEdit } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import Modal from "../Modal"
import { toast } from "react-toastify"

const ListSubmission = ({ selectedAssignment, closeSubmissionModal }) => {

    const [submissionData, setSubmissionData] = useState([])
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [submissionToEdit, setSubmissionToEdit] = useState('')

    const dispatch = useDispatch()
    console.log("selected", selectedAssignment)
    useEffect(() => {
        if (selectedAssignment?._id) {
            dispatch(getSubmissionByAssignmentId(selectedAssignment?._id))
        }
    }, [selectedAssignment?._id])

    const data = useSelector(submissiondata)
    const loading = useSelector(submissionLoading)

    useEffect(() => {
        if (data) {
            setSubmissionData(data)
        }
    }, [data])

    const handleCheckAssesment = () => {

        const payload = {
            _id: submissionToEdit,
            checked: true,
        }

        dispatch(updateSubmission(payload)).then((res) => {
            if (res?.payload?.status) {
                toast.success(res?.payload?.message)
                setIsConfirmationOpen(false);
                dispatch(getSubmissionByAssignmentId(selectedAssignment?._id))

            } else {
                toast.warning(res.message)
            }
        }).catch((error) => {
            toast.error(error.message)
        })

    }

    const openConfirmation = (id) => {
        setSubmissionToEdit(id);
        setIsConfirmationOpen(true);
    };

    const closeConfirmation = () => {
        setSubmissionToEdit(null);
        setIsConfirmationOpen(false);
    };


    return (
        <div>
            <div>
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <span className="loader"></span>{" "}
                        <p className="ml-2">Loading Submissions Data ...</p>
                    </div>
                ) : (
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-3 px-4 border-b-2" >Task</th>
                                <th className="py-3 px-4 border-b-2">Student Name</th>
                                <th className="py-3 px-4 border-b-2">Subject</th>
                                <th className="py-3 px-4 border-b-2">Class</th>
                                {/* <th className="py-3 px-4 border-b-2">Date</th> */}
                                {/* { !role === 'student' ? */}
                                <th className="py-3 px-4 border-b-2">Actions</th>
                                {/* :''} */}
                            </tr>
                        </thead>
                        <tbody>
                            {submissionData?.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No Submission available
                                    </td>
                                </tr>
                            ) : (submissionData?.length && submissionData?.map((data, i) => (
                                <tr key={i} className="hover:bg-gray-100">
                                    <td className="py-3 px-4 border-b cursor-pointer"> {data.task}</td>
                                    <td className="py-3 px-4 border-b">{data.studentId?.firstname} {data.studentId?.lastname}</td>
                                    <td className="py-3 px-4 border-b">{data.subjectId?.subjectName}</td>
                                    <td className="py-3 px-4 border-b">{data.classId?.className} {data.classId?.section}</td>
                                    {/* { role === 'admin' ? */}
                                    <td className="py-3 px-4 border-b">

                                        <button
                                            disabled={data.checked}
                                            onClick={() => openConfirmation(data?._id)}
                                            className={`text-slate-900 hover:underline 
                                             ${data.checked ? 'opacity-50 text-red-500 cursor-not-allowed' : 'text-green-500 hover:text-green-500'}`}
                                            type="button"
                                        >
                                            {!data.checked ? "Pending" : "Checked"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal isOpen={isConfirmationOpen} onClose={closeConfirmation}>
                <div className="flex justify-center items-center mt-24">
                    <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to Mark Checked?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={handleCheckAssesment}
                            >
                                Yes,
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                onClick={closeConfirmation}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    )
}

export default ListSubmission