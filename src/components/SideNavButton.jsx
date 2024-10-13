/* eslint-disable react/prop-types */

const SideNavButton = ({value, setSelectedComponent, isActive}) => {
  return (
    <button
    className={`mb-4 p-2 rounded text-white ${
      isActive ? "bg-gray-900 " : ""
    }`}
    onClick={() => setSelectedComponent(value)}
  >
    {value}
  </button>
  )
}

export default SideNavButton