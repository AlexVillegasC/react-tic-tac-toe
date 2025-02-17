
import { useState, useEffect, Children } from 'react'
import { EVENTS } from './consts.js'
import { match } from 'path-to-regexp'

export default function Router ({children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1>}){
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
    
  useEffect(() => {
    const onLocationChange = () => {
       setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSH_STATE, onLocationChange)
    window.addEventListener(EVENTS.POP_STATE, onLocationChange)


    return () => {
      window.removeEventListener(EVENTS.PUSH_STATE, onLocationChange)
      window.removeEventListener(EVENTS.POP_STATE, onLocationChange)
    }  
  },[]) 

  let routeParams = {}

  const routesFromChildren = Children.map(children, ({props, type}) => {        
        const { name } = type
        const isRoute = name != 'Route'
                
        return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  console.log("routesToUse ",routesToUse)
  //const Page = routes.find(route => route.path == currentPath)?.Component || DefaultComponent
  const Page = routes.find( ({path}) => {
      
      if(path == currentPath) return true

      const matcherUrl = match(path, {decode: decodeURIComponent})
      const matched = matcherUrl(currentPath)
      
      console.log(matched)
      if(!matched) return false

      // uses path to regex lib, to detect dinamic routes like:
      // /search/:query
      routeParams = matched.params // 
      return true
  })?.Component || DefaultComponent



  return Page ? <Page routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams}/>
}