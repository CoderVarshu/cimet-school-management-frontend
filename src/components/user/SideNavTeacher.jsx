/* eslint-disable react/prop-types */

import SideNavButton from "../SideNavButton";


const SideNavForTeacher = () => {

  const data = [
    { name: "Students", path: "student/list-students" },
    { name: "Subjects", path: "subjects/list-subjects" },
    // { name: "Classes", path: "classes/list-classes" },
    { name: "Assignments", path: "assignments/list-assignments" },
    { name : "Profile", path:'profile' }
  ];
  
   return (
    <nav className="flex flex-col  p-4 bg-slate-900 h-full">
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

export default SideNavForTeacher;
