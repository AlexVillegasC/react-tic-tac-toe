import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"
import { Button } from "@mui/material"

export const Footer = () => {

    const { correct, incorrect, unanswered } = useQuestionsData()

    const reset = useQuestionsStore(state => state.reset)
   
    return (
        <footer style={{marginTop: '16px'}}>
            <strong>{`✅ Correct: ${correct} - ❌ Incorrect: ${incorrect} - ? No Answer: ${unanswered}`}</strong>            
            <div style={{marginTop: '16px'}}>
                <Button onClick={() => reset()}>
                    Reset Game!
                </Button>
            </div>
        </footer>
    )
}