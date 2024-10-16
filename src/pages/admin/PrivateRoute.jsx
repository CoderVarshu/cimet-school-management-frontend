/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAdminAuth, isAuth } from "../../redux/slices/authSlice";
import Cookies from "js-cookie"; 

const PrivateRoute = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(true);

  const authenticate = useSelector(isAdminAuth);

  useEffect(() => {
    const token = Cookies.get('adminAuthToken');
    setIsAuthenticate(authenticate || token ? true : false ); 
  }, [authenticate]);


  return isAuthenticate ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
