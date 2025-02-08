import { useQuery } from '@tanstack/react-query';
import {fetchTodos} from '../services/todosService';
import { Todo } from '../types';

export function useTodos(){

    const { data, error, isLoading, isSuccess } = useQuery({ 
        queryKey: ['todos'],
        queryFn: fetchTodos
    })

    return { todos: data }

}