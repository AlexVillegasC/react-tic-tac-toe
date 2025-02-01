import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'

export function Products({ products }) {
    
    const { cart, addToCart, removeFromCart } = useCart()
    
    const checkProductInCart = product => {
        return cart.some(item => item.id == product.id)
    }

    return(
        <main className='products'>
            <ul>
                {
                    products?.slice(0,10).map(product => {
                        const isProductInCart = checkProductInCart(product)
                        
                        return (
                        <li key={product.id}>                            
                            <img
                                src={product.thumbnail}
                                alt={product.description}
                            />
                            <div>
                                <strong>{product.title}</strong> - ${product.price}
                            </div>
                            <div>
                                <button style={{backgroundColor : !isProductInCart ? '#09f' : 'red' }} onClick={() =>  (!isProductInCart ? addToCart(product) : removeFromCart(product)) }>
                                {
                                    !isProductInCart ? <AddToCartIcon/> : <RemoveFromCartIcon/>
                                } 
                                </button>
                            </div>
                        </li>
                        )
                    })           
                }                
            </ul>
        </main>
    )
}