import {QuizzCategory, QuizzDifficulty, QuizzQuestion} from "../model/quizz-model.ts";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import get, {AxiosResponse} from "axios";

interface QuizzSelectionProps {
    setQuestions: Dispatch<SetStateAction<QuizzQuestion[]>>
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


    const [selectedDifficulty, setSelectedDifficulty] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>()


    // Fetch categories
    useEffect(() => {
        get(categoriesUrl)
            .then((response: AxiosResponse<{
                trivia_categories: QuizzCategory[]
            }>) => setCategories(response.data.trivia_categories))
            .catch(reason => console.log(reason));
    }, [categoriesUrl])

    const fetchQuestionList = () => {
        get(`${openTdbBaseUrl}/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
            .then((response: AxiosResponse<{ results: QuizzQuestion[] }>) => props.setQuestions(response.data.results))
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
                    onClick={() => fetchQuestionList()}
            >Create
            </button>
        </div>
    </div>
}

export default QuizzSelectionComponent;