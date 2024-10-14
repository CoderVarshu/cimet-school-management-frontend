/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAdminAuth, isAuth } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";  // Import js-cookie to check token

const PrivateRoute = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(true);

  const authenticate = useSelector(isAdminAuth);

  useEffect(() => {
    // console.log("AUTHENTICARE", authenticate)
    const token = Cookies.get('adminAuthToken');  // Check if token is present in cookies
    setIsAuthenticate(authenticate || token ? true : false ); 
  }, [authenticate]);

// useEffect(()=>{
//   console.log("AUTHHH", isAuthenticate)
// }, [isAuthenticate])

  return isAuthenticate ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
