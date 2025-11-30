import { useState } from "react";

function List({ list = [], deleteTask, editTask, tags = [] }) {
    const isPastDate = (dateString) => {
        if (!dateString) return false;
        const today = new Date();
        const taskDate = new Date(dateString);
        today.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate < today;
    };

    return (
        <ul>
            {list?.filter((i) => i?.text).map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    isPastDate={isPastDate}
                    editTask={editTask}
                    tags={tags}
                />
            ))}
        </ul>
    );
}

function TaskItem({ task, isPastDate, editTask, deleteTask, tags = [] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text || "");
    const [date, setDate] = useState(task.date || "");
    const [tag, setTag] = useState(task.tag || "");

    const save = () => {
        if (!text.trim()) return;
        editTask(task.id, text.trim(), date, tag);
        setIsEditing(false);
    };

    return (
        <li key={task.id} style={{ marginBottom: "10px" }}>
            {isEditing ? (
                <>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />

                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <select value={tag} onChange={(e) => setTag(e.target.value)}>
                        <option value="">No tag</option>
                        {(tags || []).map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>

                    <button onClick={save}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <span
                        style={{
                            textDecoration: isPastDate(task.date) ? "line-through" : "none",
                            textDecorationColor: isPastDate(task.date) ? "red" : "inherit",
                            textDecorationThickness: isPastDate(task.date) ? "2px" : "auto",
                            opacity: isPastDate(task.date) ? 0.7 : 1,
                        }}
                    >
                        <strong>{task.text}</strong> - <em>{task.date}</em>
                    </span>

                    {task.tag && (
                        <span
                            style={{
                                marginLeft: 10,
                                color: "var(--tag-color)",
                                fontWeight: "bold" }}>
                            #{task.tag}
                        </span>
                    )}

                    <button onClick={() => setIsEditing(true)} style={{ marginLeft: "10px" }}>
                        Edit
                    </button>

                    <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "5px", color: "red" }}>
                        Delete
                    </button>
                </>
            )}
        </li>
    );
}

export default List;
