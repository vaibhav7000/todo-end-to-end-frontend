import { CreateTodo } from "./Components/CreateTodo.jsx"
import Todos from "./Components/Todos.jsx";
import { useState } from "react";
function App() {
    // by default the state will be empty, the todos will be fetched from the backend server and then gets updated on the screen

    const [todos, setTodos] = useState([]);
    return (
        <div className="wrapper">
            <CreateTodo />
            <Todos allTodos = {todos} />
        </div>
    )
}

export default App;

// React was introduced to get rid of the DOM manipulations things