/* eslint-disable react/prop-types */

import SideNavButton from "./SideNavButton";

const SideNav = ({ setSelectedComponent, selectedComponent }) => {

   const data= ["Teachers", "Students", "Courses", "Classes", "Assignments"]

//    const data =[]

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

export default SideNav;
