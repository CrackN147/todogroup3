import { useState, createContext, useCallback } from "react";
import {getData, setData} from "system/storage";
export const TasksDataContext = createContext(null);

export const TasksDataProvider = ({children}) => {
  const [tasksData, setTasksData] = useState(getData('Tasks') || []);
  const taskExample = {
    id: 1,
    title: 'Task 1',
    // description: 'Description 1',
    status: 'todo',
    priority: 1,
    columnId: 1,
    // assignedTo: 'User 1'
  };
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
      status: 'todo',
      columnId: 1,
      priority: 1
    });
    setTasksData(newTasksData);
    setData('Tasks', newTasksData);
  }, [tasksData]);

  return (
    <TasksDataContext.Provider value={{
      tasksData,
      addTask
    }}>
      {children}
    </TasksDataContext.Provider>
  );
}