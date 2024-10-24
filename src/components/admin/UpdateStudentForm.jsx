import React from 'react'
import { useDispatch } from 'react-redux'
import { editStudent, getStudentsData } from '../../redux/slices/studentsSlice';
import { toast } from 'react-toastify';
import SelectClass from '../common/SelectClass';
import { validateEmail, validateNumber } from '../../utils/constants';
import { Formik } from 'formik';

const UpdateStudentForm = ({ setSelectedStudentUpdate, selectedStudentUpdate, closeModal }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center m-5 items-center min-h-fit">
      <div className="flex flex-col w-full mx-auto p-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Student's Details</h2>
        <Formik
          initialValues={{
            schoolId: selectedStudentUpdate?.schoolId,
            _id: selectedStudentUpdate?._id,
            firstname: selectedStudentUpdate?.firstname || '',
            lastname: selectedStudentUpdate?.lastname || '',
            gender: selectedStudentUpdate?.gender || 'male',
            email: selectedStudentUpdate?.email || '',
            phone: selectedStudentUpdate?.phone || '',
            class: selectedStudentUpdate?.class || [],
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstname) {
              errors.firstname = 'First Name is required';
            }
            if (!values.lastname) {
              errors.lastname = 'Last Name is required';
            }

            const email = validateEmail(values.email)
            if (email.error) {
              errors.email = email.message
            }

            const phone = validateNumber(values.phone)
            if (phone.error) {
              errors.phone = phone.message;
            }

            return errors;
          }}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            try {
              const response = await dispatch(editStudent(values)).unwrap();
              if (response.status) {
                toast.success(response.message);
                dispatch(getStudentsData(selectedStudentUpdate?.schoolId));
                setTimeout(() => {
                  closeModal();
                }, 100);
              }
            } catch (error) {
              toast.error(error.error || "Something went wrong. Please try again.");
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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

              <div className="mb-4">
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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

              <div className="mb-4">
                <SelectClass
                  onChange={(selectedClass) => {
                    handleChange({ target: { name: 'class', value: selectedClass } });
                  }}
                  selectedClasses={values.class || []}
                />
                {touched.class && errors.class && (
                  <div className="text-red-500 text-sm mt-1">{errors.class}</div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-black w-fit text-white px-4 py-2 rounded hover:bg-black-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Editing Student..' : 'Edit Student'}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default UpdateStudentForm