import { useState } from 'react';
import { generateId } from '@/modules/todo/helpers'

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string) => {
        setTodos((prev) => [...prev, { id: generateId(), text, completed: false }]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    return { todos, addTodo, toggleTodo, removeTodo };
}
