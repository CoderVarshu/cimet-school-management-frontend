/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { editSchool, getSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { validateEmail, validateNumber } from "../../utils/constants";
const UpdateSchoolForm = ({
  selectedSchoolUpdate,
  setSelectedSchoolUpdate,
  closeModal,
}) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        _id: selectedSchoolUpdate?._id,
        name: selectedSchoolUpdate?.name || "",
        email: selectedSchoolUpdate?.email || "",
        phone: selectedSchoolUpdate?.phone || "",
        address: selectedSchoolUpdate?.address || "",
        moto: selectedSchoolUpdate?.moto || "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.name) {
          errors.name = "Name is required";
        }

        const emailValidation = validateEmail(values.email);
        if (emailValidation.error) {
          errors.email = emailValidation.message;
        }

        const phoneValidation = validateNumber(values.phone);
        if (phoneValidation.error) {
          errors.phone = phoneValidation.message;
        }

        if (!values.address) {
          errors.address = "Address is required";
        }

        // if (!values.moto) {
        //   errors.moto = "Moto is required";
        // }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const response = await dispatch(editSchool(values)).unwrap();
          if (response.status) {
            toast.success(response.message);
            dispatch(getSchool());
            closeModal();
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div>
          <h2 className="flex text-center justify-center h-full text-l font-bold mb-6">
            Edit School
          </h2>
          <form onSubmit={handleSubmit} className="flex justify-center flex-col">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${
                  touched.phone && errors.phone
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {touched.phone && errors.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${
                  touched.address && errors.address
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {touched.address && errors.address && (
                <div className="text-red-500 text-sm mt-1">{errors.address}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moto
              </label>
              <input
                type="text"
                name="moto"
                value={values.moto}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${
                  touched.moto && errors.moto
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {touched.moto && errors.moto && (
                <div className="text-red-500 text-sm mt-1">{errors.moto}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update School"}
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default UpdateSchoolForm;

