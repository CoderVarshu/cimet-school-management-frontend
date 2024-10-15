import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import { fetchClasses, newClass } from "../../redux/slices/classSlice";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ClassesForm = () => {
    const {id} = useParams();
    const dispatch = useDispatch()
    const navigate= useNavigate()
    const [getClassDetails, setClassDetails] = useState({
        schoolId:id,
        className: "",
        section: "",
        subject:[],
        student:[],
        teacher:[]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClassDetails({
            ...getClassDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(newClass(getClassDetails)).unwrap();

            if (response.status) {
                toast.success(response.message)
                dispatch(fetchClasses(id))
                navigate(-1);
                setTimeout(() => {
                }, 1000);
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong In Classes. Please try again.")
        }
    };


    return (
        <div className="flex justify-center m-5 items-center ">
            <ToastContainer />
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={getClassDetails.subject}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
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
    )
}

export default ClassesForm