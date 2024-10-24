import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import { editTeacher, getTeachersData } from "../../redux/slices/teacherSlice";
import { useDispatch } from "react-redux";
import SelectClass from "../common/SelectClass";
import { Formik } from 'formik';
import { validateEmail, validateNumber } from "../../utils/constants";

const UpdateTeachersForm = ({ selectedTeacherUpdate, closeModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center m-5 items-center min-h-fit">
      <div className="flex flex-col w-full mx-auto p-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Teacher Details</h2>
        <Formik
          initialValues={{
            schoolId: selectedTeacherUpdate?.schoolId,
            _id: selectedTeacherUpdate?._id,
            firstname: selectedTeacherUpdate?.firstname || '',
            lastname: selectedTeacherUpdate?.lastname || '',
            gender: selectedTeacherUpdate?.gender || 'male',
            phone: selectedTeacherUpdate?.phone || '',
            salary: selectedTeacherUpdate?.salary || '',
            email: selectedTeacherUpdate?.email || '',
            class: selectedTeacherUpdate?.class || [],
            // schoolId: selectedTeacherUpdate?.schoolId,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstname) {
              errors.firstname = 'First Name is required';
            }

            const email = validateEmail(values.email)
            if (email.error) {
              errors.email = email.message
            }

            const phone = validateNumber(values.phone)
            if (phone.error) {
              errors.phone = phone.message;
            }
            if (!values.salary) {
              errors.salary = 'Salary is required';
            }
            if (values.class.length === 0) {
              errors.class = 'At least one class must be selected';
            }
            return errors;
          }}
          onSubmit={async (values, {resetForm, setSubmitting}) => {
            try {
              const response = await dispatch(editTeacher(values)).unwrap();
              if (response.status) {
                toast.success(response.message);
                dispatch(getTeachersData(selectedTeacherUpdate?.schoolId));
                setTimeout(() => {
                  closeModal();
                }, 100);
              }
            } catch (error) {
              toast.error(error.error || "Something went wrong. Please try again.");
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4 space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${touched.firstname && errors.firstname ? "border-red-500" : "border-gray-300"} rounded`}
                  />
                  {touched.firstname && errors.firstname && (
                    <div className="text-red-500 text-sm mt-1">{errors.firstname}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${touched.lastname && errors.lastname ? "border-red-500" : "border-gray-300"} rounded`}
                  />
                  {touched.lastname && errors.lastname && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastname}</div>
                  )}
                </div>
              </div>
              <div className="flex mb-4 space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="flex-1">
                  <SelectClass
                    multiple={true}
                    onChange={(selectedClass) => {
                      handleChange({ target: { name: 'class', value: selectedClass } })
                    }}
                    selectedClasses={values.class || []}
                  />

                  {touched.class && errors.class && (
                    <div className="text-red-500 text-sm mt-1">{errors.class}</div>
                  )}
                </div>
              </div>

              <div className="flex mb-4 space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300"} rounded`}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={values.salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full p-2 border ${touched.salary && errors.salary ? "border-red-500" : "border-gray-300"} rounded`}
                    required
                  />
                  {touched.salary && errors.salary && (
                    <div className="text-red-500 text-sm mt-1">{errors.salary}</div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border ${touched.email && errors.email ? "border-red-500" : "border-gray-300"} rounded`}
                  required
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-black w-fit text-white px-4 py-2 rounded hover:bg-black-600"
                  disabled={isSubmitting}
                >
                 {isSubmitting ? 'Editing Teacher..' : 'Edit Teacher'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateTeachersForm;
