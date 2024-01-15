import { useState, useContext } from "react";
import { StaticDataContext } from "system/contexts/StaticDataContext";
import { TasksDataContext } from "system/contexts/TasksDataContext";
export const Sidebar = () => {
  const { isSidebarOn } = useContext(StaticDataContext);
  const { addTask } = useContext(TasksDataContext);
  const [title, setTitle] = useState('');
  
  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const submitForm = () => {
    addTask({
      title: title,
    })
    setTitle('');
  }
  return (
    <div className={`sidebar ${isSidebarOn ? 'sidebar-is-on' : 'sidebar-is-off'}`}>
      <h2 className="form-title">Create New Task</h2>
      <label className="form-label" htmlFor="title">Title</label>
      <input 
        type="text"
        className="form-input"
        placeholder="Enter title"
        value={title}
        onChange={changeTitle}
      />
      <button 
        type="button" 
        className="form-submit"
        onClick={submitForm}
      >
        Submit
      </button>
    </div>
  );  
}