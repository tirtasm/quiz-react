import React, { useState, useEffect } from "react";
import axios from "axios";

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 2 minutes
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10"
        );
        const cleanedQuestions = response.data.results.map((question) => ({
          ...question,
          question: decodeHtmlEntities(question.question),
          correct_answer: decodeHtmlEntities(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(decodeHtmlEntities),
        }));
        setQuestions(cleanedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsQuizFinished(true);
      return;
    }

    if (!isPaused) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isPaused]);

  const handleAnswerSelect = (answer) => {
    if (questions.length === 0 || isQuizFinished || isPaused) return;

    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (answer === correctAnswer) {
      setScore(score + 1);
    }

    setSelectedAnswer("");
    setAnsweredQuestions((prev) => prev + 1);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex + 1 >= questions.length) {
      setIsQuizFinished(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const calculateIncorrectAnswers = () => {
    return answeredQuestions - score;
  };

  if (questions.length === 0) {
    return (
      <div role="status" className="flex items-center justify-center h-screen bg-blue-100">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="flex flex-col items-center justify-center bg-blue-100 h-screen p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Quiz Complete!</h1>
          <div className="bg-blue-200 p-4 rounded-lg mb-6">
            <p className="text-xl font-semibold">
              Your score:
            </p>
            <span className="text-3xl font-bold text-blue-700">{score} / {questions.length}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-200 p-4 rounded-lg">
              <p className="text-lg font-semibold text-green-700">Correct Answers</p>
              <p className="text-xl font-bold text-green-700">{score}</p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg">
              <p className="text-lg font-semibold text-red-700">Incorrect Answers</p>
              <p className="text-xl font-bold text-red-700">{calculateIncorrectAnswers()}</p>
            </div>
            <div className="bg-yellow-200 p-4 rounded-lg col-span-2">
              <p className="text-lg font-semibold text-yellow-700">Total Questions Answered</p>
              <p className="text-xl font-bold text-yellow-700">{answeredQuestions}</p>
            </div>
          </div>
          <div className="flex flex-col px-16">
            <button
              onClick={() => window.location.reload()}
              className="mt-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Start Over
            </button>
            <a href="/" className="mt-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300 transform hover:scale-105">
              <button>
                Exit
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-blue-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Quiz App</h1>
      </div>
      <div className="bg-white p-8 px-12 rounded shadow-md">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold text-blue-700">
            Question {currentQuestionIndex + 1} / {questions.length}
          </h2>
          <p className="text-lg font-semibold text-blue-600">Time Left: {formatTime(timer)}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg flex-col flex">{question.question}</p>
        </div>
        <div className="space-y-2">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              className={`w-full p-2 rounded border transition-colors ${selectedAnswer === answer ? 'bg-blue-500 text-white' : 'bg-blue-100 hover:bg-blue-300'} ${isPaused ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={isPaused}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="py-2 px-16 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 transition duration-300"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
