import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../initialTest.css';

const InitialTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('/api/test/questions', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();
      setQuestions(json);
    };
    if (user) {
      fetchQuestions();
    }
  }, [user]);

  const handleAnswer = (selectedOption) => {
    setAnswers([...answers, { questionId: questions[currentQuestionIndex]._id, selectedOption }]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmit = async () => {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(answers)
    };
    const response = await fetch('/api/test/submit/' + user.email, config);
    const json = await response.json();
    toast.success(`Your vocabulary level is: ${json.userLevel}`);
    setTimeout(() => {
      navigate('/select-pack');
    }, 2000); // Adjust the delay time as needed
  };

  return (
    <div className="test-container">
      <div className="progress-bar-test">
        <div 
          className="progress-test" 
          style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}>
        </div>
      </div>
      {currentQuestionIndex < questions.length ? (
        <div className="question-section">
          <h3>{questions[currentQuestionIndex].question}</h3>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button 
                className="option-button" 
                key={index} 
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button className="submit-button" onClick={handleSubmit}>Submit Test</button>
      )}
      <ToastContainer />
    </div>
  );
};

export default InitialTest;
