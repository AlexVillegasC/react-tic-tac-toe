import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUsers } from "../Services/users.ts"
import { type User} from "../types.d.ts"

export function useUsers(){

    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ users: User[], nextPage: number }>({
        queryKey: ['users'],
        queryFn: fetchUsers,    
        getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
        staleTime: 1000*3 //3 segundos
      });
              
      const users: User[] = data?.pages?.flatMap(page => page.users) ?? []
  
      return { isLoading, isError, users, refetch, fetchNextPage, hasNextPage }
      
}
  
    