import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {fetchTodos, postTodo} from '../services/todosService';


export function useTodos(){

    const queryClient = useQueryClient()

    const { data } = useQuery({ 
        queryKey: ['todos'],
        queryFn: fetchTodos
    })

    const { mutate, isPending } = useMutation({
        mutationFn: postTodo,
        onMutate: async ({newTodo}) => {
            await queryClient.cancelQueries(['todos'])

            const previousTodos = queryClient.getQueryData(['todos'])

            queryClient.setQueryData(['todos'], (oldTodos: any) => {                
                if(oldTodos == null){                    
                    return [newTodo]
                } 
                console.log('newTodo1: ', [newTodo])
                console.log('newTodo2: ', oldTodos)
                console.log('newTodo3: ', [...oldTodos, newTodo])

                return [...oldTodos, newTodo]
            })
            
            return { previousTodos }
        },
        onError: async (error, newTodo, context) => {
            if(context?.previousTodos != null){
                queryClient.setQueryData(['todos'], context.previousTodos)
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['todos']
            })
        }        
    })
    
    
    return { todos: data, mutate, isLoadingMutation:isPending }

}