import React, { useEffect, useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodos = [...todos, inputValue];
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            setInputValue('');
        }
    };

    const removeTodo = (index: number) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new todo" 
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo} <button onClick={() => removeTodo(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;