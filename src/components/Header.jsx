/* eslint-disable no-unused-vars */
// src/superAdmin/components/SuperAdminHeader.jsx
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAdminAuth, isAuth, logoutUser } from "../redux/slices/authSlice";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const authenticated = useSelector(isAdminAuth); // Get auth state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");

  const modalRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch logout action
    setShowModal(false); // Close modal
    navigate("/adminlogin"); // Redirect to login page
  };

  // Function to handle Login
  const handleLogin = () => {
    setShowModal(false); // Close modal
    // navigate("/adminlogin"); // Redirect to login page
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
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
      <h1 className="text-xl font-bold">Welcome Varsha</h1>
      <div className="flex items-center space-x-4">
        <div className="flex justify-center relative">
          {/* Notifications Icon */}
          <button className="focus:outline-none">
            <IoIosNotificationsOutline color="white" size={30} />
          </button>
          <span className="absolute top-0 right-0 bg-secondary text-white rounded-full px-1 text-xs">
            3
          </span>
        </div>
        {/* Profile Info */}
        <div className="flex items-center">
          {/* {profilePic ? (
            <img
              src={profilePic} // Profile picture URL
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : ( */}
          <div className="w-8 h-8 cursor-pointer bg-gray-700 text-white flex items-center justify-center rounded-full" onClick={() => setShowModal(true)}>
            <span className="text-lg font-bold">{getInitials("Varsha")}</span>
          </div>
          {/* )} */}
          <span className="ml-2">{ }</span>

          {showModal && (
            <div ref={modalRef} className="absolute cursor-pointer top-10 right-0  mt-2  rounded-lg z-50">
              <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
                {authenticated ? (
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
