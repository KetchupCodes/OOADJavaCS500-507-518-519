import React, { useState } from "react";

const MCQList = ({ quizData }) => {
  const [userAnswers, setUserAnswers] = useState({0:"",1:"",2:"",3:"",4:""});

  const handleChange = (e, q) => {

    console.log(e.target.value)
    console.log(e.target.name)
    console.log(e.key)
    console.log({...userAnswers})
    const s = JSON.stringify(e.target.name)
    setUserAnswers( {...userAnswers,  1: e.target.value });
  };

  const handleSubmit = () => {
    let score = 0;
  
    quizData.forEach((item, index) => {
      const userAnswer = userAnswers[index];
      const correctAnswer = item.correctAnswer;
      
      if (userAnswer === correctAnswer) {
        score++;
      } else {
        alert(
          `Question ${index + 1}: ${item.question}\nCorrect Answer: ${
            item.correctAnswer
          }: ${item[item.correctAnswer]}`
        );
      }
    });
    document.getElementsByClassName("NotOver")[0].style.display = "none";
    document.getElementsByClassName("Over")[0].style.display = "block";
    
  };
  

  return (
    <div>
      <div className="NotOver">
      {quizData.map((item, index) => (
        <div key={index} className="mcq-item">
          <h3>{item.question}</h3>
          {["A", "B", "C", "D"].map((option) => (
            <div key={option}>
              <input
                type="radio"
                name={item.question}
                value={option}
                onChange={(e) => handleChange(e, item.question)}
              />
              <label htmlFor={option}>{option}: {item[option]}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </div>
    <div className="Over" style={{display:"none"}}><h1>Thanks For Playing !</h1></div>
    </div>
    
  );
};

export default MCQList;
