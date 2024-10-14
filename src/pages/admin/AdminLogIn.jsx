import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/constants";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { adminLogIn } from "../../redux/slices/authSlice";

const AdminLogIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
        return errors;
      }}
      onSubmit={async (values, { resetForm }) => {
        // console.log("LOG IN DETAILS", values);
        try {
            const response = await dispatch(adminLogIn(values)).unwrap(); // Await the loginUser function
            if (response.status) {
                toast.success(response.message);
                navigate("/");
                resetForm()
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error?.message || "An error occurred during login.");
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
           Admin Log In
          </h2>
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
        </form>
      )}
    </Formik>
  )
}

export default AdminLogIn