const RANDOM_CAT_FACT = 'https://catfact.ninja/fact';

export const getRandomFact = async () => {
    const res = await fetch(RANDOM_CAT_FACT)
    const data = await res.json() // promise
    const { fact } = data
    return fact
}