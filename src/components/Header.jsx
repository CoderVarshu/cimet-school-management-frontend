/* eslint-disable no-unused-vars */
// src/superAdmin/components/SuperAdminHeader.jsx
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";
import Cookies from "js-cookie";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [schoolName, setSchoolName] = useState('')

  const token = Cookies.get('token')
  const data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null
  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  const schoolData = localStorage.getItem('school_id') ? JSON.parse(localStorage.getItem('school_id')) : null

  console.log("DATA", schoolData)
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    }
  }, [token])

  useEffect(()=>{
    if(schoolData){
      setSchoolName(schoolData?.name)
    }
  }, [schoolData])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowModal(false);
    toast.success("Log out Successfully")
    navigate("/login");
  };

  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  const getInitials = (name) => {
    return name?.charAt(0).toUpperCase()
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <h2 className="font-bold">
        {role === 'admin' ? <Link to='/admin-dashboard'> Admin Dashboard </Link> :
          <> {data ? `Hello ${data?.firstname}, Welcome In ${data?.schoolId?.name}` : ""}</>}

        {(role === 'admin' && schoolData) ? `/ ${schoolName}` : ""}
      </h2>

      <h2 className="font-bold text-xl" >School Management System</h2>
      <div className="flex items-center space-x-4">
        <div className="flex justify-center relative">

          <button className="focus:outline-none">
            <IoIosNotificationsOutline color="white" size={30} />
          </button>
          <span className="absolute top-0 right-0 bg-secondary text-white rounded-full px-1 text-xs">
            3
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 cursor-pointer bg-gray-700 text-white flex items-center justify-center rounded-full" onClick={() => setShowModal(true)}>
            {data ? <span className="text-lg font-bold">{getInitials(data?.firstname)}</span> : <FaRegUserCircle />}
          </div>
          <span className="ml-2">{ }</span>
          {showModal && (
            <div ref={modalRef} className="absolute cursor-pointer top-10 right-0  mt-2  rounded-lg z-50">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Login
                  </button>
                )}

              </div>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
