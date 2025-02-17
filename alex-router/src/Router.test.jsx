import { describe, it, expected, expect, beforeEach } from 'vitest'
import { render, screen, cleanup } from  '@testing-library/react'
import Router from './Router.jsx'
import Page404 from './pages/Page404.jsx'

describe('Router', () => { 

    beforeEach(() => {
        cleanup()
    })

    it('should render Router without problems', () => {
        render(<Router routes={[]} />)
        console.log(screen.debug())
        expect(true).toBeTruthy()    
    })

    it('should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={Page404}/>)
        expect(screen.getByText('404')).toBeTruthy()
    })
})