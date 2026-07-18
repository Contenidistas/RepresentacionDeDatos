import React, { useState } from 'react';

interface FeedbackPanelProps {
  success: boolean | null;
  message: string;
  hints: string[];
  onNext?: () => void;
  onRetry?: () => void;
  isLastActivity?: boolean;
}

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({
  success,
  message,
  hints,
  onNext,
  onRetry,
  isLastActivity = false
}) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);

  const handleShowHint = () => {
    setCurrentHintIndex((prev) => Math.min(prev + 1, hints.length - 1));
  };

  const handleResetHint = () => {
    setCurrentHintIndex(-1);
  };

  return (
    <div className="panel" style={{ marginTop: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <div aria-live="polite" aria-atomic="true">
        {success !== null && (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: '1rem', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              backgroundColor: success ? 'rgba(46, 204, 113, 0.15)' : 'rgba(231, 76, 60, 0.15)',
              border: `1px solid ${success ? 'var(--color-accent)' : 'var(--color-danger)'}`
            }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {success ? '[Correcto]' : '[Revisar]'}
            </span>
            <div>
              <h4 style={{ color: success ? 'var(--color-accent)' : 'var(--color-danger)', marginBottom: '0.25rem' }}>
                {success ? '¡Excelente!' : 'Revisá la respuesta'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{message}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        {/* Pistas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: '1 1 300px' }}>
          {hints.length > 0 && (
            <div>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} 
                onClick={handleShowHint}
                disabled={currentHintIndex >= hints.length - 1}
              >
                ¿Necesitás una pista? ({currentHintIndex + 1}/{hints.length})
              </button>
              
              {currentHintIndex >= 0 && (
                <div 
                  className="card" 
                  style={{ 
                    marginTop: '0.5rem', 
                    padding: '0.75rem', 
                    borderLeft: '4px solid var(--color-alert)', 
                    backgroundColor: 'var(--bg-input)',
                    fontSize: '0.9rem'
                  }}
                >
                  <p style={{ margin: 0 }}>{hints[currentHintIndex]}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Acciones */}
        <div className="flex" style={{ alignSelf: 'flex-end' }}>
          {onRetry && (
            <button className="btn btn-secondary" onClick={() => { handleResetHint(); onRetry(); }}>
              Reiniciar actividad
            </button>
          )}
          {success && onNext && (
            <button className="btn btn-primary" onClick={onNext}>
              {isLastActivity ? 'Finalizar módulo' : 'Siguiente actividad'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
