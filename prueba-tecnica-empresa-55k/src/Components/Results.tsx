import { useUsers } from '../Hooks/useUsers'

export const Results = () => {
    
    const { users } = useUsers()
    
    return (<h3>Total Results {users.length}</h3>)
}