/* eslint-disable react/prop-types */

import SideNavButton from "./SideNavButton";

const SideNavForAdmin = () => {

  const data = [
    { name: "Teachers", path: "teacher/list-teachers" },
    { name: "Students", path: "student/list-students" },
    { name: "Subjects", path: "subjects/list-subjects" },
    { name: "Classes", path: "classes/list-classes" },
    { name: "Assignments", path: "assignments/list-assignments" }
  ];

  return (
    <nav className="flex flex-col text-center text-l text-white font-semibold p-4 bg-slate-900 h-full">
      {data.map((item, i)=>(
        <SideNavButton 
        key={i} 
        value={item.name} 
        path={item.path}
      />
      ))}
    </nav>
  );
};

export default SideNavForAdmin;
