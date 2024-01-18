import { useContext, useState, useEffect } from "react";
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { TasksDataContext } from "system/contexts/TasksDataContext";
import { Task } from "components";

export const Column = ({column, workflowRef}) => {
  const { tasksData, updateTasksData } = useContext(TasksDataContext);
  const [columnTasks, setColumnTasks] = useState([]);

  const onDataChange = () => {
    let currentWorkflow = workflowRef.current;
    if (currentWorkflow) {
      let newTasksData = [...tasksData];
      let columns = currentWorkflow.getElementsByClassName("column");
      for (let i = 0; i < columns.length; i++) {
        let colId = parseInt(columns[i].id.split("-")[1]);
        let tasks = columns[i].getElementsByClassName("e-list-item");
        for (let j = 0; j < tasks.length; j++) {
          let task = tasks[j];
          let taskId = parseInt(task.id);
          let taskDataIndex = newTasksData.findIndex((item) => item.id === taskId);
          newTasksData[taskDataIndex].columnId = colId;
          newTasksData[taskDataIndex].sort = j;
        }
      }
      updateTasksData(newTasksData);
    }
  }
  useEffect(() => {
    let data = tasksData.filter((task) => parseInt(task.columnId) === parseInt(column.id) );
    data.sort((a, b) => a.sort - b.sort);
    setColumnTasks(data);
  }, [tasksData, column.id]);

  return (
    <div className="columns-block">
      <h2>{column.name}</h2>
      <div className='column' id={`column-${column.id}`}>
      <ListBoxComponent
        dataSource={columnTasks} 
        allowDragAndDrop={true}
        height="100%" 
        scope="combined-list" 
        fields={{ text: "title" }}
        drop={onDataChange}
      />
        {/* {tasksData.filter((task) => task.columnId === column.id ).map((data, index) => (
          <Task 
            key={`task-${data.id}`} 
            taskData={data}
          />
        ))} */}
      </div>
    </div>
  );
}