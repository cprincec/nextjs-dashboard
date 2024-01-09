import { useEffect, useState } from "react";
import "./styles.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("ITEMS");
        if (localValue === null) return [];

        return JSON.parse(localValue);
    });

    useEffect(() => {
        localStorage.setItem("ITEMS", JSON.stringify(todos));
    }, [todos]);

    function addTodo(title) {
        setTodos((currentTodos) => [...currentTodos, { id: crypto.randomUUID(), title, completed: false }]);
    }

    function toggleTodo(id, completed) {
        setTodos((currentTodos) =>
            currentTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }

                return todo;
            })
        );
    }

    function deleteTodo(id) {
        setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }
    return (
        <>
            <TodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        </>
    );
}

export default App;