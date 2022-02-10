import { Category } from "./categoriesRequest";

export type Answer = {
  isCorrectAnswer: boolean;
  answer: string;
  index: number;
};

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: Answer[];
};

interface ApiQuizResponse {
  responseCode: number;
  results: Array<{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }>;
}

const shuffleArray = (currentQuestions: Answer[]) => {
  return currentQuestions
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }, index) => ({ ...value, index }));
};

function decodeEntities(encodedString: string): string {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  return textArea.value;
}

const mapToQuestions = (responseJson: ApiQuizResponse): Question[] => {
  return responseJson.results.map((result) => {
    const answers = result.incorrect_answers.map((answer, index) => ({
      answer: decodeEntities(answer),
      isCorrectAnswer: false,
      index,
    }));
    answers.push({
      isCorrectAnswer: true,
      answer: decodeEntities(result.correct_answer),
      index: answers.length,
    });
    return {
      ...result,
      answers: shuffleArray(answers),
      question: decodeEntities(result.question),
    };
  });
};

export const createQuiz = async (
  amount: number,
  difficulty: string | undefined,
  category: Category | undefined
) => {
  let url = `https://opentdb.com/api.php?amount=${amount}`;
  if (difficulty) {
    url += `&difficulty=${difficulty.toLocaleLowerCase()}`;
  }
  if (category) {
    url += `&category=${category.id}`;
  }
  const response = await fetch(url);
  const responseJson: ApiQuizResponse = await response.json();
  if (responseJson.responseCode > 0) {
    throw new Error("Invalid request");
  }

  return Promise.resolve(mapToQuestions(responseJson));
};
