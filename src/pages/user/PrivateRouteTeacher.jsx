/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const PrivateRouteTeacher = ({children}) => {

  const [isAuthenticate, setIsAuthenticate] = useState(false);
  
  const navigate = useNavigate()

  const token = Cookies.get('token');
  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null

  useEffect(() => {
    
    if (token && (role =='teacher' || role === 'admin') ) {
      setIsAuthenticate(true);
    }
    else {
      
      navigate('*')
    }

  }, [token, role]);

  return isAuthenticate ? children : null;
};

export default PrivateRouteTeacher
