import './App.css'
import {Route, Routes} from "react-router-dom";
import QuizQuestionsPage from "./pages/quiz-questions.page.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizResultPage from "./pages/quiz-result.page.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<QuizQuestionsPage/>}/>
            <Route path="/result" element={<QuizResultPage/>}/>
        </Routes>

    )
}

export default App
