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
            setTitle(""); 
            return
        }

        result = descriptionSchema.safeParse(description);

        if(!result.success) {
            alert("Enter valid description")
            setDescription("");
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
                    title: titleFinal,
                    description: descriptionFinal,
                }),
                headers: {
                    "Content-Type": "application/json" // express server using this value checks if the given body is JSOn or not
                }
            })

            const output = await response.json();

            alert(output.msg);
            return true;
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
                // body: JSON.stringify({}), does not send body when sending get request because it is not supported by the protocol send data in query params
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // the frontent can also check if the resposne is string or json using "Content-Type"
            const allTodos = await response.json();
            setTodos(allTodos.todos);
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

// All ABOUT CORS Error

// Browser throws the "CORS" error ( its a security feature that is implemented from the browser end ), this feature allows the browser to only send request to domain through which it gets the html document, in React browser gets the html from the 5173 port and does not make the fetch request to the backend server at 3000. The browser

// CORS errors are thrown when a web request (fetch) is made in the browser to an endpoint on a domain (localhost:3000 backend) that is different from the domain of the webpage (localhost:5173) making the request. "IMP" while the request reaches to the backend server the backend server does sends response to browser but missing something in headers that browser loves and hence browser causes the error called CORS error

// CORS Errors are Browser Errors, that why the same request send from postman does not cause the CORS error, because it is Browser errors,

// There are many ways to resolve the CORS error, 
// 1. making the "browser happy" when sending the resposne from the backend server by providing some data that browser likes and hence it does not cause any error. These lovely things is provided automatically by a "dependency" called "Cors" that will be added at the backend side so that response contains lovely things that browser loves