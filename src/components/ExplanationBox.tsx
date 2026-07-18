import React, { useState, useEffect } from 'react';

interface ExplanationBoxProps {
  activityId: string;
  prompt: string;
  onExplain: (explanation: string) => void;
  disabled?: boolean;
}

export const ExplanationBox: React.FC<ExplanationBoxProps> = ({ activityId, prompt, onExplain, disabled = false }) => {
  const [explanation, setExplanation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Cargar explicación anterior si existe
    const saved = localStorage.getItem(`exp_${activityId}`);
    if (saved) {
      setExplanation(saved);
      setSubmitted(true);
      onExplain(saved);
    }
  }, [activityId, onExplain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (explanation.trim()) {
      localStorage.setItem(`exp_${activityId}`, explanation.trim());
      onExplain(explanation.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="panel" style={{ marginTop: '1rem', borderLeft: '4px solid var(--color-accent)' }}>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
        2. Explicación: ¿Qué cambió y por qué?
      </h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{prompt}</p>

      {submitted ? (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>Tu explicación registrada:</span>
          <p style={{ fontStyle: 'italic', marginTop: '0.25rem', margin: 0 }}>"{explanation}"</p>
          {!disabled && (
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} 
              onClick={() => setSubmitted(false)}
            >
              Editar respuesta
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <textarea
            className="input"
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Explicá con tus palabras lo que observaste en la simulación..."
            aria-label="Escribí acá tu explicación"
            required
            disabled={disabled}
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={disabled}
            style={{ alignSelf: 'flex-end', marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            Guardar explicación y completar
          </button>
        </form>
      )}
    </div>
  );
};
