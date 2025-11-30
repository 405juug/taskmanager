import {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./List.jsx";
import AddTaskForm from "../AddTaskForm.jsx";

function TaskManager() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme)
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tags));
    }, [tags])

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

    const addTask = (text, date, tag) => {
        const newTask = {
            id: uuidv4(),
            text,
            date,
            tag: tag || ""
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const editTask = (id, newText, newDate, newTag) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, text: newText, date: newDate, tag: newTag } : task
            )
        );
    };

    const addTag = (tagName) => {
        const name = tagName.trim();
        if (!name) return;
        if (!tags.includes(name)) {
            setTags((prev) => [...prev, name]);
        }
    };

    return (
        <div>
            <h3>Task Manager</h3>
            <input
                type="text"
                placeholder="Search tasks "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "15px", padding: "5px", width: "200px" }}
            />
            <AddTaskForm addTask={addTask} tags={tags} addTag={addTag} />

            {tasks.length > 0 && (
                <List
                    list={tasks.filter(task =>
                        task.text.toLowerCase().includes(search.toLowerCase())
                    )}
                    deleteTask={deleteTask}
                    editTask={editTask}
                    tags={tags}
                />
            )}

            <button onClick={toggleTheme} style={{ marginBottom: "15px" }}>
                Switch to {theme === "light" ? "Dark" : "Light"} mode
            </button>
        </div>
    );
}
export default TaskManager;
