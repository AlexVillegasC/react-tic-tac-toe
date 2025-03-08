import { create } from 'zustand';
import type { Question } from '../types';
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'
import { getAllQuestions } from '../services/questions.ts'

interface State {
    questions: Question[],
    currentQuestion: number,
    goNextQuestion: () => void,
    goPrevQuestion: () => void,
    fetchQuestions: (limit: number) => Promise<void>,
    selectAnsware: (questionId: number, answerIndex: number) => void,
    reset: () => void
}

const logger = (config) => (set, get, api) =>{
    return config(
        (...args) => {
            console.log(' Applying', args)
            set(...args)
            console.log(' new State', get())
        }, 
        get,
        api)
}

export const useQuestionsStore = create<State>()(logger(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestions: async (limit: number) => {
            
            const json = await getAllQuestions(limit)
            console.log("json: ", json)
            const questions =  json?.sort(() => Math.random() - 0.5)?.slice(0, limit)
            set({ questions })
        },
        selectAnsware: (questionId: number, answerIndex: number) => {
            const { questions } = get()

            const newQuestions = structuredClone(questions)
            
            // Find the current question index
            const questionIndex = newQuestions.findIndex(q => q.id == questionId)
            
            // Extrac  question info
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnsware = questionInfo.correctAnswer == answerIndex
    
            // update the new question / answer infomation
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnsware,
                userSelectedAnsware: answerIndex
            }

            if(isCorrectUserAnsware) confetti()

            //update state
            set({ questions: newQuestions })
        },
        goNextQuestion:  () => {
            const { currentQuestion, questions } = get()

            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }            
        },
        goPrevQuestion:  () => {
            const { currentQuestion } = get()

            const prevQuestion = currentQuestion - 1

            if(prevQuestion >= 0) {
                set({ currentQuestion: prevQuestion })
            }
        },
        reset: () => {
            set({ questions: [], currentQuestion: 0 })
        }
    }
}, { name: 'questions' }   
)))