import { useState, createContext, useCallback } from "react";
import moment from "moment";
import {getData, setData} from "system/storage";
export const TasksDataContext = createContext(null);

export const TasksDataProvider = ({children}) => {
  const [tasksData, setTasksData] = useState(getData('Tasks') || []);

  const addTask = useCallback((newTaskInfo) => {
    let id = 0;
    const newTasksData = [...tasksData];
    if (newTasksData.length > 0) {
      let highId = newTasksData.reduce((prev, current) => {
        return prev.id > current.id ? prev : current
      });
      id = highId.id;
    }
    newTasksData.push({
      id: id + 1,
      title: newTaskInfo.title,
      description: newTaskInfo.description,
      created: moment().format("YYYY-MM-DD"),
      expires: newTaskInfo.expires,
      userId: parseInt(newTaskInfo.userId),
      columnId: 1,
      priority: 1,
      sort: 0
    });
    setTasksData(newTasksData);
    setData('Tasks', newTasksData);
  }, [tasksData]);

  const updateTask = useCallback((newTaskInfo) => {
    const newTasksData = [...tasksData];
    const taskIndex = newTasksData.findIndex((task) => task.id === newTaskInfo.id);
    if (taskIndex < 0) return;
    newTasksData[taskIndex] = {
      ...newTasksData[taskIndex],
      title: newTaskInfo.title,
      description: newTaskInfo.description,
      expires: newTaskInfo.expires,
      userId: parseInt(newTaskInfo.userId)
    };
    setTasksData(newTasksData);
    setData('Tasks', newTasksData);
  }, [tasksData]);

  const updateTasksData = useCallback((newData) => {
    setTasksData(newData);
    setData('Tasks', newData);
  }, []);

  return (
    <TasksDataContext.Provider value={{
      tasksData,
      addTask,
      updateTasksData,
      updateTask
    }}>
      {children}
    </TasksDataContext.Provider>
  );
}