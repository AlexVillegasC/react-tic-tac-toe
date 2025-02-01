import './Filters.css'
import { useId } from 'react'
import { useFilter } from '../hooks/useFilters.js'

export function Filters(){

    const { filters, setFilters } = useFilter()
    const minPriceFilterId = useId()
    const minCategoryFilterId = useId()

    const handlePriceChange = (event) => {        
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleCategoryChange = (event) => {
        setFilters(prevState => (
            {
                ...prevState,
                category: event.target.value
            }
        ))
    }

    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>Precio:</label>
                <input 
                    type='range'
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    onChange={handlePriceChange}
                    value={filters.minPrice}
                />
                <output>${filters.minPrice}</output>
            </div>

            <div>
                <label htmlFor={minCategoryFilterId}>Category</label>
                <select id={minCategoryFilterId} onChange={handleCategoryChange}>
                    <option value='beauty'>Belleza</option>
                    <option value='furniture'>Muebles</option>
                    <option value='groceries'>Alimentación</option>                    
                </select>
            </div>
        </section>
    )
}