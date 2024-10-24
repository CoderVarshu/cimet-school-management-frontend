import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import { validateEmail, validateNumber } from "../../utils/constants";
import { Formik } from 'formik';

const SchoolForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        address: "",
        moto: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.name) {
          errors.name = "Name is required";
        }

        const validateEmails = validateEmail(values.email);
        if (validateEmails.error) {
          errors.email = validateEmails.message;
        }

        const validatePhone = validateNumber(values.phone);
        if (validatePhone.error) {
          errors.phone = validatePhone.message;
        }

        if (!values.address) {
          errors.address = "Address is required";
        }

        // if (!values.moto) {
        //   errors.moto = "School moto is required";
        // }

        return errors;
      }}
      onSubmit={async (values, { resetForm }) => {
        setLoading(true);
        try {
          const response = await dispatch(registerSchool(values)).unwrap();
          if (response.status) {
            toast.success(response.message);
            resetForm();
            setTimeout(() => {
              navigate('/admin-dashboard');
            }, 1000);
          }
        } catch (error) {
          toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
          setLoading(false);
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
        <>
          <Header />
          <div className="flex justify-center m-5 items-center min-h-[75vh] ">
            <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Add School Details
              </h2>
              <form onSubmit={handleSubmit}>
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
                    className={`w-full p-2 border ${touched.name && errors.name ? "border-red-500" : "border-gray-300"} rounded`}
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
                    className={`w-full p-2 border ${touched.email && errors.email ? "border-red-500" : "border-gray-300"} rounded`}
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
                    className={`w-full p-2 border ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300"} rounded`}
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
                    className={`w-full p-2 border ${touched.address && errors.address ? "border-red-500" : "border-gray-300"} rounded`}
                  />
                  {touched.address && errors.address && (
                    <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School Moto
                  </label>
                  <input
                    type="text"
                    name="moto"
                    value={values.moto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? "Submitting..." : "Add School"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </Formik>
  );
};

export default SchoolForm;

