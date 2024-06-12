import { useEffect } from "react";
import { useState } from "react";

function Quiz() {
  const [question, setQuestion] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  async function fetchData() {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    let results = await response.json();
    if (results.response_code === 0) {
      setQuestion(results.results);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function correctAnswer(e,check) {
    // this will only work when the click button have matches the correct answer then we have to increment the score
    if (check) {
      setScore(score + 1);
    }
    // for overflow condition and wrong answer because we only have 10 index in question array 
    if (index <= 9) {
      setIndex(index + 1);
    }
  }


  return (
    <>
      <div className="quiz-container">
        <h1>Quiz App</h1>
        {index <= 9 ? (
          <div className="question-container">
            {question.length === 0 ? (
              <div className="loader"></div>
            ) : (
              <div>
                <h2>Question {index + 1}</h2>

                <p className="ques">
                   {question[index].question}
                </p>

                <ol>
                  {question[index].incorrect_answers.map((option,index)=>{
                    return <li key={index}><button onClick={(e)=>{correctAnswer(e,false)}}>{option}</button></li>
                  })}
                  <li><button onClick={(e)=>{correctAnswer(e,true)}}>{question[index].correct_answer}</button></li>
                </ol>

                <p className="timer">Time left : <span>{1}</span> sec</p>
                <button className="skip" onClick={()=>setIndex(index + 1)}>skip Question</button>

              </div>
            )}
          </div>
        ) : (
          <div className="result-container">
            <h3>Quiz is Over</h3>
            <p>Your Score is <span>{score} / 10</span></p>
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;
