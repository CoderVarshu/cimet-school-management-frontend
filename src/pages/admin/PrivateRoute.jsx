/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate()
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const token = Cookies.get('token');
  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  
  useEffect(() => {
    if (token && role === 'admin') {
      setIsAuthenticate(true);
    } else {
      navigate("/*");
    }
  }, [token, role, navigate]);

  return isAuthenticate ? children : null;
};

export default PrivateRoute;
