
export const getCatImage = (fact) => {         
    const firstThreeWords = fact.split(' ').slice(0, 3).join(' ')    
    return fetch(`https://cataas.com/cat/says/${firstThreeWords}?fontSize=50&fontColor=white`).then(response => response.url)
}