import { fireEvent, render, renderHook, screen } from "@testing-library/react"
import TodoList from '../ui/TodoList'
import React, { act } from 'react'
import { useTodos } from '../hooks/useTodos'
import { generateId } from '../helpers'

describe('Render Component', () => {
    test('Default render', () => {
        render(<TodoList />)
        expect(screen.getByText(/Todo List/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter a task')).toBeInTheDocument()
        expect(screen.getByText(/Add/i)).toBeInTheDocument()
    })

    test('renders added todos', () => {
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('Enter a task');
        const button = screen.getByText(/Add/i);
    
        fireEvent.change(input, { target: { value: 'Todo 1' } });
        fireEvent.click(button);
    
        fireEvent.change(input, { target: { value: 'Todo 2' } });
        fireEvent.click(button);
    
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
})

describe('helpers', () => {
    test('Helper generateId', () => {
        const id = generateId()
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);

        const idSecond = generateId()
        expect(id !== idSecond).toBe(true);
    })

    test('generateId returns valid ID format', () => {
        const id = generateId();
        expect(id).toMatch(/^[a-z0-9]{9}$/);
    })
})

describe('use hook todo', () => {
    test('add todo', () => {
        const { result } = renderHook(() => useTodos());
        
        act(() => {
            result.current.addTodo('Todo 1')
            result.current.addTodo('Todo 2')
        })
        expect(result.current.todos.length).toBe(2)

        expect(result.current.todos[0].text).toBe('Todo 1')
    })

    test('remove todo', () => {
        const { result } = renderHook(() => useTodos());
        act(() => {
            result.current.addTodo('Todo 1')
            result.current.addTodo('Todo 2')
        })

        expect(result.current.todos.length).toBe(2)

        act(() => {
            result.current.removeTodo(result.current.todos[result.current.todos.length - 1].id)
        })

        expect(result.current.todos.length).toBe(1)

        act(() => {
            result.current.removeTodo(result.current.todos[result.current.todos.length - 1].id)
        })
        
        expect(result.current.todos.length).toBe(0)
    })

    test('toggle todo status', () => {
        const { result } = renderHook(() => useTodos());
    
        act(() => {
            result.current.addTodo('Todo 1');
        });
    
        expect(result.current.todos[0].completed).toBe(false);
    
        act(() => {
            result.current.toggleTodo(result.current.todos[0].id);
        });
    
        expect(result.current.todos[0].completed).toBe(true);
    });
    
})