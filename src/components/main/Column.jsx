import { Task } from "components";

export const Column = ({column}) => {
  return (
    <div className="columns-block">
      <h2>{column.name}</h2>
      <div className='column'>
        {/* {column.tasks.map((task, index) => (
          <Task 
            key={`task-${task.id}`} 
            task={task}
          />
        ))} */}
      </div>
    </div>
  );
}