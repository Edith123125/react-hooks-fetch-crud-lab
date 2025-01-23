import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetching all questions 
  useEffect(() => {
    let isMounted = true; 

    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setQuestions(data); 
        }
      })
      .catch(error => console.error('Error fetching questions:', error));

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); 

  // Add a new question
  const addQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => {
        setQuestions(prevQuestions => [...prevQuestions, data]); // Add the new question to the list
      })
      .catch(error => console.error('Error adding question:', error));
  };

  // Delete a question
  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: 'DELETE' })
      .then(() => {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id)); // Remove the deleted question from the list
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  // Update the correct answer of a question
  const updateCorrectAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex }),
    })
      .then(response => response.json())
      .then(updatedQuestion => {
        setQuestions(prevQuestions =>
          prevQuestions.map(question =>
            question.id === id ? updatedQuestion : question
          )
        );
      })
      .catch(error => console.error('Error updating correct answer:', error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          deleteQuestion={deleteQuestion}
          updateCorrectAnswer={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
