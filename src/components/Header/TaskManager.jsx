import {useState} from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./List.jsx";
import AddTaskForm from "../AddTaskForm.jsx";


function TaskManager() {
    const [tasks, setTasks] = useState([])

    const addTask = (text, date) => {
        const newTask = {
            id: uuidv4(),
            text,
            date
        }
        setTasks(prev => [...prev, newTask]);
    }

    return(
        <div>
            <h3>Task Manager</h3>
            <AddTaskForm addTask = {addTask}></AddTaskForm>

            {tasks.length > 0 && <List list = {tasks} />}
        </div>
    )
}
export default TaskManager;