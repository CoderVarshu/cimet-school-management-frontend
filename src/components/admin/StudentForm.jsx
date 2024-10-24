import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getStudentsData, registerStudent } from "../../redux/slices/studentsSlice";
import SelectClass from "../common/SelectClass";
import { Formik } from "formik";
import { validateEmail, validateNumber, validatePassword } from "../../utils/constants";

const StudentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  //schoolId,firstname, lastname,gender,email,phone,class:classArray,role,password,
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (

    <Formik

      initialValues={{
        schoolId: id,
        firstname: "",
        lastname: "",
        gender: "male",
        email: "",
        phone: "",
        class: [],
        role: "student",
        password: "",
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
       
        if (values.class.length === 0) {
          errors.class = 'At least one class must be selected';
        }
        const pass = validatePassword(values.password)
        if (pass.error) {
          errors.password = pass.message;
        }
        return errors;
      }}

      onSubmit={async(values) =>{
        try {
          const response = await dispatch(registerStudent(values)).unwrap();
          if (response.status) {
            toast.success(response.message);
            dispatch(getStudentsData(id))
            setTimeout(() => {
              navigate(-1);
            }, 1000);
          }
        } catch (error) {
          toast.error(error.error || "Something went wrong. Please try again.");
        }
      }}

    > {({ values, errors, touched, handleChange,resetForm, setSubmitting, handleSubmit }) => (

      <div className="flex justify-center m-5 items-center h-fit">
        <div className="flex flex-col w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Student Details
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                className={`w-full p-2 border ${touched.firstname && errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
               {touched.firstname && errors.firstname && (
                    <div className="text-red-500 text-sm mt-1">{errors.firstname}</div>
                  )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
               
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                className={`w-full p-2 border ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
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
                className={`w-full p-2 border ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
               {touched.phone && errors.phone && (
                  <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                )}
            </div>
            <div className="mb-4">
              <SelectClass
                selectedClasses={values.class}
                onChange={(selectedClass) => handleChange({ target: { name: 'class', value: selectedClass } })}
              />
              {touched.class && errors.class && (
                  <div className="text-red-500 text-sm mt-1">{errors.class}</div>
                )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={`w-full p-2 border ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                  />
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-black-600 w-full"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </Formik>

  );
};

export default StudentForm;
