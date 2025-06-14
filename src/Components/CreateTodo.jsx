export function CreateTodo() {

    // this component return the mark-up / XML that ideally becomes the html for the webpage
    // when writing js inside the XML we have to use curly braces { inside this we will write our js }
    return (
        <div className="todo-container" style={{
            display: "flex",
            flexDirection: "column",
            gap: 30
        }}>
            <div className="title" style={{
                display: "flex",
                gap: 10
            }}>
                <label htmlFor="title">Title</label>
                <input type="text" name="todoTitle" id="title" placeholder="Enter your todo title" />
            </div>
            
            <div className="description" style={{
                display: "flex",
                gap: 10
            }}>
                <label htmlFor="description">Description</label>
                <input type="text" name="todoDescription" id="description" placeholder="Enter your todo description" />
            </div>

            <div className="add-todo-container">
                <button>Add todo</button>
            </div>
        </div>
    )
}

// CreateTodo is react component that provides the XML that will be render on the screen

// if there is any content that is dynmaic (changes over time) we will call that as "state" and will wrap that inside the useState api that react provides so that if it changes react will re-render / refresh the screen so that changes might be seen