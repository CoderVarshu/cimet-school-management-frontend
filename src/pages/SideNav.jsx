import { useEffect, useState } from "react";
import InnerComponent from "../components/InnerComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchool, selectSchoolById } from "../redux/slices/schoolSlice";
import { userData } from "../redux/slices/authSlice";
import SideNavForTeacher from "../components/user/SideNavTeacher";
import SideNavForStd from "../components/user/SideNavForStd";
import SideNavForAdmin from "../components/SideNavForAdmin";

const SideNav = () => {
  const { id } = useParams();
  const [selectedComponent, setSelectedComponent] = useState("Teachers");
  const dispatch = useDispatch();
  const schoolById = useSelector((state) => selectSchoolById(state, id));

  const usersData = useSelector(userData);

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
      {usersData[0]?.user?.role === "teacher" ? (
        <SideNavForTeacher
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      ) : usersData[0]?.user?.role === "student" ? (
        <SideNavForStd
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />
      ) : (
        <SideNavForAdmin />
      )}
    </div>
  );
};

export default SideNav;
