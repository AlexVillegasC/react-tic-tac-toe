import { createContext, useState, useReducer } from "react"

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

// Update localStorage with state for cart
export const updateLocalStorageWithCart = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART] : (state, action) =>{
        const { payload } = action
        const { id } = payload
        const productInCartIndex = state.findIndex(item => item.id == id)

        if(productInCartIndex >= 0){
            const newState = structuredClone(state)
            newState[productInCartIndex].quantity += 1
                                    
            return newState
        }

        const newState = [
            ...state,
        {
            ...payload,
            quantity: 1
        }]

        updateLocalStorageWithCart(newState)

        return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART] : (state, action) => {
        const { payload: actionPayload } = action
        const { id } = actionPayload
            
        const newState = state.filter(item => item.id != id)
        updateLocalStorageWithCart(newState)
        return newState
    },
    [CART_ACTION_TYPES.CLEAR_CART] : () => {
        updateLocalStorageWithCart([])
        return []
    }

}


const reducer = (state, action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
}


function useCartReducer () {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = product => dispatch({
        type: CART_ACTION_TYPES.ADD_TO_CART,
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: product
    })

    const clearCart = () => dispatch({
        type: CART_ACTION_TYPES.CLEAR_CART
    })

    return { state, addToCart, removeFromCart, clearCart }

}

export function CartProvider ({children})
{    
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CartContext.Provider value={
            {
                cart: state,
                addToCart,
                removeFromCart,
                clearCart
            }
        }>
            {children}
        </CartContext.Provider>
    )
}



    // function addToCart(product) {        
    //     // Check if product is already in the cart             
    //     const productInCartIndex = cart.findIndex(item => item.id == product.id)
    //     if(productInCartIndex >= 0){
    //         const newCart = structuredClone(cart)
    //         newCart[productInCartIndex].quantity += 1
                                    
    //         return setCart(newCart)
    //     }

    //     // product is not in the cart
    //     setCart(prevState => ([
    //         ...prevState,
    //         {
    //             ...product,
    //             quantity: 1
    //         }
    //     ]))

    // }

    // const removeFromCart = product => {
    //     setCart(prevState => prevState.filter(item => item.id != product.id))
    // }

    // const clearCart = () => {
    //     setCart([])
    // }