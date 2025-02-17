import { EVENTS } from './consts.js'

export function navigate(href){  
  window.history.pushState({}, '', href)
  // crear un evento personalizado para avisar a la app que la url ha cambiado
  const navigationEvent = new Event(EVENTS.PUSH_STATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({target, to, ...props}) {
    const handleClick = (event) => {            
        const isMainEvent = event.button == 0 // leftClick
        const isModifiedEvent = event.metakey || event.ctrlKey || event.altKey || event.shiftKey
        const isManageableEvent = target == undefined || target == '_self'

        if(isMainEvent && isManageableEvent && !isModifiedEvent){
          event.preventDefault()
          navigate(to)
        }
    }

    console.log(props.children)

    return <a onClick={handleClick} href={to} target={target} {...props} />        
}