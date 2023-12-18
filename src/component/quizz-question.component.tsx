import React, {useEffect, useState} from "react";
import QuizAnswerButtonComponent from "./quiz-answer-button.component.tsx";
import {QuizzAnswerButtonState, QuizzFormMode} from "../model/quizz-model.ts";

interface QuestionQuizzProps {
    question: string
    correctAnswer: string,
    incorrectAnswers: string[],
    onSelectedAnswer?: (selectedAnswer: string) => void,
    selectedAnswer?: string
    quizFormMode: QuizzFormMode
}
/**
 * Représente un boutton de réponse du quizz
 */
const QuizzQuestionComponent: React.FC<QuestionQuizzProps> = (props: QuestionQuizzProps) => {

    const [answers, setAnswers] = useState<string[]>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>(props.selectedAnswer ?? "");
    const onSelectedAnswer = (answer: string) => {
        if (props.quizFormMode === QuizzFormMode.QUESTION && props.onSelectedAnswer) {
            setSelectedAnswer(answer)
            props.onSelectedAnswer(answer);
        }

    }

    const calcAnswerState = (answer: string): QuizzAnswerButtonState => {
        if (props.quizFormMode === QuizzFormMode.QUESTION) {
            if (answer === selectedAnswer) {
                return QuizzAnswerButtonState.SELECTED;
            } else {
                return QuizzAnswerButtonState.UNSELECTED;
            }
        } else if (answer === props.correctAnswer) {
            return QuizzAnswerButtonState.SELECTED;
        } else if (answer === selectedAnswer && selectedAnswer !== props.correctAnswer) {
            return QuizzAnswerButtonState.BAD_ANSWER;
        } else {
            return QuizzAnswerButtonState.UNSELECTED;
        }
    }

    const shuffleAnswers = (array: string[]) =>
        array.map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)

    useEffect(() => {
        if (props.quizFormMode === QuizzFormMode.QUESTION) {
            setAnswers(shuffleAnswers([props.correctAnswer, ...props.incorrectAnswers]));
        } else {
            setAnswers([props.correctAnswer, ...props.incorrectAnswers]);
        }
    }, [props.correctAnswer, props.incorrectAnswers])

    return <div className="row" style={{marginTop: "1.5rem"}}>
        <div className="d-flex justify-content-start">
            {props.question}
        </div>
        <div className="row">
            <div className="d-flex justify-content-start">
                {
                    answers?.map(((answer) =>
                            <div key={answer} className="form-check m-2">
                                <QuizAnswerButtonComponent key={answer} label={answer}
                                                           state={calcAnswerState(answer)}
                                                           quizFormMode={props.quizFormMode}
                                                           onClick={() => onSelectedAnswer(answer)}/>
                            </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export default QuizzQuestionComponent;