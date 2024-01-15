import { useContext } from "react";
import { StaticDataContext } from "system/contexts/StaticDataContext";
export const Task = ({taskData}) => {
  const { openSidebar } = useContext(StaticDataContext);
  return (
    <div
      className="task"
      onClick={openSidebar}>
      <p>{taskData.title}</p>
    </div>
  )
}