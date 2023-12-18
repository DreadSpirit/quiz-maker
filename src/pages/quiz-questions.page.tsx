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

    const [questions, setQuestions] = useState<QuizzQuestion[]>([]);
    const [answeredQuestions, setAnsweredQuestions] = useState<QuizzAnsweredQuestion[]>([])

    const [isAllQuestionsAnswered, setIsAllQuestionsAnswered] = useState(false);

    useEffect(() => {
        setIsAllQuestionsAnswered(questions.length !== 0 && (answeredQuestions.length === questions.length))
    }, [questions, answeredQuestions]);

    const submitQuizz = () => {
        navigate("/result", {state: answeredQuestions});
    }

    return (
        <div className="container">
            <div className="row">
                <h1>QUIZ MAKER</h1>
            </div>
            <QuizzSelectionComponent setQuestions={setQuestions}/>
            <div className="row m-3">
                {questions &&
                    <QuizQuestionsFormComponent quizzQuestions={questions}
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