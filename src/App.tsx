import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import QuizQuestionsPage from "./pages/quiz-questions.page.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizResultPage from "./pages/quiz-result.page.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<QuizQuestionsPage/>}/>
                <Route path="/result" element={<QuizResultPage/>}/>
            </Routes>
        </HashRouter>
    )
}

export default App
