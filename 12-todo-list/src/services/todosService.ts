import axios from 'axios';
import { Todo } from  '../types.d.ts';

export async function fetchTodos() {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/67a6ac22ad19ca34f8fbc389');
        return response.data.record.todos; // Return the todos directly
    } catch (error) {
        console.error("Error fetching todos:", error);
        return []; // Return an empty array to avoid crashes
    }
}


export async function addTodoService({ newTodo : Todo }) {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/qs/67a6ac22ad19ca34f8fbc389');
        const todos = response.data.record.todos;
        todos.push(newTodo);
        await axios.put('https://api.jsonbin.io/v3/qs/67a6ac22ad19ca34f8fbc389', { todos });
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

// {
//     "todos": [
//             {
//               "title": "Study React",
//               "status": false,
//               "description": "Take 1 hour a day, per 2 weeks to learn react basics"
//             },
//             {
//               "title": "Task 2",
//               "status": false,
//               "description": "Some testing"
//             }
//            ]
//     }