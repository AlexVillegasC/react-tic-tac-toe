

export const searchMovies = async ({ search }) => {
    if (search==null)
        return null

    try {   
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=a57a13d7&s=${search}`)                   
        const json = await response.json()
        const movies = json.Search
        
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster
        }))    
    }
    catch (e)
    {
        throw new Error('Connection to Movies Service Failed')
    }
}