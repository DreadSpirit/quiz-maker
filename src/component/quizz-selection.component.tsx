import {QuizzCategory, QuizzDifficulty, QuizzQuestion, QuizzQuestionApiResponse} from "../model/quizz-model.ts";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import get, {AxiosResponse} from "axios";

interface QuizzSelectionProps {
    setQuizzQuestions: Dispatch<SetStateAction<QuizzQuestion[]>>
}

/**
 * Représente le forumulaire de sélection du quizz
 */
const QuizzSelectionComponent: React.FC<QuizzSelectionProps> = (props: QuizzSelectionProps) => {

    const openTdbBaseUrl = "https://opentdb.com"
    const categoriesUrl = `${openTdbBaseUrl}/api_category.php`;

    const [categories, setCategories] = useState<QuizzCategory[]>([]);
    const difficulties: QuizzDifficulty[] = [
        {id: "easy", label: "Easy"},
        {id: "medium", label: "Medium"},
        {id: "hard", label: "Hard"}
    ]


    const [formCompleted, setFormCompleted] = useState(false);

    const [selectedDifficulty, setSelectedDifficulty] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>()


    /**
     * Récuperation des catégories
     */
    useEffect(() => {
        get(categoriesUrl)
            .then((response: AxiosResponse<{
                trivia_categories: QuizzCategory[]
            }>) => setCategories(response.data.trivia_categories))
            .catch(reason => console.log(reason));
    }, [categoriesUrl]);

    useEffect(() => {
        setFormCompleted(selectedCategory !== undefined && selectedDifficulty !== undefined);
    }, [selectedDifficulty, selectedCategory]);


    /**
     * Map les réponses de l'API en QuizzQuestion
     * @param quizzQuestionApiResponse Les questions du quizz renvoyées par l'API
     */
    const mapQuizzQuestionsFromApiResponse = (quizzQuestionApiResponse: QuizzQuestionApiResponse[]) =>
        props.setQuizzQuestions(quizzQuestionApiResponse.map(el => {
            const quizzQuestion: QuizzQuestion = {
                category: el.category,
                type: el.type,
                difficulty: el.difficulty,
                question: el.question,
                correctAnswer: el.correct_answer,
                incorrectAnswers: el.incorrect_answers,
                shuffledAnswers: shuffleAnswers([el.correct_answer, ...el.incorrect_answers])
            };
            return quizzQuestion;
        }))

    /**
     * Mélange les réponses dans un ordre aléatoire
     * @param array
     */
    const shuffleAnswers = (array: string[]) =>
        array.map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value)

    /**
     * Récuperation de la liste des questions
     */
    const fetchQuestionList = () => {
        get(`${openTdbBaseUrl}/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
            .then((response: AxiosResponse<{
                results: QuizzQuestionApiResponse[]
            }>) => mapQuizzQuestionsFromApiResponse(response.data.results))
            .catch(reason => {
                console.log(reason);
            });
    }

    return <div className="row g-0 m-3">
        <div className="col-md-3">
            <Form.Select id="categoySelect"
                         value={selectedCategory}
                         onChange={event => setSelectedCategory(event.currentTarget.value)}
            >
                <option hidden>Select a category</option>
                {categories.map(category => <option key={category.id}
                                                    value={category.id}>{category.name}</option>)}
            </Form.Select>
        </div>
        <div className="col-md-3">
            <Form.Select id="difficultySelect"
                         value={selectedDifficulty}
                         onChange={event => setSelectedDifficulty(event.currentTarget.value)}
            >
                <option hidden>Open this select menu</option>
                {difficulties.map(difficulty => <option key={difficulty.id}
                                                        value={difficulty.id}>{difficulty.label}</option>)}
            </Form.Select>
        </div>
        <div className="col-md-1 ">
            <button id="createBtn" type="button" className="btn btn-primary"
                    disabled={!formCompleted}
                    onClick={fetchQuestionList}>
                Create
            </button>
        </div>
    </div>
}

export default QuizzSelectionComponent;