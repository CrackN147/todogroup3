import { useContext } from "react";
import { StaticDataContext } from "system/StaticDataContext";
export const Task = () => {
  const { openSidebar } = useContext(StaticDataContext);
  return (
    <div onClick={openSidebar}></div>
  )
}