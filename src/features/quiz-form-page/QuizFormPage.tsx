import { useState, useEffect, FormEvent } from 'react';
import { ChangeEvent } from "react";
import { createQuiz, Question } from '../../common/requests/quizRequest';
import { Category, fetchCategories } from '../../common/requests/categoriesRequest';
import { QuizForm } from './QuizForm';

interface Props {
   questions: Question[]
   onSubmit: (
      amount: number,
      difficulty: string | undefined,
      category: Category | undefined
   ) => void;
}

export const QuizFormPage = ({ onSubmit }: Props) => {
   const [categories, setCategories] = useState<Category[]>([]);
   const [isLoading, setIsLoading] = useState(false);

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
         <QuizForm categories={categories} submit={onSubmit} />
      </>
   );
}