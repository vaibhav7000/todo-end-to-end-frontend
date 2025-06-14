export default function Todos({ allTodos }) {

    return (
        <div className="all-todos-container" style={{
            marginTop: 20
        }}>
            <div className="heading">
                All Todos
            </div>

            {allTodos.map(function(todo) {
                return <Todo title={todo.title} description={todo.description} completed={todo.completed}/>
            })}
        </div>
    )
}


function Todo({title, description, completed}) {
    return (
        <div className="todo">
            <div>{title}</div>
            <div>{description}</div>
            <button>{`${completed}`}</button>
        </div>
    )
}

// Todos component will present all the todos present in the database
// When the JSX gets an array of componets then It renders all the components present in the array on the screen

// since all the todos comes from the backend => dynamic => should be wrapped using state (useState)