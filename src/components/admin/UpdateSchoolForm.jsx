import { useDispatch } from "react-redux";
import { editSchool, getSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const UpdateSchoolForm = ({
  selectedSchoolUpdate,
  setSelectedSchoolUpdate,
  closeModal,
}) => {

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(editSchool(selectedSchoolUpdate)).unwrap();
      if (response.status) {
        toast.success(response.message);
        dispatch(getSchool());
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 className="flex text-center justify-center h-full text-l font-bold mb-6">Edit School</h2>
      <form onSubmit={handleSubmit} className="flex justify-center flex-col">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={selectedSchoolUpdate ? selectedSchoolUpdate.name : ""}
            onChange={(e) =>
              setSelectedSchoolUpdate({
                ...selectedSchoolUpdate,
                name: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={selectedSchoolUpdate ? selectedSchoolUpdate.email : ""}
            onChange={(e) =>
              setSelectedSchoolUpdate({
                ...selectedSchoolUpdate,
                email: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={selectedSchoolUpdate ? selectedSchoolUpdate.phone : ""}
            onChange={(e) =>
              setSelectedSchoolUpdate({
                ...selectedSchoolUpdate,
                phone: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={selectedSchoolUpdate ? selectedSchoolUpdate.address : ""}
            onChange={(e) =>
              setSelectedSchoolUpdate({
                ...selectedSchoolUpdate,
                address: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Moto
          </label>
          <input
            type="text"
            name="moto"
            value={selectedSchoolUpdate ? selectedSchoolUpdate.moto : ""}
            onChange={(e) =>
              setSelectedSchoolUpdate({
                ...selectedSchoolUpdate,
                moto: e.target.value,
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Update School
        </button>
      </form>
    </div>
  );
};

export default UpdateSchoolForm;
