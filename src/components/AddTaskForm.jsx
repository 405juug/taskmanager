import {useState} from "react";

const AddTaskForm = ({addTask}) => {
    const [userInput, setUserInput] = useState("");
    const [taskDate, setTaskDate] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleDateChange = (e) => {
        setTaskDate(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        addTask(userInput.trim(), taskDate);
        setUserInput("");
        setTaskDate("");
    }

    return <form action="" onSubmit={submit}>
        <input
            type="text"
            placeholder="feed my dog"
            value={userInput}
            onChange={handleChange}
        />
        <input
        type="date"
        value={taskDate}
        onChange={handleDateChange}
        />
        <input type="submit" value="Add Task" />
    </form>

}

export default AddTaskForm;

