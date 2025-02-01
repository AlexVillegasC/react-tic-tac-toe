import { Products } from "./components/Products"
import { products } from "./mocks/products.json"
import { Header } from "./components/Header"
import { useFilter } from "./hooks/useFilters"
import { Footer } from './components/Footer'
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"

function App() {

  const { filterProducts } = useFilter()


  const filteredProducts = filterProducts(products)

  return (      
    <CartProvider>      
      <Header/>
      <Cart/>
      <Products products={filteredProducts}/>    
      <Footer/>
    </CartProvider>
  )
}

export default App
