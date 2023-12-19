import React, {useEffect, useState} from "react";
import {QuizzAnswerButtonState, QuizzFormMode} from "../model/quizz-model.ts";

interface QuizAnswerButtonProps {
    label: string
    state: QuizzAnswerButtonState,
    quizFormMode: QuizzFormMode
    onClick: () => void
}

/**
 * Représente un boutton de réponse du quizz
 */
const QuizAnswerButtonComponent: React.FC<QuizAnswerButtonProps> = (props: QuizAnswerButtonProps) => {

    const [classColor, setClassColor] = useState<string>("");

    useEffect(() => setClassColor(props.state), [props.state]);

    /**
     * Permet d'être en mode READONLY sur la page de résultat
     */
    const disablePointerEvents = () => props.quizFormMode === QuizzFormMode.RESULT ? "btn-disable" : "";

    return <button type="button" className={"btn " + classColor + " " + disablePointerEvents()} onClick={props.onClick}>
        {props.label}
    </button>
}

export default QuizAnswerButtonComponent;