import { useState } from "react";

let id = 0;
const INITIAL_TASKS = [
  { id: id++, label: "Walk the dog" },
  { id: id++, label: "Water the plants" },
  { id: id++, label: "Wash the dishes" },
];

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(INITIAL_TASKS);

  const removeTodo = (idToRemove) => {
    const updatedTodos = todos.filter((item) => item.id !== idToRemove);
    setTodos([...updatedTodos]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={todo ?? ""}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add your task"
          aria-label="Add your task"
        />
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const label = todo.trim();
              if (label === "") {
                return;
              }

              setTodos((prevTodos) =>
                prevTodos.concat({
                  id: id++,
                  label,
                }),
              );
              setTodo("");
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span data-id={todo.id}>{todo.label}</span>
            <button onClick={() => {
              setTodos((prevTodos) =>
                prevTodos.filter(prevTodo => prevTodo.id != todo.id),
              );
              removeTodo(todo.id);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
