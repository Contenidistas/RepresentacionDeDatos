import React, { useState } from 'react';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';
import { APP_CONFIG } from '../data/appConfig';

interface Module12QuizProps {
  onComplete: () => void;
}

export const Module12Quiz: React.FC<Module12QuizProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);

  // Preguntas del Quiz
  const questions = [
    {
      q: "¿Cuál es la unidad mínima de información en una computadora?",
      options: ["Un Byte", "Un Bit (lamparita)", "Un Kilobyte"],
      correct: 1
    },
    {
      q: "¿Por qué la codificación ASCII tradicional tiene problemas para representar palabras en español?",
      options: [
        "Porque no soporta números.",
        "Porque usa originalmente 7 bits y no incluye la eñe 'ñ' o vocales acentuadas.",
        "Porque ocupa demasiados bytes por carácter."
      ],
      correct: 1
    },
    {
      q: "Si una imagen de 10x10 píxeles usa 1 bit por píxel, ¿cuánto mide su peso total sin compresión?",
      options: ["10 bits", "100 bits (12.5 bytes)", "800 bits"],
      correct: 1
    },
    {
      q: "En el sistema binario, ¿cuál es el valor de posición de la cuarta lamparita contando desde la derecha?",
      options: ["4", "8", "16"],
      correct: 1
    },
    {
      q: "¿Qué tipo de compresión descarta detalles finos que el ojo o el oído casi no notan?",
      options: ["Compresión sin pérdida", "Compresión con pérdida (ej. JPEG, MP3)", "Compresión de hardware"],
      correct: 1
    }
  ];

  const [answers, setAnswers] = useState<number[]>(Array(5).fill(-1));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [a1Completed, setA1Completed] = useState(false);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[qIdx] = oIdx;
      return next;
    });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleExplainA1 = (exp: string) => {
    console.log("Reflexión del quiz final guardada:", exp);
    setA1Completed(true);
    onComplete();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div>
      <h2>Módulo 12: Autoevaluación y desafíos finales</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Respondé las preguntas conceptuales sobre representación de datos y obtené tu insignia de especialista en bits.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Quiz conceptual
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
          disabled={!a1Completed}
        >
          Actividad 2: Insignia final
        </button>
      </div>

      {/* ACTIVIDAD 1: QUIZ CONCEPTUAL */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Quiz conceptual de consolidación EBI</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Respondé las 5 preguntas conceptuales.
          </p>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {questions.map((item, qIdx) => (
              <div key={qIdx} style={{ borderBottom: qIdx < 4 ? '1px solid var(--border-color)' : 'none', paddingBottom: '1rem' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {qIdx + 1}. {item.q}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => !quizSubmitted && handleSelectOption(qIdx, oIdx)}
                      className="btn"
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem 1rem',
                        backgroundColor: answers[qIdx] === oIdx
                          ? 'var(--color-accent)'
                          : 'var(--bg-input)',
                        color: answers[qIdx] === oIdx ? 'var(--bg-main)' : 'var(--text-main)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        cursor: quizSubmitted ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {quizSubmitted && (
                  <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: answers[qIdx] === item.correct ? 'var(--color-accent)' : 'var(--color-danger)' }}>
                    {answers[qIdx] === item.correct ? '[Correcto]' : `[Incorrecto] La opción correcta era: ${item.options[item.correct]}`}
                  </p>
                )}
              </div>
            ))}

            {!quizSubmitted ? (
              <button
                className="btn btn-primary"
                onClick={handleSubmitQuiz}
                disabled={answers.includes(-1)}
                style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem' }}
              >
                Enviar Respuestas
              </button>
            ) : (
              <div>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  Puntaje obtenido: <span style={{ color: 'var(--color-accent)' }}>{quizScore} / 5 respuestas correctas</span>
                </p>

                {a1Completed ? (
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', marginTop: '1rem' }}>
                    <p style={{ margin: 0, color: 'var(--color-accent)' }}>Reflexión final guardada en tu cuaderno.</p>
                  </div>
                ) : (
                  <ExplanationBox
                    activityId="m12_a1"
                    prompt="Escribí una breve reflexión final sobre cuál de todos los temas te resultó más interesante y cómo te ayuda a entender el funcionamiento de tu computadora o celular."
                    onExplain={handleExplainA1}
                  />
                )}
              </div>
            )}
          </div>

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="¡Quiz completado con éxito! Desbloqueaste la Insignia final en la siguiente pestaña."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: INSIGNIA FINAL */}
      {activityIdx === 1 && (
        <div style={{ textAlign: 'center' }}>
          <h3>Actividad 2: Insignia y Certificación Digital</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            ¡Felicitaciones! Completaste el recorrido didáctico.
          </p>

          <div
            className="panel"
            style={{
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
              border: '3px double var(--color-accent)',
              borderRadius: '12px',
              padding: '2.5rem 1.5rem',
              backgroundColor: 'var(--bg-input)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎓</div>
            <h4 style={{ color: 'var(--color-accent)', fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>RECONOCIMIENTO AL MÉRITO DIGITAL</h4>
            <p style={{ fontSize: '1.1rem', margin: '0 0 1.5rem 0' }}>
              Se otorga al estudiante de <strong>Educación Básica Integrada (EBI)</strong> por completar con éxito todas las hipótesis, explicaciones y desafíos prácticos del recurso didáctico interactivo:
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-alert)', margin: '0 0 2rem 0' }}>
              "Del dato al bit: cómo las computadoras representan la información"
            </p>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              <p>{APP_CONFIG.institution}</p>
              <p>{APP_CONFIG.author}</p>
              <p>Licencia: {APP_CONFIG.license}</p>
              <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>{APP_CONFIG.useAIGDeclaration}</p>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handlePrintCertificate} style={{ padding: '0.75rem 1.5rem' }}>
            🖨 Imprimir / Guardar en PDF
          </button>
        </div>
      )}
    </div>
  );
};
