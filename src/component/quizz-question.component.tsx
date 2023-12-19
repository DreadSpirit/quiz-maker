import React, {useEffect, useState} from "react";
import QuizAnswerButtonComponent from "./quiz-answer-button.component.tsx";
import {QuizzAnswerButtonState, QuizzFormMode, QuizzQuestion} from "../model/quizz-model.ts";

interface QuestionQuizzProps {
    quizzQuestion: QuizzQuestion,
    onSelectedAnswer?: (selectedAnswer: string) => void,
    defaultSelectedAnswer?: string
    quizFormMode: QuizzFormMode
}

/**
 * Représente un boutton de réponse du quizz
 */
const QuizzQuestionComponent: React.FC<QuestionQuizzProps> = (props: QuestionQuizzProps) => {

    const [answers, setAnswers] = useState<string[]>();
    const [selectedAnswer, setSelectedAnswer] = useState<string>(props.defaultSelectedAnswer ?? "");
    const onSelectedAnswer = (answer: string) => {
        if (props.quizFormMode === QuizzFormMode.QUESTION && props.onSelectedAnswer) {
            setSelectedAnswer(answer)
            props.onSelectedAnswer(answer);
        }
    }

    const isTheSelectedAnswer = (answer: string) => answer === selectedAnswer;
    const isTheCorrectAnswer = (answer: string) => answer === props.quizzQuestion.correct_answer;
    const isABadAnswer = (answer: string) => answer === selectedAnswer && selectedAnswer !== props.quizzQuestion.correct_answer;

    const isInResultMode = () => props.quizFormMode === QuizzFormMode.RESULT;

    /**
     * Calcule l'état de la réponse pour déterminer la couleur à afficher
     * @param answer libellé de la réponse
     */
    const calcAnswerState = (answer: string): QuizzAnswerButtonState => {
        if (isInResultMode() && isABadAnswer(answer)) {
            return QuizzAnswerButtonState.BAD_ANSWER;
        } else if (isTheSelectedAnswer(answer) || (isInResultMode() && isTheCorrectAnswer(answer))) {
            return QuizzAnswerButtonState.SELECTED;
        }
        return QuizzAnswerButtonState.UNSELECTED;
    }

    /**
     * Mélange les réponses dans un ordre aléatoir
     * @param array
     */
    const shuffleAnswers = (array: string[]) =>
        array.map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)

    /**
     *
     */
    useEffect(() => {
        let mergedAnswers = [props.quizzQuestion.correct_answer, ...props.quizzQuestion.incorrect_answers];
        if (props.quizFormMode === QuizzFormMode.QUESTION) {
            mergedAnswers = shuffleAnswers(mergedAnswers);
        }
        setAnswers(mergedAnswers);
    }, [props.quizzQuestion.correct_answer, props.quizzQuestion.incorrect_answers])

    return <div className="row" style={{marginTop: "1.5rem"}}>
        <div className="d-flex justify-content-start">
            {props.quizzQuestion.question}
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