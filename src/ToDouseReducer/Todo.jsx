import { useReducer, useState } from "react";

import "./styles.css";

const TodoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          input: action.payload,
          completed: false,
        },
      ];

    case "TOGGLE_TODO":
      return state.map((toggle) =>
        toggle.id === action.payload
          ? { ...toggle, completed: !toggle.completed }
          : toggle
      );

    case "DELETE_TODO":
      return state.filter(tod => tod.id !== action.payload);

    
    default:
      return state;
  }
};

function App() {
  const [todo, dispatch] = useReducer(TodoReducer, []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");

  const HandleData = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "ADD_TODO", payload: text });
      setText("");
    }

  };

    const filterdTodos = todo.filter((todo) => {

        if(filter === "completed") return todo.completed;
        if(filter === "incompleted") return !todo.completed;
        return true;
   })

  return (
    <div className="App">
      <h1>📑ToDo Application using useReducer</h1>
      <form onSubmit={HandleData}>
        <input
          type="text"
          value={text}
          placeholder="Enter Your Task..."
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Add</button>

      </form>
      <div className="filters">
        <button onClick={()=> setFilter("All")} className={filter === "All" ? "active" :''} >All</button>
        <button onClick={()=> setFilter("completed")} className={filter === "completed" ? "active" : '' }>Completed</button>
        <button onClick={()=> setFilter("incompleted")} className={filter === "incompleted" ? "active" : ''}>Incomplete</button>
      </div>

      <ul>
        
        {filterdTodos.lenght === 0 && <p>No tasks Found....</p> }

            {filterdTodos.map((todos) => (
          <li key={todos.id}>
            <span
              className={todos.completed ? "done" : ""}
              onClick={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todos.id })
              }
            >
              {todos.input}
            </span>

            <span>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_TODO", payload: todos.id })
                }
              >
                ❌
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
