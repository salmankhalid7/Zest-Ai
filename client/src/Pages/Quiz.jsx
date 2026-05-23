import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuiz = async () => {
    try {
      if (!id || id === "undefined") {
        setError("No document ID found in the URL.");
        return;
      }
      const res = await axios.post(`http://localhost:5000/api/quiz/${id}`);
      setQuiz(res.data.quiz);
    } catch (err) {
      setError("Failed to generate or fetch quiz data.");
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    const submitResult = async () => {
      if (!finished || !quiz) return;

      try {
        await axios.post("http://localhost:5000/api/quiz/attempt", {
          quizId: quiz._id,
          documentId: quiz.documentId || id,
          score,
          total: quiz.questions.length,
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    submitResult();
  }, [finished]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <h3 className="text-red-500 text-lg font-medium">{error}</h3>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <h3 className="text-green-700 text-lg font-medium animate-pulse">
          Loading quiz...
        </h3>
      </div>
    );
  }

  const questionsList = quiz.questions || [];

  if (questionsList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <h3 className="text-gray-600 text-lg">
          No questions found in this quiz set.
        </h3>
      </div>
    );
  }

  const currentQuestion = questionsList[index];

  const handleNext = () => {
    let newScore = score;

    if (selected === currentQuestion.correctAnswer) {
      newScore = score + 1;
      setScore(newScore);
    }

    setSelected("");

    if (index + 1 < questionsList.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  // 🎉 COMPLETED SCREEN
  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center border border-green-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Quiz Completed 🎉
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Great job! Here is your result.
          </p>

          <div className="text-4xl font-bold text-green-600 mb-6">
            {score}{" "}
            <span className="text-gray-400 text-2xl">/ {questionsList.length}</span>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // 🧠 QUIZ UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-8 border border-green-100">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-green-700 font-bold text-lg">
            AI Knowledge Quiz
          </h1>

          <span className="text-sm text-gray-500">
            {index + 1} / {questionsList.length}
          </span>
        </div>

        {/* QUESTION */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h2>

        {/* OPTIONS */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(opt)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition
                ${
                  selected === opt
                    ? "bg-green-100 border-green-500 text-green-800"
                    : "bg-white border-gray-200 hover:border-green-300"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full py-2 rounded-lg font-medium transition
            ${
              selected
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {index + 1 === questionsList.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;