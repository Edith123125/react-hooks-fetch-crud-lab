import React, { useState } from "react";

function QuestionItem({ question, deleteQuestion, updateCorrectAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const [selectedIndex, setSelectedIndex] = useState(correctIndex);

  // Changing the correct answer
  const handleChange = (event) => {
    const newIndex = parseInt(event.target.value);
    setSelectedIndex(newIndex);
    updateCorrectAnswer(id, newIndex); 
  };

  // deleting the question
  const handleDelete = () => {
    deleteQuestion(id); 
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedIndex} onChange={handleChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
