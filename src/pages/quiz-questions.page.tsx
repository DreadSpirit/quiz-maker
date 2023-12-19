import React, {useEffect, useState} from "react";
import {QuizzAnsweredQuestion, QuizzQuestion} from "../model/quizz-model.ts";
import {useNavigate} from "react-router-dom";
import QuizQuestionsFormComponent from "../component/quiz-questions-form.component.tsx";
import QuizzSelectionComponent from "../component/quizz-selection.component.tsx";


/**
 * Représente la page affichant les questions du quizz
 */
const QuizQuestionsPage: React.FC = () => {

    const navigate = useNavigate();

    const [quizzQuestions, setQuizzQuestions] = useState<QuizzQuestion[]>([]);
    const [answeredQuestions, setAnsweredQuestions] = useState<QuizzAnsweredQuestion[]>([])

    const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);

    useEffect(() => {
        setIsAllQuestionsAnswered(quizzQuestions.length !== 0 && (answeredQuestions.length === quizzQuestions.length))
    }, [quizzQuestions, answeredQuestions]);

    const submitQuizz = () => {
        navigate("/result", {state: answeredQuestions});
    }

    return (
        <div className="container">
            <div className="row">
                <h1>QUIZ MAKER</h1>
            </div>
            <QuizzSelectionComponent setQuizzQuestions={setQuizzQuestions}/>
            <div className="row m-3">
                {quizzQuestions &&
                    <QuizQuestionsFormComponent quizzQuestions={quizzQuestions}
                                                setAnsweredQuestions={setAnsweredQuestions}/>
                }
            </div>
            {
                isAllQuestionsAnswered &&
                <div className="row">
                    <button type="button" className="btn btn-secondary" onClick={() => submitQuizz()}>Submit
                    </button>
                </div>
            }
        </div>
    )
}

export default QuizQuestionsPage;