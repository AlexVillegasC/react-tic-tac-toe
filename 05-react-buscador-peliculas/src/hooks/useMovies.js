import {useState, useRef, useMemo, useCallback, useEffect } from 'react' // una referencia mutable que persiste useRef
import { searchMovies } from '../services/searchMovies' 

export function useMovies({search, sort}){
  const [movies, setMovies] = useState([])    
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const isSameSearchValue = useRef('')

  const getMovies = useCallback(async ({search}) => {
      try {
        if(isSameSearchValue.current == search)
          return
        
        setLoading(true)
        const newMovies = await searchMovies({search})
        isSameSearchValue.current = search
        setMovies(newMovies)
      }
      catch(e) {
        setError(e.message)      
      }finally{
        setLoading(false)
      }
    }
,[]) 

  useEffect(() => {
    console.log("New getMovies")
  }, [getMovies])

  const sortedMovies = useMemo(() => {    
    return  sort 
    ? [... movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies    
  }, [sort, movies])
  
  return { movies: sortedMovies, getMovies, loading}
}