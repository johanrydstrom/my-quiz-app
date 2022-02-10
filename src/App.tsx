import { FormEvent, useState } from 'react';
import './App.css';
import { Category } from './common/requests/categoriesRequest';
import { createQuiz, Question } from './common/requests/quizRequest';
import { QuizFormPage } from './features/quiz-form-page/QuizFormPage';
import { QuizPage } from './features/quiz-page/QuizPage';

export default function App() {

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  const fetchQuestions = function (questions: Question[]) {
    setQuizQuestions(questions);
  }

  const fetchQuiz = async (
    amount: number,
    difficulty: string | undefined,
    category: Category | undefined
  ) => {
    const quiz = await createQuiz(amount, difficulty, category)
    setQuizQuestions(quiz)
  }


  return (
    <div className='App'>
      {quizQuestions.length === 0 ? (
        <QuizFormPage questions={quizQuestions} onSubmit={fetchQuiz} />
      ) : (
        <QuizPage questions={quizQuestions} />
      )}
    </div>
  );
}