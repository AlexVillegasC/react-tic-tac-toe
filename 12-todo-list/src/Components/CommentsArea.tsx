import React, { useState } from "react";
import { Todo, Props } from "../types";
import "./CommentsArea.css";
import { useTodos } from "../Hooks/useTodos";

export const CommentsArea: React.FC<Props> = ({ addTodo }) => {        
    const  { todos, mutate, isLoadingMutation } = useTodos()   

    const handleSubmit = (event: React.FormEvent) => {

        if(isLoadingMutation) return; // Prevent multiple submissions

        event.preventDefault();
                        
        const data = new FormData(event.currentTarget) 
        const title = data.get('title').toString() ?? ''; 
        const description = data.get('description').toString() ?? '';      
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            title,
            description,
            status: false,
        }      

        mutate({newTodo}); // Send new todo to parent        
    };



    return (
                   
         
        <div className={`${isLoadingMutation ? 'opacity-40' : '' } comments-area`}>
            <h1>📝 Comments Area</h1>
            <form onSubmit={handleSubmit} className="todo-form">
                <label>Title</label>
                <input 
                    name="title"
                    type="text"                                         
                    placeholder="Enter title..."
                    required
                />
                <label>Description</label>
                <textarea 
                    name="description"                                        
                    placeholder="Enter description..."
                    required
                />
                <button type="submit"disabled={isLoadingMutation}>Save Todo</button>
            </form>
        </div>
    );
};




