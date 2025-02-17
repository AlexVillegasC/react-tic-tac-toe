import { lazy, Suspense  } from 'react'
import './App.css'
import Page404 from './pages/Page404'
import Router from './Router'
import Route from './Route'
import { ROUTES } from './consts'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage = lazy(() =>  import('./pages/AboutPage.jsx'))
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'))


function App() {
  


  return (
    <> 
    <main>
      <Suspense fallback={<div>Loading...</div>}>      
        <Router routes={ROUTES} defaultComponent={Page404}>
          <Route path='/' component={HomePage}/>
          <Route path='/about' component={AboutPage}/>
          <Route path='/search/:query' component={SearchPage}/>
        </Router>
      </Suspense>
    </main>
    </>
  )
}

export default App
