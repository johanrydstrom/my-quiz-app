import { useState, FormEvent, ChangeEvent } from 'react';
import { Category } from '../../common/requests/categoriesRequest';
import { Question, createQuiz } from '../../common/requests/quizRequest';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { Input } from '../../components/Input';
import styles from './QuizForm.module.css';

interface Props {
   categories: Category[]
}

const difficultyOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

export const QuizForm = (props: Props) => {


   const [value, setValue] = useState("");
   const [difficultyLevel, setDifficultyLevel] = useState("")
   const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<Category>()

   const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
   }
   const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDifficultyLevel(event.target.value);
   }
   const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedNameOfCategory = event.target.value;
      const selectedCategory = props.categories.find(category => category.name === selectedNameOfCategory)
      setSelectedCategory(selectedCategory);
   }

   const onSubmit = async (event: FormEvent) => {
      event.preventDefault();
      const quiz = await createQuiz(value, difficultyLevel, selectedCategory)
      setQuizQuestions(quiz)
   }


   return (
      <form id="quizForm" onSubmit={onSubmit} className={styles.form}>
         <div>Input value is {value}</div>
         <Input label="Amount" onChange={inputChange} />
         <Dropdown
            label="Difficulty level"
            options={difficultyOptions}
            onChange={onDropdownChange} />
         <Dropdown
            label="Category"
            options={props.categories.map(category => category.name)}
            onChange={onCategoryChange} />
         <Button type="submit">Submit</Button>
      </form>
   );



}

