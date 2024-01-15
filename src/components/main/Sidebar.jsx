import { useContext } from "react";
import { StaticDataContext } from "system/StaticDataContext";
export const Sidebar = () => {
  const { isSidebarOn } = useContext(StaticDataContext);
  console.log(isSidebarOn);
  return (
    <div className={`sidebar ${isSidebarOn ? 'sidebar-is-on' : 'sidebar-is-off'}`}></div>
  );
}