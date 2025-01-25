import './App.css'
import { Movies }  from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [ sort, setSort ] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})  
  

  function handleSubmit (event)  {
      event.preventDefault()     
      getMovies({search})
  }

   const debouncedGetMovies = useCallback(debounce(search => {
    console.log("search", search)
    getMovies({search})
  }, 300), [])

  function handleChange (event)
  {        
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies({ search: newSearch })
  }

  function handleSort(){
    setSort(!sort)
  }

  return (
    <div className ='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
            
            <input onChange={handleChange} value={search} name='query' type="text" className="input" placeholder="Buscar..." />            
            <input type='checkbox' onChange={handleSort} checked={sort}/>
            <button type="submit" className="button">Buscar</button>            
        </form>     
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>        
        {
          loading ? <p>Cargando ... </p> : <Movies movies={ movies }></Movies> 
        }                                                    
      </main>
    </div>
  )
}

export default App


 //const fields = new window.FormData(event.target)
      // const { title }  = Object.fromEntries(new window.FormData(event.target))
      //const query = fields.get('query')
      
  // const counter = useRef(0) // valor que persiste entre renders
  // counter.current++
  // console.log(counter.current)