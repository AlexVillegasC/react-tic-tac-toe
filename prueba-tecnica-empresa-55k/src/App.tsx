import './App.css'
import { useState, useMemo, useEffect, useRef } from 'react'
import { UsersTable } from './Components/UsersTable'
import { Results } from './Components/Results.tsx'
import {SortBy, type User} from './types.d.ts'
import {useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useUsers } from './Hooks/useUsers.ts'

function App() {

  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  
  function toggleRowColor(){    
    setShowColors(prevState => !prevState)
  }

  function toggleByCountry(){
    const newSortingValue = sorting == SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const handleDelete = (uuid: string) => {
      //const filteredUsers = users.filter((user) => user.login.uuid !=  uuid)
      //setUsers(filteredUsers)
  }

  const filteredUsers = useMemo(()=> {

    return typeof filterCountry == 'string' && filterCountry.length > 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })  
    : users 
  }, [users, filterCountry])

  
    //sortUsers(filteredUsers)
  const sortedUsers = useMemo(() => {    
    
    if(sorting == SortBy.COUNTRY){
      return users.toSorted().sort((a, b) => {      
        return a.location?.country.localeCompare(b.location?.country);
      }) 
    }

    if(sorting == SortBy.NAME){
      return users.toSorted().sort((a, b) => {      
        return a.name?.first.localeCompare(b.name?.first);
      }) 
    }
    
    if(sorting == SortBy.LAST){
      return users.toSorted().sort((a, b) => {      
        return a.name?.last.localeCompare(b.name?.last);
      }) 
    }
     
    return filteredUsers

  },[filteredUsers, sorting])
  

  const resetUsers = () => {    
    //setUsers(originalUsers.current)
  }

  return (
    <>
      <h1>React Table</h1>
      <header>
        <button onClick={toggleRowColor}>Add Color</button>
        <button onClick={toggleByCountry}> { sorting == SortBy.NONE ? 'Sort by Country' : 'Remove Filter' }</button>
        <button onClick={resetUsers}>Reset Users</button>
        <input placeholder='Filter by Country' onChange={(e) => {
          setFilterCountry(e.target.value)
        }}/>
      </header>

      <Results/>

      { users.length > 0 &&
        <UsersTable 
        users={sortedUsers}
        showColors={showColors} 
        handleDelete={handleDelete}
        changeSorting={handleChangeSort}
        />
      }
      
      {isLoading && <p>Loading...</p>}
      {!isLoading && isError && <p>There was an error</p>}
      {!isLoading && !isError && users.length == 0 && <p>No users to load</p>}
      

      {
        !isLoading && !isError && hasNextPage &&
        <button onClick={() => {void fetchNextPage()}}>
          Load more results
        </button>
      }

      {
        !isLoading && !isError && !hasNextPage && 
        <p>No more results to show...</p>
      }
    </>
  )
}

export default App

