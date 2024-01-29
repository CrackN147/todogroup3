import { useContext } from "react";
import { StaticDataContext } from "system/contexts/StaticDataContext";
export const Header = () => {
  const { openSidebar, clearTempData } = useContext(StaticDataContext);
  const createNewTask = () => {
    clearTempData();
    openSidebar();
  }
  return (
    <header>
      <button onClick={createNewTask}>Create New Task</button>
    </header>
  );
}