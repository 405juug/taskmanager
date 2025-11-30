import "./style.css"
import wave from "../../assets/images/wave.png"
import {useState} from "react";

const Greeting = () => {

    // let counter = 0;
    const [counter, setCounter] = useState(0);
    const [userInput, setUserInput] = useState()

    const increment = () => {
        setCounter(counter + +userInput);
    }

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    return <div className="greeting">
        <h1>Hello World!</h1>
        <h2>how's you doing</h2>
        <input type="number" value={userInput} onChange={handleChange} />
        <img src={wave} alt="wave__emoji"></img>
        <button onClick={increment}>Click count: {counter}</button>
    </div>
}

export default Greeting