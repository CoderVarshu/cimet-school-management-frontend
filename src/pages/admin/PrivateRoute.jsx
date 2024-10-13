/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAuth } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";  // Import js-cookie to check token

const PrivateRoute = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(true);

  const authenticate = useSelector(isAuth);

  useEffect(() => {
    console.log("AUTHENTICARE", authenticate)
    const token = Cookies.get('authToken');  // Check if token is present in cookies
    setIsAuthenticate(authenticate || !!token);  // If Redux state or token is true, authenticate
  }, [authenticate]);

useEffect(()=>{
  console.log("AUTHHH", isAuthenticate)
}, [isAuthenticate])

  return isAuthenticate ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
