import React,{useState} from 'react'
import "./Todo.css";



function Todo() {
    const [TaskInput, setTaskInput] = useState("");
    const [Tasks, setTasks] = useState([]);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [doneTasks, setDoneTasks]=useState([]);
    const [EditingIndex, setEditingIndex] = useState(null);
    

    

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
    setErrorMessage("");
  };

  const addTask = () => {
    if (TaskInput.trim() === "") {
        setErrorMessage("Task cannot be empty")
    
        
        return;
    }

   if (Tasks.includes(TaskInput)){
    setErrorMessage("This task is already exist")
    return;
   }
    setTasks([...Tasks, TaskInput]);
    setTaskInput("");


  };
  const undoTaskCompletion = (index) => {
    // Create a copy of the doneTasks array to modify it
    const newDoneTasks = [...doneTasks];
    // Remove the task at the specified index from the newDoneTasks array
    const task = newDoneTasks.splice(index, 1)[0];
    // Update the doneTasks array to reflect the removal of the task
    setDoneTasks(newDoneTasks);
    // Add the removed task back to the Tasks array
    setTasks([...Tasks, task]);
};
const deleteTask = (index) => {
  const newTasks = [...Tasks];
  newTasks.splice(index, 1);
  setTasks(newTasks);
};


  const TaskCompletion = (index) => {
    const newTasks = [...Tasks];
    const task = newTasks.splice(index,1)[0];
    setTasks(newTasks);
    setDoneTasks([...doneTasks, task]);
  };


  const editTask = (index) => {
    const newTasks = [...Tasks];
    newTasks[EditingIndex] = TaskInput;
    setTasks(newTasks);
    setEditingIndex(null);
    setTaskInput("");
  };


  return (
    <div>
        <h1>To do List</h1>
      <div id="inputs">
        <input
          type="text"
          id="newTask"
          placeholder="Add a new Task"
          value={TaskInput}
          onChange={handleInputChange}
        />
        <button className="button" onClick={addTask}>
          Add
        </button>
      </div>
      {ErrorMessage && <p className="error-message">{ErrorMessage}</p>} {/* Display error message */}
      <h2>Task List</h2>
      <ul id="todoList">
        {Tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox"  onChange={()=>TaskCompletion(index)}/>
            {task}
            <div>
            <button className="editBtn" onClick={() => editTask(index)}>Edit</button>
            <button className="delBtn" onClick={() => deleteTask(index)}>Delete</button>
            </div>

          </li>
        ))}
      </ul>
      <h2>Done List</h2>
      <ul id="donelist">
        {doneTasks.map((task,index)=> (

          <li key={index}>{task}
          <div>
          <button className='undoBtn' onClick={() => undoTaskCompletion(index)}>Undo</button>
          </div>
          </li>
        ))}

      </ul>

    </div>
  );
}


export default Todo   