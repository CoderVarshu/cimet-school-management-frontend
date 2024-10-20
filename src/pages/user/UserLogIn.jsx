import { Formik } from "formik";
import { validateEmail, validatePassword } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSchoolData, getSchool } from "../../redux/slices/schoolSlice";
import { toast } from "react-toastify";
import { loginTeacher, loginUser } from "../../redux/slices/authSlice";

const UserLogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [schoolDetails, setSchoolDetails] = useState([]);
  const schoolsData = useSelector(allSchoolData);
  const [role, setRole] = useState('')

  useEffect(() => {
    dispatch(getSchool());
  }, []);

  useEffect(() => {
    if(schoolsData){
      setSchoolDetails(schoolsData);
    }
  }, [schoolsData]);

  return (
    <Formik
      initialValues={{schoolId:'', email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        const emailValidation = validateEmail(values.email);
        if (emailValidation.error) {
          errors.email = emailValidation.message;
        }

        const passwordValidation = validatePassword(values.password);
        if (passwordValidation.error) {
          errors.password = passwordValidation.message;
        }
        if(!role){
          errors.role = "Select Role"
        }
        return errors;
      }}
      onSubmit={async (values, { resetForm }) => {
        if(role ===  'student'){
          try{
            const response = await dispatch(loginUser(values)).unwrap()
            if(response.status){
              toast.success(response.message);
              resetForm()
              navigate(`/school/${values.schoolId}/teacher/list-teachers`);
          
            }
            else {
              toast.warning(response.message)
            }
          }catch(error){
            toast.error(error.message)
          }
        } else if(role === 'teacher'){
          try{
            const response = await dispatch(loginTeacher(values)).unwrap()
            if(response.status){
              toast.success(response?.message);
              resetForm()
              navigate(`/school/${values.schoolId}/student/list-students`);
              // setTimeout(()=>{
              // }, 1000)
            }
          }catch(error){
            toast.error(error.message)
          }
        } else{
          toast.warning("Role Not Specified")
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
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-sm sm:max-w-md md:max-w-lg lg:max-w-l mx-auto my-8 sm:my-16"
        >
          <h2 className="text-xl flex justify-center text-primary w-full py-1 sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
            Log In
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select School
            </label>
            <select
            name="schoolId"
            value={values.schoolId} onChange={handleChange}
             className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="" >Select School</option>
              {schoolDetails.length > 0 &&
                schoolDetails?.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    className="text-gray-700"
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Role
            </label>
            <select
            name="role"
            value={role} onChange={(e)=> setRole(e.target.value)}
             className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="" >Select Role</option>
              <option value={'teacher'}>Teacher</option>
              <option value={'student'}>Student</option>
            </select>
            {!role && errors.role ? (
              <div className="text-red-500 text-sm mt-1">{errors.role}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 sm:p-2 border ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {touched.email && errors.email ? (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 sm:p-2 border ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {touched.password && errors.password ? (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            ) : null}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-primary text-neutral font-bold py-2 px-4 rounded-md hover:bg-black transition duration-200"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <div className="flex justify-center cursor-pointer" onClick={()=>navigate('/adminlogin')}>
            Admin Login
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UserLogIn;
