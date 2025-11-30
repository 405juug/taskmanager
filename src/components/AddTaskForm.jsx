import { useState } from "react";

const AddTaskForm = ({ addTask, tags = [], addTag }) => {
    const [userInput, setUserInput] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskTag, setTaskTag] = useState("");
    const [newTag, setNewTag] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleDateChange = (e) => {
        setTaskDate(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        addTask(userInput.trim(), taskDate, taskTag);
        setUserInput("");
        setTaskDate("");
        setTaskTag("");
    };

    const addNewTag = () => {
        if (newTag.trim()) {
            addTag(newTag);
            setNewTag("");
        }
    };

    return (
        <form onSubmit={submit}>
            <input
                type="text"
                placeholder="feed my dog"
                value={userInput}
                onChange={handleChange}
            />
            <input type="date" value={taskDate} onChange={handleDateChange} />

            <select value={taskTag} onChange={(e) => setTaskTag(e.target.value)}>
                <option value="">No tag</option>
                {(tags || []).map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>

            <input type="submit" value="Add Task" />

            <div style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    placeholder="New Tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />
                <button type="button" onClick={addNewTag}>
                    Create Tag
                </button>
            </div>
        </form>
    );
};

export default AddTaskForm;
