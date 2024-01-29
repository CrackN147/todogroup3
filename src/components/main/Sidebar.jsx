import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { usersConfig } from "system/config";
import { StaticDataContext } from "system/contexts/StaticDataContext";
import { TasksDataContext } from "system/contexts/TasksDataContext";
export const Sidebar = () => {
  const { isSidebarOn, closeSidebar, tempData, clearTempData } = useContext(StaticDataContext);
  const { addTask, updateTask } = useContext(TasksDataContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expires, setExpires] = useState(moment().format("YYYY-MM-DD"));
  const [user, setUser] = useState(1);
  
  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeDescription = (event) => {
    setDescription(event.target.value);
  }

  const changeExpires = (event) => {
    setExpires(event.target.value);
  }

  const changeUser = (event) => {
    setUser(event.target.value);
  }

  const submitForm = () => {
    if (tempData.id) {
      updateTask({
        id: tempData.id,
        title: title,
        description: description,
        expires: expires,
        userId: user
      });
    } else {
      addTask({
        title: title,
        description: description,
        expires: expires,
        userId: user
      })
    }
    setTitle('');
    setDescription('');
    setExpires(moment().format("YYYY-MM-DD"));
    setUser(1);
    clearTempData();
    closeSidebar();
  }

  useEffect(() => {
    if (tempData.id) {
      setTitle(tempData.title);
      setDescription(tempData.description);
      setExpires(tempData.expires);
      setUser(tempData.userId);
    } else {
      setTitle('');
      setDescription('');
      setExpires(moment().format("YYYY-MM-DD"));
      setUser(1);
    }
  }, [tempData]);


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
      <label className="form-label" htmlFor="title">Description</label>
      <textarea 
        className="form-input"
        placeholder="Enter description"
        value={description}
        onChange={changeDescription}
      />
      <label className="form-label" htmlFor="title">Expires</label>
      <input 
        type="date"
        min={moment().format("YYYY-MM-DD")}
        className="form-input"
        placeholder="Enter title"
        value={expires}
        onChange={changeExpires}
      />
      <label className="form-label" htmlFor="title">User</label>
      <select 
        className="form-input"
        placeholder="Enter title"
        value={user}
        onChange={changeUser}
      >
        {usersConfig.map((user) => (
          <option key={`user-${user.id}`} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
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