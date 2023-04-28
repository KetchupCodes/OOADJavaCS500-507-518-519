import React, { useState } from 'react';

const QuizSection = ({ quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    const isAnswerCorrect =
      selectedAnswer === quizData[currentQuestionIndex].correctAnswer;
    if (isAnswerCorrect) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const renderOptions = () => {
    const { A, B, C, D } = quizData[currentQuestionIndex];
    return (
      <div className="options-container">
        <div
          className={`option ${
            selectedAnswer === 'A' ? 'selected' : ''
          }`}
          onClick={() => handleOptionSelect('A')}
        >
          <span className="option-letter">A.</span>
          <span className="option-text">{A}</span>
        </div>
        <div
          className={`option ${
            selectedAnswer === 'B' ? 'selected' : ''
          }`}
          onClick={() => handleOptionSelect('B')}
        >
          <span className="option-letter">B.</span>
          <span className="option-text">{B}</span>
        </div>
        <div
          className={`option ${
            selectedAnswer === 'C' ? 'selected' : ''
          }`}
          onClick={() => handleOptionSelect('C')}
        >
          <span className="option-letter">C.</span>
          <span className="option-text">{C}</span>
        </div>
        <div
          className={`option ${
            selectedAnswer === 'D' ? 'selected' : ''
          }`}
          onClick={() => handleOptionSelect('D')}
        >
          <span className="option-letter">D.</span>
          <span className="option-text">{D}</span>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    return (
      <div className="quiz-container">
        <div className="question-container">
          <span className="question">{currentQuestion.question}</span>
        </div>
        {renderOptions()}
        <button
          className="next-button"
          disabled={!selectedAnswer}
          onClick={handleNextQuestion}
        >
          Next
        </button>
      </div>
    );
  };

  const renderScore = () => {
    return (
      <div className="score-container">
        <span className="score-text">
          You got {correctAnswersCount} out of {quizData.length} questions
          right.
        </span>
      </div>
    );
  };

  return (
    <div className="quiz-section">
      {currentQuestionIndex < quizData.length
        ? renderQuiz()
        : renderScore()}
    </div>
  );
};

export default QuizSection;
