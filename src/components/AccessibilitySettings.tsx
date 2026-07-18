import React, { useEffect, useState } from 'react';
import { clearProgress } from '../utils/binaryHelpers';

interface AccessibilitySettingsProps {
  onResetProgress: () => void;
}

export const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onResetProgress }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [textScale, setTextScale] = useState<'normal' | 'medium' | 'large'>('normal');
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Restaurar desde localStorage si existen preferencias anteriores
    const hc = localStorage.getItem('pref_high_contrast') === 'true';
    const scale = (localStorage.getItem('pref_text_scale') || 'normal') as 'normal' | 'medium' | 'large';
    const rm = localStorage.getItem('pref_reduce_motion') === 'true';

    setHighContrast(hc);
    setTextScale(scale);
    setReduceMotion(rm);
  }, []);

  useEffect(() => {
    // Aplicar clases al body
    const body = document.body;
    
    if (highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    localStorage.setItem('pref_high_contrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const body = document.body;
    body.classList.remove('text-scale-medium', 'text-scale-large');
    if (textScale === 'medium') body.classList.add('text-scale-medium');
    if (textScale === 'large') body.classList.add('text-scale-large');
    localStorage.setItem('pref_text_scale', textScale);
  }, [textScale]);

  useEffect(() => {
    const body = document.body;
    if (reduceMotion) {
      body.classList.add('reduce-motion');
    } else {
      body.classList.remove('reduce-motion');
    }
    localStorage.setItem('pref_reduce_motion', String(reduceMotion));
  }, [reduceMotion]);

  const handleClearData = () => {
    if (window.confirm("¿Estás seguro de que querés borrar todo tu progreso y respuestas guardadas? Esta acción no se puede deshacer.")) {
      clearProgress();
      onResetProgress();
      alert("Progreso restablecido correctamente.");
      window.location.reload();
    }
  };

  return (
    <div className="accessibility-bar" role="toolbar" aria-label="Herramientas de accesibilidad y ajustes">
      <div className="flex">
        <span><strong>Ajustes de accesibilidad:</strong></span>
        
        {/* Contraste */}
        <label htmlFor="hc-toggle" className="flex" style={{ cursor: 'pointer' }}>
          <input
            id="hc-toggle"
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            style={{ marginRight: '0.25rem' }}
          />
          Alto contraste
        </label>

        {/* Movimiento */}
        <label htmlFor="rm-toggle" className="flex" style={{ cursor: 'pointer' }}>
          <input
            id="rm-toggle"
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
            style={{ marginRight: '0.25rem' }}
          />
          Reducir animaciones
        </label>
      </div>

      <div className="flex" style={{ flexWrap: 'wrap' }}>
        {/* Escala de texto */}
        <div className="flex">
          <span>Tamaño de letra:</span>
          <button
            onClick={() => setTextScale('normal')}
            className={`btn btn-secondary`}
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', border: textScale === 'normal' ? '2px solid var(--color-accent)' : '1px solid var(--border-color)' }}
            aria-label="Letra tamaño normal"
          >
            Normal
          </button>
          <button
            onClick={() => setTextScale('medium')}
            className={`btn btn-secondary`}
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem', border: textScale === 'medium' ? '2px solid var(--color-accent)' : '1px solid var(--border-color)' }}
            aria-label="Letra tamaño mediano"
          >
            Medio
          </button>
          <button
            onClick={() => setTextScale('large')}
            className={`btn btn-secondary`}
            style={{ padding: '0.25rem 0.5rem', fontSize: '1rem', border: textScale === 'large' ? '2px solid var(--color-accent)' : '1px solid var(--border-color)' }}
            aria-label="Letra tamaño grande"
          >
            Grande
          </button>
        </div>

        <button
          onClick={handleClearData}
          className="btn btn-secondary"
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
          aria-label="Borrar datos de progreso locales"
        >
          Reiniciar Progreso
        </button>
      </div>
    </div>
  );
};
