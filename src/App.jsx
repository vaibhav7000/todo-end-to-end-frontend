import { CreateTodo } from "./Components/CreateTodo.jsx"
import Todos from "./Components/Todos.jsx";
import { useState } from "react";
import { titleSchema, descriptionSchema } from "./utils/types.js";

function App() {
    // by default the state will be empty, the todos will be fetched from the backend server and then gets updated on the screen

    const [todos, setTodos] = useState([]);
    // title and description of todos are dynamic => must be wrapped inside the state => if title and content changes the react re-renders the website and DOM should be update
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    async function addTodoToDatabase() {
        let result = titleSchema.safeParse(title);

        if(!result.success) {
            alert("Enter valid title");
            return
        }

        result = descriptionSchema.safeParse(description);

        if(!result.success) {
            alert("Enter valid description")
            return;
        }
        const titleFinal = title;
        const descriptionFinal = description;

        setTitle(""); 
        setDescription(""); // these method calls are gracefully handle by the react to re-render / refresh the the componet and these does not gets immediately gets updated

        try {
            // Now sending request to the server to add the todo to mongoDB server
            const response = await fetch("http://localhost:3000/todos/addTodo", {
                method: "POST",
                // the body should be a valid JSON format in the form of string
                body: JSON.stringify({
                    tite: titleFinal,
                    description: descriptionFinal,
                }),
                headers: {
                    "Content-Type": "application/json" // express server using this value checks if the given body is JSOn or not
                }
            })

            const output = await response.json();

            alert(output.msg);
            return false
        } catch (error) {
            alert("Something went wrong, the todo does not get added to the database");
            throw error;
            // if from an async function we return value instead of throw error it will be marked as resolve
        }
    }

    async function getAllTodos() {
        try {
            const response = await fetch("http://localhost:3000/todos/allTodo", {
                method: "GET",
                body: JSON.stringify({}),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // the frontent can also check if the resposne is string or json using "Content-Type"
            const allTodos = await response.json();
            setTodos(allTodos);
        } catch(error) {
            alert("Something up with the backend server Not able to fetch all the todos");
            throw error
        }
    }


    return (
        <div className="wrapper">
            {/* sending props to this component */}
            <CreateTodo title={title}  setTitle={setTitle} description={description} setDescription={setDescription} addTodoToDatabase = {addTodoToDatabase} getAllTodos = {getAllTodos} />

            <Todos allTodos = {todos} />
        </div>
    )
}

// The application should be created in such a way that whenever the user adds the todo it should also gets updated on the webiste

export default App;

// React was introduced to get rid of the DOM manipulations things

// React is used to create dynamic websites without developer caring about the DOM manipulation, the developer should provide the updated data to the react, react internally calcualtes the difference and performs the DOM manipulations.

// the developer only cares about creating the components that react will render and provides us the website

// React provides us special syntax for creating the website (the website will be creating using the components (functional based ), than calling the function to render the markup on the screen )

// Whenever there is content on the website that is dynamic in nature => that content should be wrapped inside the state variable so that React will intiate the re-render / refresh that website when the content changes. 

// React only updates that content of the realDOM that has been updated and hence updates the real DOM efficiently.

// In react Through components the website is created, components handles the content => In componets we will handle the state

// Process that should be followed when creating the website through React
// 1. Break the website into Components 
// 2. Create Components / functions / Custom HTML tags that will contains the markup / xml with the state
// 3. Call the Components so that website builds up
// 4. Componets maintains the content => if the content is dynamic => should we wrapped inside the state ( useState ), using this the React will re-render the website when the content will change

// We use props to establish communication / transfer of data between child and parent, the flow of data should always starts from parent to child