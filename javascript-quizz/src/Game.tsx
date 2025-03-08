import { IconButton, Stack, List, ListItem, Card, Typography, ListItemButton, ListItemText} from "@mui/material"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from "./Footer";
import { useQuestionsStore } from "./store/questions"


import  { type Question as QuestionType } from './types'
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const getBackgroundColor = (info: QuestionType, index: number) => {
    const {correctAnswer, userSelectedAnsware} = info

    // user has not selected any answer
    if (userSelectedAnsware == null) return 'transparent'
    
    if (index != correctAnswer && index != userSelectedAnsware) return 'transparent'

    // If user has selected the correct answer
    if(index == correctAnswer) return 'green'
    
    if(index == userSelectedAnsware) return 'red'

    return  'transparent'
}

const Question = ({info}: {info: QuestionType}) => {    
    const selectAnsware = useQuestionsStore(state => state.selectAnsware)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnsware(info.id, answerIndex)
    }    



    return (
        <Card variant="outlined" sx={{ padding:'2' ,bgcolor:'#222' ,textAlign: 'left'}}>
            <Typography variant="h5" component="h2">
                {info.question}    
            </Typography>   

            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333' }} disablePadding> 
                {
                    info.answers.map((answer, index) => {
                        return (
                            <ListItem key={index} sx={{ bgcolor: '#333'}} disablePadding divider>
                                <ListItemButton onClick={createHandleClick(index)} 
                                    disabled={info.userSelectedAnsware != null}
                                    sx={{ 
                                        bgcolor: getBackgroundColor(info, index) 
                                    }}>
                                    <ListItemText primary={answer} sx={{ textAlign: 'center' }}/>                                        
                                </ListItemButton>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Card>
    )
}

export const Game = () => { 
    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

    console.log(questions)

    const questionInfo = questions[currentQuestion]
    
    return (
        <>
            <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
                <IconButton onClick={goPrevQuestion} disabled={currentQuestion == 0} color='primary' size='large'>               
                    <ArrowBackIos />
                </IconButton>
                <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length -1} color='primary' size='large'>               
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>

            <Footer/>
        </>
    )
}