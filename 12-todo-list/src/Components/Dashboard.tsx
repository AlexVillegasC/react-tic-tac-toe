
import { useTodos } from '../Hooks/useTodos'
import { Todo } from '../types'
import './Dashboard.css'

export function Dashboard () {
    const  { todos } = useTodos()   

    const toggleTask = (index: number) => {
        console.log(index)  
    }

    console.log(todos)

    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
          {
            todos?.map((todo: Todo, index: number) => (
                <div className="todo-list">                
                    <div key={index} className={`todo-item ${todo.status ? "completed" : ""}`}>
                        <div className="todo-content">
                            <input 
                                type="checkbox" 
                                checked={todo.status} 
                                onChange={() => toggleTask(index)}
                                className="todo-checkbox"
                                id={`todo-${index}`}
                            />
                            
                            <label htmlFor={`todo-${index}`} className="checkbox-label"></label>
                            <div className="text-content">
                                <h2>{todo.title}</h2>
                                <p>{todo.description}</p>
                            </div>
                        </div>
                    </div>                            
                </div>
                ))
            }                              
        </div>
    )
}
