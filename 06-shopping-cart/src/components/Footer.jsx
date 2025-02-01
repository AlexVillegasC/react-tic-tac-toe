import './Footer.css'
import { useFilter } from '../hooks/useFilters.js'
import { useCart } from '../hooks/useCart.js'

export function Footer () {
    
    const { cart } = useCart()
    const { filters } = useFilter()

    return (
     <></>
    )
}
   // <footer className='footer'>
        //     {/* {
        //         JSON.stringify(cart, null, 2)
        //     } */}
        //     <h4>Prueba técnica react</h4>
        //     <span>@alexvillegas</span>
        //     <h5>Shopping cart con useContext & useReducer</h5>
        // </footer>