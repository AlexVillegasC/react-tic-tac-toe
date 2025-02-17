import axios from 'axios';
import { type Todo } from '../types.d.ts';

export async function fetchTodos() {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/67a7d763acd3cb34a8dad74f', {
            headers: {
                'X-Access-Key': '$2a$10$OcovNs8Af.phAGDI/l5MfuMKls7cxs9HouLZI2HXtyaIxoG8ht4AO'
            }
        });
        return response.data.record.todos; // Return the todos directly
    } catch (error) {
        console.error("Error fetching todos:", error);
        return []; // Return an empty array to avoid crashes
    }
}


export async function postTodo({ newTodo }: { newTodo: Todo }) {
    const todos = await fetchTodos();              
    todos.push(newTodo);

    try {
        const response = await axios.put(
            'https://api.jsonbin.io/v3/b/67a7d763acd3cb34a8dad74f',
            { todos },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Key': '$2a$10$OcovNs8Af.phAGDI/l5MfuMKls7cxs9HouLZI2HXtyaIxoG8ht4AO'                   
                },
            }
        );

        if(response.status != 200) 
            throw new Error("Error adding todo");

        return newTodo;
    } catch (error) {
        console.error("Error adding todo:", error);
    }
}

// {
//     "todos": [
//             {
//               "id": "23fdwedfe3ef32ef",
//               "title": "Study React",
//               "status": false,
//               "description": "Take 1 hour a day, per 2 weeks to learn react basics"
//             },
//             {
//               "id": "232ewdfef4efwef4",
//               "title": "Task 2",
//               "status": false,
//               "description": "Some testing"
//             }
//            ]
//     }