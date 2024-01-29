import { useContext, useState, useEffect } from "react";
import { usersConfig } from "system/config";
import { ListBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { StaticDataContext } from "system/contexts/StaticDataContext";
import { TasksDataContext } from "system/contexts/TasksDataContext";

export const Column = ({column, workflowRef}) => {
  const { openSidebar, updateTempData } = useContext(StaticDataContext);
  const { tasksData, updateTasksData } = useContext(TasksDataContext);
  const [columnTasks, setColumnTasks] = useState([]);

  const onItemCkeck = (e) => {
    if (!e.items || e.items.length === 0) return;
    updateTempData(e.items[0])
    openSidebar();
  }

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
          let taskId = parseInt(task.children[0].id);
          let taskDataIndex = newTasksData.findIndex((item) => item.id === taskId);
          newTasksData[taskDataIndex].columnId = colId;
          newTasksData[taskDataIndex].sort = j;
        }
      }
      updateTasksData(newTasksData);
    }
  }
  useEffect(() => {
    let data = tasksData.filter((task) => parseInt(task.columnId) === parseInt(column.id)).map(item => {
      let user = usersConfig.find((user) => user.id === item.userId);
      return {
        ...item,
        imgUrl: user ? user.imgUrl : ''
      }
    });
    data.sort((a, b) => a.sort - b.sort);
    setColumnTasks(data);
  }, [tasksData, column.id, openSidebar]);

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
        itemTemplate='<div class="task" id="${id}">
          <div class="taskTop">
            <p>ID: <span>${id}</span></p>
            <img src="${imgUrl}" alt="user" />
          </div>
          <p>${title}</p>
        </div>'
        change={onItemCkeck}
      />
      </div>
    </div>
  );
}