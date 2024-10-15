import { useDispatch } from "react-redux"
import { editClass, fetchClasses } from "../../redux/slices/classSlice";
import { toast } from "react-toastify";

const UpdateClassForm = ({selectedClassUpdate, setSelectedClassUpdate, closeModal}) => {

const dispatch = useDispatch()

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editClass(selectedClassUpdate)).unwrap();
      if (response.status) {
        toast.success(response.message);
        dispatch(fetchClasses(selectedClassUpdate.schoolId));
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center m-5 items-center min-h-screen ">
      <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Class Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name
              </label>
              <input
                type="text"
                name="className"
                value={selectedClassUpdate ? selectedClassUpdate.className : ""}
                onChange={(e) =>
                  setSelectedClassUpdate({
                    ...selectedClassUpdate,
                    className: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <input
              type="text"
              name="section"
              value={selectedClassUpdate ? selectedClassUpdate.section : ""}
              onChange={(e) =>
                setSelectedClassUpdate({
                  ...selectedClassUpdate,
                  section: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={selectedClassUpdate ? selectedClassUpdate.subject : ""}
              onChange={(e) =>
                setSelectedClassUpdate({
                  ...selectedClassUpdate,
                  subject: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
            >
              Edit Class
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateClassForm