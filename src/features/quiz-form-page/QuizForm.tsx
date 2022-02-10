import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Category } from '../../common/requests/categoriesRequest';
import { Question, createQuiz } from '../../common/requests/quizRequest';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { Input } from '../../components/Input';
import styles from './QuizForm.module.css';

interface Props {
   categories: Category[]
   submit: (
      amount: number,
      difficulty: string | undefined,
      category: Category | undefined
   ) => void;
}

const difficultyOptions = ["Any difficulty", "Easy", "Medium", "Hard"];

export const QuizForm = ({ categories, submit }: Props) => {

   const [amount, setAmount] = useState(0);
   const [difficultyLevel, setDifficultyLevel] = useState("")
   const [selectedCategory, setSelectedCategory] = useState<Category>()

   const inputChange = (inputValue: number) => {
      setAmount(inputValue);
   }
   const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setDifficultyLevel(event.target.value);
   }
   const onCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedNameOfCategory = event.target.value;
      const selectedCategory = categories.find(category => category.name === selectedNameOfCategory)
      setSelectedCategory(selectedCategory);
   }

   const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      submit(amount, difficultyLevel, selectedCategory)
   }
   return (
      <form id="quizForm" onSubmit={onSubmit} className={styles.form}>
         <div>Input value is {amount}</div>
         <Input label="Amount" onInputChange={inputChange} />
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
   );



}

