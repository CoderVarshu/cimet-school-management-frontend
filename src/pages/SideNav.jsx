import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolById, selectSchoolById } from "../redux/slices/schoolSlice";
import SideNavForTeacher from "../components/user/SideNavTeacher";
import SideNavForStd from "../components/user/SideNavForStd";
import SideNavForAdmin from "../components/SideNavForAdmin";

const SideNav = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const schoolById = useSelector(selectSchoolById);

  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : null;

  useEffect(() => {
    if (id) {
      dispatch(getSchoolById(id));
    }
  }, [id]);

  useEffect(() => {
    if (schoolById) {
      localStorage.setItem("school_id", JSON.stringify(schoolById));
    }
  }, [schoolById]);

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
