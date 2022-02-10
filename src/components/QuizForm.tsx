import { Input } from './Input';
import { useState, useEffect, FormEvent } from 'react';
import { Dropdown } from './Dropdown';
import { ChangeEvent } from "react";
import { createQuiz, Question } from '../common/requests/quizRequest';
import { Category, fetchCategories } from '../common/requests/categoriesRequest';
import styles from "./QuizFormPage.module.css";
import { Button } from './Button';
export const QuizFormPage = () => {

   const difficultyOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

   const [value, setValue] = useState("");
   const [difficultyLevel, setDifficultyLevel] = useState("")
   const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
   const [categories, setCategories] = useState<Category[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<Category>()
   const [isLoading, setIsLoading] = useState(false);


   const inputChange = (value: string) => {
      setValue(value);
   }
   const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDifficultyLevel(event.target.value);
   }
   const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedNameOfCategory = event.target.value;
      const selectedCategory = categories.find(category => category.name === selectedNameOfCategory)
      setSelectedCategory(selectedCategory);
   }

   const onSubmit = async (event: FormEvent) => {
      event.preventDefault();
      const quiz = await createQuiz(value, difficultyLevel, selectedCategory)
      setQuizQuestions(quiz)
   }

   useEffect(() => {
      const fetch = async () => {
         const categoryResponse = await fetchCategories();
         setCategories(categoryResponse);
         setIsLoading(false);
      }
      fetch()
   }, []);
   return (
      <>
         <h1>Quiz Form</h1>

         {isLoading}
         <form id="quizForm" onSubmit={onSubmit} className={styles.form}>
            <div>Input value is {value}</div>
            <Input onInputChange={inputChange} />
            <Dropdown
               label="Difficulty level"
               options={difficultyOptions}
               onChange={onDropdownChange} />
            <Dropdown
               label="Category"
               options={categories.map(category => category.name)}
               onChange={onCategoryChange} />
            <Button type="submit">Submit</Button>
         </form>
      </>
   );
}