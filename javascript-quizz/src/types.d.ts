export interface Question {
    id:            number;
    question:      string;
    code:          string;
    answers:       string[];
    correctAnswer: number;
    userSelectedAnsware?: number;
    isCorrectUserAnsware?: boolean;
}