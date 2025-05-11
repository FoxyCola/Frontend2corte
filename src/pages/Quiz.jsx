import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Guarda respuestas seleccionadas

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/quiz/${topic}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, [topic]);

  const handleSelect = (questionIndex, option) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  // Esta es la función que manejaba la solicitud adicional a backend,
  // ahora la cambiamos para pasar las preguntas que ya tenemos.
  const handleSubmit = () => {
    navigate('/resultado', {
      state: {
        result: {
          topic,
          answers,
          questions,  // Pasa las preguntas directamente desde el estado
          date: new Date().toISOString()
        }
      }
    });
  };

  return (
    <div style={{ backgroundColor: '#add8e6', minHeight: '100vh', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Cuestionario sobre {topic}</h2>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>
          <p>{q.question}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(index, option)}
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: answers[index] === option ? '#4caf50' : '#fff',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{
          display: 'block',
          margin: '2rem auto',
          padding: '12px 24px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Enviar respuestas
      </button>
    </div>
  );
}

export default Quiz;
