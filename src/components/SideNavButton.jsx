/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom"

const SideNavButton = ({ value, path }) => {
  const location = useLocation()

  const isActive = location.pathname.includes(path);
  return (
    <Link to={path}>
      <button
        className={`mb-4 px-8 py-2 rounded-2xl text-white ${isActive ? "bg-primary" : ""
          }`}
      >
        {value}
      </button>
    </Link>
  )
}

export default SideNavButton