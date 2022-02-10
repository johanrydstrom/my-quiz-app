import { useState } from "react";
import { moveMessagePortToContext } from "worker_threads";
import { Answer, Question } from "../../common/requests/quizRequest";
import { Button } from "../../components/Button";
import { QuestionHandler } from "./QuestionHandler";
import styles from "./QuestionHandler.module.css";

interface Props {
   questions: Question[]
}

interface UserAnswer {
   questionText: string;
   answer: Answer
}
export const QuizPage = ({ questions }: Props) => {
   const [answers, setAnswers] = useState<UserAnswer[]>([])
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

   const onAnswer = (answer: Answer) => {
      setAnswers([...answers, { questionText: questions[currentQuestionIndex].question, answer }])
      console.log("Got answer " + answer.answer)
   }
   const moveToNext = () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
   }

   return (
      <div id="quizPage">
         <h1>Quiz Page</h1>
         <QuestionHandler
            question={questions[currentQuestionIndex]}
            onClick={onAnswer}
            userAnswer={answers[currentQuestionIndex]?.answer}
         />
         <Button
            disabled={answers[currentQuestionIndex] === undefined}
            onClick={() => moveToNext()}>Next question</Button>
      </div>
   );
};