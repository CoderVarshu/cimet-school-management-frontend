 
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { isAuth } from "../../redux/slices/authSlice";

const PrivateRouteUser = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState(true);

  const authenticate = useSelector(isAuth)

  useEffect(()=>{
    setIsAuthenticate(authenticate)
  }, [authenticate])

  return isAuthenticate ? children : <Navigate to="/login" />;
};

export default PrivateRouteUser;
