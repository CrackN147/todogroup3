import { useState, createContext, useCallback } from "react";

export const StaticDataContext = createContext(null);

export const StaticDataProvider = ({children}) => {
  const [isSidebarOn, setIsSidebarOn] = useState(false);
  const [tempData, setTempData] = useState({});

  const closeSidebar = () => {
    setIsSidebarOn(false);
  }

  const openSidebar = () => {
    setIsSidebarOn(true);
  }

  const updateTempData = useCallback((newData) => {
    setTempData(newData);
  }, []);

  const clearTempData = useCallback(() => {
    setTempData({});
  }, []);

  return (
    <StaticDataContext.Provider value={{
      isSidebarOn,
      openSidebar,
      closeSidebar,
      tempData,
      updateTempData,
      clearTempData
    }}>
      {children}
    </StaticDataContext.Provider>
  );
}