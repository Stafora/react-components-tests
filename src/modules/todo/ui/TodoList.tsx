import { useState } from "react";
import { useTodos } from "@/modules/todo/hooks/useTodos";
import React from "react";

export default function TodoList() {
const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
const [newTodo, setNewTodo] = useState("");

return (
    <div className="p-4 border rounded-md shadow-md w-100">
        <h2 data-cy-h2 className="text-lg font-bold mb-2">Todo List</h2>
        
        <div className="flex gap-2 mb-4">
            <input
                data-cy-input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="border p-1 flex-1"
                placeholder="Enter a task"
            />
            <button 
                data-cy-button
                onClick={() => {
                    if (newTodo.trim()) {
                        addTodo(newTodo.trim());
                        setNewTodo("");
                    }
                }} 
                className="bg-blue-500 text-white px-2 py-1 rounded"
            >
                Add
            </button>
        </div>

        <ul data-cy-ul>
            {todos.map((todo) => (
                <li data-cy-li key={todo.id} className="flex justify-between items-center p-2 border-b">
                    <span 
                        onClick={() => toggleTodo(todo.id)}
                        className={todo.completed ? "line-through text-gray-500 cursor-pointer" : "cursor-pointer"}
                    >
                        {todo.text}
                    </span>
                    <button 
                        data-cy-remove
                        onClick={() => removeTodo(todo.id)}
                        className="text-red-500"
                    >
                        ❌
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
}
