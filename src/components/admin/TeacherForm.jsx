import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTeachersData, registerTeacher } from "../../redux/slices/teacherSlice";
import SelectClass from "../common/SelectClass";
import { Formik } from 'formik';
import { validateEmail, validateNumber, validatePassword } from "../../utils/constants";


const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Formik
      initialValues={{
        schoolId: id,
        firstname: '',
        lastname: '',
        gender: 'male',
        email: '',
        phone: '',
        class: [],
        salary: '',
        role: 'teacher',
        password: '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.firstname) {
          errors.firstname = 'First Name is required';
        }
       
        const email = validateEmail(values.email)
        if(email.error){
          errors.email = email.message
        }

        const phone = validateNumber(values.phone)
        if (phone.error) {
          errors.phone = phone.message ;
        }
        if (!values.salary) {
          errors.salary = 'Salary is required';
        }
        if (values.class.length === 0) {
          errors.class = 'At least one class must be selected';
        }
        const pass = validatePassword(values.password)
        if (pass.error) {
          errors.password = pass.message;
        }
        return errors;
      }}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          const response = await dispatch(registerTeacher(values)).unwrap();
          if (response.status) {
            toast.success(response.message);
            resetForm();
            navigate(-1);
            dispatch(getTeachersData(id));
          }
        } catch (error) {
          toast.error(error.message || 'Something went wrong. Please try again.');
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
        <div className="flex justify-center m-5 items-center min-h-[70vh]">
          <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Teacher Details</h2>
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
                    className={`w-full p-2 border ${touched.firstname && errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                    className={`w-full p-2 border ${touched.lastname && errors.lastname ?   'border-red-500' : 'border-gray-300'} rounded`}
                  />
                  {/* {touched.lastname && errors.lastname && (
                    <div className="text-red-500 text-sm mt-1">{errors.lastname}</div>
                  )} */}
                </div>
              </div>

              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
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
                  className={`w-full p-2 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                  className={`w-full p-2 border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {touched.phone && errors.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={values.salary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border ${touched.salary && errors.salary ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {touched.salary && errors.salary && (
                  <div className="text-red-500 text-sm mt-1">{errors.salary}</div>
                )}
              </div>

              <div className="mb-4">
                <SelectClass
                  multiple={true}
                  onChange={(selectedClass) => handleChange({ target: { name: 'class', value: selectedClass } })}
                  selectedClasses={values.class}
                />
                 {touched.class && errors.class && (
                  <div className="text-red-500 text-sm mt-1">{errors.class}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full p-2 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding Teacher...' : 'Add Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default TeacherForm;

