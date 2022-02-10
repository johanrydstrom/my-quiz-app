import clsx from "clsx";
import { Answer, Question } from "../../common/requests/quizRequest";
import styles from "./QuestionHandler.module.css";


interface Props {
   question: Question;
   userAnswer: Answer | undefined;
   onClick: (answer: Answer) => void;
}

export const QuestionHandler = ({ question, userAnswer, onClick }: Props) => {
   return (
      <div id="quizPage">
         <h2>{question.question}</h2>
         <div id="answers" className={styles.answerContainer}>
            {question.answers.map((answer, index) =>
               <button
                  key={answer.index}
                  disabled={userAnswer !== undefined}
                  className={clsx([
                     styles.answer,
                     userAnswer?.index === index && styles.selectedAnswers,
                     userAnswer?.isCorrectAnswer && styles.correctAnswer,
                     userAnswer &&
                     !(userAnswer?.isCorrectAnswer) &&
                     userAnswer?.index === index &&
                     styles.wrongAnswer,
                  ])}
                  onClick={() => onClick(answer)}>
                  <span className={styles.index}>{index + 1}</span>
                  <span className={styles.answerText}>{answer.answer}</span>
               </button>
            )
            }
         </div>
      </div>
   );
};