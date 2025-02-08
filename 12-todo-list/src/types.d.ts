export interface Welcome {
    todos: Todo[];
}


interface Todo {
    id: number;
    title: string;
    description: string;
    status: boolean;
}

interface Props {
    addTodo: (newTodo: Todo) => void;
}