export interface QuizzCategory {
    id: number;
    name: string
}


export interface QuizzDifficulty {
    id: string,
    label: string
}

export interface QuizzQuestionApiResponse {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    shuffledAnswers: string[]
}
export interface QuizzQuestion {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[],
    shuffledAnswers: string[]
}

export interface QuizzAnsweredQuestion {
    question: QuizzQuestion
    selected_answer: string
}

export enum QuizzAnswerButtonState {
    UNSELECTED = "btn-outline-success",
    SELECTED = "btn-success",
    BAD_ANSWER = "btn-danger"
}

export enum QuizzFormMode {
    QUESTION = "question",
    RESULT = "result"
}