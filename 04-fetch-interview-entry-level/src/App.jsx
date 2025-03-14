import React from 'react';
import './App.css';
import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'

export function App()
{    
    const {fact, refreshFact} = useCatFact()
    const imageUrl = useCatImage({ fact })
                    
    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <section>
                <h1>App de gatitos</h1>
                <button onClick={handleClick}>Get Cat Fact</button>
            </section>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`}></img>}
            </section>
        </main>
    )
}