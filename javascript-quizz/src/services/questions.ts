import type { Question } from '../types.d.ts'
import axios from 'axios'

// export const getAllQuestions = async (limit: number): Promise<Question[]> => {
//     const res = await fetch(`http://localhost:5173/data.json`)
//     const json = await res.json()
       
//     return json
// }


export const getAllQuestions = async (limit: number): Promise<Question[]> => {
    try {
        const response = await axios.get('https://api.jsonbin.io/v3/b/67b9580aad19ca34f80d7245', {
            headers: {
                'X-Access-Key': '$2a$10$OcovNs8Af.phAGDI/l5MfuMKls7cxs9HouLZI2HXtyaIxoG8ht4AO'
            }
        });
        return response.data.record; // Return the todos directly
    } catch (error) {
        console.error("Error fetching todos:", error);
        return []; // Return an empty array to avoid crashes
    }
}