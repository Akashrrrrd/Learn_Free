import React, { useState } from "react";
import "./Quiz.css";
import logo from "../../assets/logo.png";
import questionsData from "../../pages/questionsData";
import coursesData from "../../pages/coursesData";

const Quiz = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleCourseSelect = (title) => {
    setSelectedCourse(title);
    const questionsFetched = questionsData[title] || [];
    setQuestions(questionsFetched);
    setUserAnswers(Array(questionsFetched.length).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedOption;
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const calculatedScore = userAnswers.reduce((total, answer, index) => {
      return answer === questions[index].answer ? total + 1 : total;
    }, 0);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  return (
    <div className="qz-quiz-container">
      <header className="qz-quiz-header">
        <img src={logo} className="qz-quiz-logo" alt="Quiz Logo" />
        <h1>
          <span>LearnFree</span> Quiz Platform
        </h1>
      </header>
      {!selectedCourse ? (
        <div className="qz-course-selection">
          <h2>Select a Course</h2>
          <div className="qz-course-list">
            {coursesData.map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseSelect(course.title)}
                className="qz-course-button"
              >
                {course.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="qz-quiz-content">
          <h2>{selectedCourse}</h2>
          {questions.map((question, index) => (
            <div key={index} className="qz-question-card">
              <p className="qz-question-text">{question.question}</p>
              <div className="qz-options-list">
                {question.options.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="qz-option-label"
                    htmlFor={`question-${index}-option-${optionIndex}`}
                  >
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      value={optionIndex}
                      checked={userAnswers[index] === optionIndex}
                      onChange={() => handleAnswerSelect(index, optionIndex)}
                      disabled={submitted}
                    />
                    <span className="qz-option-text">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted ? (
            <button onClick={handleSubmit} className="qz-submit-button">
              Submit Quiz
            </button>
          ) : (
            <div className="qz-results">
              <h3>Quiz Results</h3>
              <p>
                Your Score: {score} out of {questions.length}
              </p>
              <button
                onClick={() => setSelectedCourse(null)}
                className="qz-new-quiz-button"
              >
                Take Another Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
