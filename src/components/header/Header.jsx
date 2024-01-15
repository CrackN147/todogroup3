import { useContext } from "react";
import { StaticDataContext } from "system/StaticDataContext";
export const Header = () => {
  const { openSidebar } = useContext(StaticDataContext);
  return (
    <header>
      <button onClick={openSidebar}>Create New Task</button>
    </header>
  );
}