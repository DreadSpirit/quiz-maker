import React from "react";
import {QuizzAnsweredQuestion, QuizzFormMode} from "../model/quizz-model.ts";
import QuizzQuestionComponent from "./quizz-question.component.tsx";

interface QuizResultFormProps {
    answeredQuestions: QuizzAnsweredQuestion[]
}
/**
 * Représente les questions répondues du quizz
 */
const QuizResultFormComponent: React.FC<QuizResultFormProps> = (props: QuizResultFormProps) => {


    return <div>
        {props.answeredQuestions.map(answeredQuestion =>
            <div key={answeredQuestion.question.question} className="row m-3">
                <QuizzQuestionComponent
                    question={answeredQuestion.question.question}
                    quizFormMode={QuizzFormMode.RESULT}
                    correctAnswer={answeredQuestion.question.correct_answer}
                    incorrectAnswers={answeredQuestion.question.incorrect_answers}
                    selectedAnswer={answeredQuestion.selected_answer}
                />
            </div>)
        }
    </div>
}

export default QuizResultFormComponent;