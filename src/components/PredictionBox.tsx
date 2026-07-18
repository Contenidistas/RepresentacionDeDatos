import React, { useState, useEffect } from 'react';

interface PredictionBoxProps {
  activityId: string;
  prompt: string;
  onPredict: (prediction: string) => void;
}

export const PredictionBox: React.FC<PredictionBoxProps> = ({ activityId, prompt, onPredict }) => {
  const [prediction, setPrediction] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Cargar predicción anterior si existe
    const saved = localStorage.getItem(`pred_${activityId}`);
    if (saved) {
      setPrediction(saved);
      setSubmitted(true);
      onPredict(saved);
    }
  }, [activityId, onPredict]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prediction.trim()) {
      localStorage.setItem(`pred_${activityId}`, prediction.trim());
      onPredict(prediction.trim());
      setSubmitted(true);
    }
  };

  return (
    <div className="panel" style={{ marginTop: '1.5rem', borderLeft: '4px solid var(--color-alert)' }}>
      <h3 style={{ fontSize: '1.1rem', color: 'var(--color-alert)', marginBottom: '0.5rem' }}>
        1. Antes de ejecutar: ¿Qué pensás que ocurrirá?
      </h3>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{prompt}</p>
      
      {submitted ? (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-alert)' }}>Tu predicción registrada:</span>
          <p style={{ fontStyle: 'italic', marginTop: '0.25rem', margin: 0 }}>"{prediction}"</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <textarea
            className="input"
            rows={2}
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            placeholder="Escribí acá tu hipótesis como si le hablaras a tu grupo o profesor/a..."
            aria-label="Escribí acá tu predicción"
            required
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
          />
          <button 
            type="submit" 
            className="btn btn-accent" 
            style={{ alignSelf: 'flex-end', marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            Registrar predicción y probar
          </button>
        </form>
      )}
    </div>
  );
};
