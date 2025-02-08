import React, { useState } from "react";
import { Todo, Props } from "../types";
import "./CommentsArea.css";

export const CommentsArea: React.FC<Props> = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return; // Prevent empty submissions
        
        const newTodo: Todo = {
            id: Date.now(), // Unique ID
            title,
            description,
            status: false, // Default status as incomplete
        };

        addTodo(newTodo); // Send new todo to parent
        setTitle(""); // Clear inputs
        setDescription("");
    };

    return (
        <div className="comments-area">
            <h1>📝 Comments Area</h1>
            <form onSubmit={handleSubmit} className="todo-form">
                <label>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    required
                />
                <label>Description</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    required
                />
                <button type="submit">Save Todo</button>
            </form>
        </div>
    );
};




