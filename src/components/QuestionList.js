import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ deleteQuestion, updateCorrectAnswer }) {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // Handle deleting a question
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Remove the deleted question from the state
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  // Handle updating the correct answer
  const handleUpdateCorrectAnswer = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        // Update the question in the state with the new correct answer
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === updatedQuestion.id
              ? { ...question, correctIndex: updatedQuestion.correctIndex }
              : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            deleteQuestion={handleDelete}
            updateCorrectAnswer={handleUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
