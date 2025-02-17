
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SearchPage from './pages/SearchPage.jsx'

export const ROUTES = [
    {
      path: '/',
      Component: HomePage
    },
    {
      path: '/about',
      Component: AboutPage
    },
    {
      path: '/search/:query',
      Component: SearchPage
    },
    {
        path: '/lang/about',
        component: AboutPage
    }
  ]

export const EVENTS = {
    PUSH_STATE: 'pushstate',
    POP_STATE: 'popstate'
}
