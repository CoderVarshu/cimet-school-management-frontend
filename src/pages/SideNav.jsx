import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchool, selectSchoolById } from "../redux/slices/schoolSlice";
import { userData } from "../redux/slices/authSlice";
import SideNavForTeacher from "../components/user/SideNavTeacher";
import SideNavForStd from "../components/user/SideNavForStd";
import SideNavForAdmin from "../components/SideNavForAdmin";

const SideNav = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const schoolById = useSelector((state) => selectSchoolById(state, id));

  const role = localStorage.getItem('role') ? JSON.parse(localStorage.getItem('role')) : null
  

  useEffect(() => {
    dispatch(getSchool());
  }, []);

  useEffect(()=>{
  if(schoolById){
      localStorage.setItem('school_id',JSON.stringify(schoolById))
  }
  },[schoolById])

  return (
    <div className="w-1/6 bg-gray-800 text-white">
      {role === "teacher" ? (
        <SideNavForTeacher />
      ) : role === "student" ? (
        <SideNavForStd />
      ) : (
        <SideNavForAdmin />
      )}
    </div>
  );
};

export default SideNav;
