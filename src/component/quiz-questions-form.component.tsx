import React, {Dispatch, SetStateAction} from "react";
import {QuizzAnsweredQuestion, QuizzFormMode, QuizzQuestion} from "../model/quizz-model.ts";
import QuizzQuestionComponent from "./quizz-question.component.tsx";

interface QuizQuestionFormProps {
    quizzQuestions: QuizzQuestion[],
    setAnsweredQuestions?: Dispatch<SetStateAction<QuizzAnsweredQuestion[]>>
}

/**
 * Représente la liste des questions du quizz et les réponses associées
 */
const QuizQuestionsFormComponent: React.FC<QuizQuestionFormProps> = (props: QuizQuestionFormProps) => {

    /**
     * Ajoute la réponse à une question à la liste des réponses
     * Si la question a déjà été répondu, remplace l'ancienne réponse par la nouvelle
     * @param answeredQuestion question répondue
     */
    const addAnsweredQuestion = (answeredQuestion: QuizzAnsweredQuestion) => {
        if (props.setAnsweredQuestions) {
            props.setAnsweredQuestions(prevState => {
                let index = prevState.findIndex(prevAnsweredQuestion => prevAnsweredQuestion.question === answeredQuestion.question);
                if (index !== -1) {
                    // remplace l'ancienne réponse
                    prevState[index] = answeredQuestion;
                } else {
                    // Ajoute la nouvelle réponse à la liste des questions
                    prevState = [...prevState, answeredQuestion];
                }
                return prevState;
            })
        }
    }

    return <div style={{marginTop: "1rem"}}>
        {props.quizzQuestions.map(quizzQuestion =>
            <QuizzQuestionComponent
                key={quizzQuestion.question}
                quizzQuestion={quizzQuestion}
                quizFormMode={QuizzFormMode.QUESTION}
                onSelectedAnswer={(selectedAnswer: string) => addAnsweredQuestion({
                    question: quizzQuestion,
                    selected_answer: selectedAnswer
                })}
            />)
        }
    </div>
}

export default QuizQuestionsFormComponent;