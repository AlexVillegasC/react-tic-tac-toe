import { useId } from  'react'
import { CartIcon, ClearCartIcon  } from './Icons.jsx'
import './Cart.css'
import { useCart } from '../hooks/useCart.js'

function CartItem ({thumbnail, title, price, quantity, addToCart}){


    return (
        <li>
            <img src={thumbnail} alt='phone'/>
            <div>
                <strong>{title}</strong> - $ {price}
            </div>
            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export function Cart() {

    const cartCheckboxId = useId()

    const { cart, clearCart, addToCart } = useCart()

    return(
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon/>
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />
            <aside className='cart'>
            <ul>
                {cart.map(product => (
                    <CartItem key={product.id} 
                    {...product}
                    addToCart={() => addToCart(product)}
                     />
                ))}                    
                <button onClick={clearCart}>
                    <ClearCartIcon/>
                </button>
            </ul>
            </aside>
        </>
    )
}