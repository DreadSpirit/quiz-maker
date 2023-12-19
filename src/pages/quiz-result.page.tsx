import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {QuizzAnsweredQuestion} from "../model/quizz-model.ts";
import QuizResultFormComponent from "../component/quiz-result-form.component.tsx";

/**
 * Représente la page affichant les réponses du quizz précedemment répondu
 */
const QuizResultPage: React.FC = () => {
    const {state} = useLocation();
    const navigate = useNavigate();

    const startNewQuizz = () => navigate("/");

    const [answeredQuestions, setAnsweredQuestions] = useState<QuizzAnsweredQuestion[]>([]);

    useEffect(() => {
        if (!state) {
            // Empêche d'accéder à cette page si aucun quizz n'a été répondu
            startNewQuizz();
        }
        setAnsweredQuestions(state);
    }, [state]);


    const quizzScore = useMemo(() =>
        answeredQuestions.filter(answeredQuestion =>
            answeredQuestion.selected_answer === answeredQuestion.question.correct_answer).length, [answeredQuestions]);


    const colorFromQuizzScore = () => {
        if (quizzScore < 2) {
            return "background-red"
        } else if (quizzScore < 4) {
            return "background-yellow"
        } else {
            return "background-green"
        }
    };


    return <>
        <h1>Result !</h1>
        <QuizResultFormComponent answeredQuestions={answeredQuestions}/>
        <div className="row justify-content-center">
            <div className={`col-md-4 ${colorFromQuizzScore()}`}>
                You scored {quizzScore} out of {answeredQuestions.length}</div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6 display-2">
                <button type="button" className="btn btn-secondary btn-lg" onClick={() => startNewQuizz()}>
                    Create a new quizz
                </button>
            </div>

        </div>
    </>

}

export default QuizResultPage;