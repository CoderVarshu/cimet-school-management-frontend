import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import InnerComponent from "../components/InnerComponent";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchool, selectSchoolById } from "../redux/slices/schoolSlice";
import { userData } from "../redux/slices/authSlice";
import SideNavForTeacher from "../components/user/SideNavTeacher";
import SideNavForStd from "../components/user/SideNavForStd";

const SchoolDetails = () => {
  const { id } = useParams();

  const [selectedComponent, setSelectedComponent] = useState("");
  const dispatch = useDispatch();
  const schoolById = useSelector((state) => selectSchoolById(state, id));
  const usersData = useSelector(userData);

  useEffect(() => {
    dispatch(getSchool());
  }, []);

//   useEffect(() => {
//     console.log("USETRDATA", usersData[0]?.user?.role);
//   }, [usersData]);

  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
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
      <SideNav
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
    )}
  </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-6">
        {/* Display the selected component */}
        <InnerComponent selectedComponent={selectedComponent} />
      </div>
    </div>
  );
};

export default SchoolDetails;
