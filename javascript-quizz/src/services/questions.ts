import { Question } from '../types.d.ts'

export const getAllQuestions = async (limit: number): Promise<Question[]> => {
    const res = await fetch(`https://localhost:5173/data.json`)
    const json = await res.json()
       
    return json
}