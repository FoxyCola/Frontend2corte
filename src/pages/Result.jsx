import { useLocation } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const { result } = location.state || {};  // Obtener los datos de la ubicación

  if (!result || !result.questions || !Array.isArray(result.questions)) {
    return <p>No se encontraron datos válidos.</p>;  // Verifica que questions sea un arreglo
  }

  const { topic, answers, questions, date } = result;

  // Asegurémonos de que questions sea un arreglo
  if (!Array.isArray(questions)) {
    return <p>Error: Las preguntas no son un arreglo válido.</p>;
  }

  // Combinar las respuestas del usuario con las preguntas
  const combined = questions.map((q, index) => {
    const userAnswer = answers[index];
    return {
      ...q,
      userAnswer
    };
  });

  const correctCount = combined.filter(q => q.userAnswer === q.correctAnswer).length;
  const incorrectCount = combined.length - correctCount;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Resultado del cuestionario sobre {topic}</h2>
      <p><strong>Fecha:</strong> {new Date(date).toLocaleString()}</p>

      <h3>Resumen:</h3>
      <p>✅ Correctas: {correctCount}</p>
      <p>❌ Incorrectas: {incorrectCount}</p>

      <h3>Detalle por pregunta:</h3>
      <ul>
        {combined.map((q, i) => (
          <li key={i} style={{ marginBottom: '1rem' }}>
            <p><strong>Pregunta:</strong> {q.question}</p>
            <p><strong>Tu respuesta:</strong> {q.userAnswer}</p>
            <p><strong>Respuesta correcta:</strong> {q.correctAnswer}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
