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

// React is used to create dynamic websites without developer caring about the DOM manipulation, the developer should provide the updated data to the react, react internally calcualtes the difference and performs the DOM manipulations.

// the developer only cares about creating the components that react will render and provides us the website

// React provides us special syntax for creating the website (the website will be creating using the components (functional based ), than calling the function to render the markup on the screen )

// Whenever there is content on the website that is dynamic in nature => that content should be wrapped inside the state variable so that React will intiate the re-render / refresh that website when the content changes. 

// React only updates that content of the realDOM that has been updated and hence updates the real DOM efficiently.

// In react Through components the website is created, components handles the content => In componets we will handle the state