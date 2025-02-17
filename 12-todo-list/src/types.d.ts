export interface Welcome {
    todos: Todo[];
}


export interface Todo {
    id: string;
    title: string;
    description: string;
    status: boolean;
}

export interface Props {
    addTodo: (newTodo: Todo) => void;
}