import { useContext } from "react";
import { TasksDataContext } from "system/contexts/TasksDataContext";
import { Task } from "components";

export const Column = ({column}) => {
  const { tasksData } = useContext(TasksDataContext);
  return (
    <div className="columns-block">
      <h2>{column.name}</h2>
      <div className='column'>
        {tasksData.filter((task) => task.columnId === column.id ).map((data, index) => (
          <Task 
            key={`task-${data.id}`} 
            taskData={data}
          />
        ))}
      </div>
    </div>
  );
}