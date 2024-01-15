import { useState, createContext, useCallback } from "react";

export const StaticDataContext = createContext(null);

export const StaticDataProvider = ({children}) => {
  const [isSidebarOn, setIsSidebarOn] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOn(false);
  }

  const openSidebar = () => {
    setIsSidebarOn(true);
  }

  return (
    <StaticDataContext.Provider value={{
      isSidebarOn,
      openSidebar,
      closeSidebar
    }}>
      {children}
    </StaticDataContext.Provider>
  );
}