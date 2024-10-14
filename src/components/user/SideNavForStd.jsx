/* eslint-disable react/prop-types */

import SideNavButton from "../SideNavButton";

const SideNavForStd = ({ setSelectedComponent, selectedComponent }) => {

   const data= ["Teachers", "Courses", "Classes", "Assignments", "Profile"]


  return (
    <nav className="flex flex-col  p-4 bg-slate-900 h-full">
      {data.map((item, i)=>(
        <SideNavButton
        key={i} 
        value={item} 
        isActive={selectedComponent === item}
        setSelectedComponent={setSelectedComponent} />
      ))}
    </nav>
  );
};

export default SideNavForStd;
