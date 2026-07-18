import React, { useState } from 'react';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module11IntegratorProps {
  onComplete: () => void;
}

export const Module11Integrator: React.FC<Module11IntegratorProps> = ({ onComplete }) => {
  const [showTheory, setShowTheory] = useState(true);

  // Estados Desafío Sonda Espacial
  const [imgDim, setImgDim] = useState<8 | 16 | 32>(32); // 32x32 por defecto
  const [imgBpp, setImgBpp] = useState<1 | 8 | 24>(24); // Color RGB por defecto
  const [audioRate, setAudioRate] = useState<2000 | 4000 | 8000>(8000); // 8 kHz por defecto
  const [audioBits, setAudioBits] = useState<2 | 4 | 16>(16); // 16 bits por defecto

  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1ShowFeedback, setA1ShowFeedback] = useState<boolean | null>(null);

  // Peso del paquete científico
  const textBytes = 50; // Mensaje de texto de 50 letras ASCII
  const imgBytes = (imgDim * imgDim * imgBpp) / 8;
  const audioBytes = (audioRate * 1 * audioBits) / 8; // 1 segundo de duración
  const totalBytes = textBytes + imgBytes + audioBytes;

  const bandwidthLimitBytes = 512; // Límite estricto de la antena de la sonda

  const handleTransmit = () => {
    if (totalBytes <= bandwidthLimitBytes) {
      setA1ShowFeedback(true);
    } else {
      setA1ShowFeedback(false);
    }
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 11: Laboratorio integrador</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Aplicá de forma integrada todo lo que aprendiste para resolver una misión espacial de optimización de datos.
      </p>

      <div>
        <h3>Misión: La Sonda Espacial</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          La sonda espacial Voyager-X está en órbita y necesita transmitir un paquete de datos científicos a la Tierra.
        </p>

        {/* Bloque Teórico */}
        <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
            <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>El Límite Físico de las Transmisiones (Un poco de teoría)</h4>
            <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
              {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
            </button>
          </div>
          {showTheory && (
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p>
                En telecomunicaciones espaciales, la distancia y la potencia de la antena limitan estrictamente el 
                <strong> ancho de banda</strong> (la cantidad máxima de bytes que podemos transmitir en un paquete).
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Si el paquete supera el límite, la señal se corta y se pierden los datos por completo.
                </li>
                <li>
                  Como ingeniero/a, tenés que tomar decisiones: reducir la resolución de la foto, usar menos canales de color, o bajar la tasa de muestreo y precisión de cuantización del sonido para que todo quepa en el paquete.
                </li>
              </ul>
            </div>
          )}
        </div>

        {a1Prediction === '' ? (
          <PredictionBox
            activityId="m11_a1"
            prompt="Con los parámetros iniciales (imagen de 32x32 a 24 bits y sonido de 8 kHz a 16 bits), ¿pensás que el paquete científico cabrá dentro del límite de 512 bytes?"
            onPredict={(pred) => setA1Prediction(pred)}
          />
        ) : (
          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ margin: 0 }}>Ajustar Parámetros Científicos:</h4>
              
              <div>
                <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Dimensiones de Imagen:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[8, 16, 32].map(dim => (
                    <button
                      key={dim}
                      onClick={() => setImgDim(dim as any)}
                      className={`btn ${imgDim === dim ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.3rem' }}
                    >
                      {dim}x{dim}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Profundidad de color de Imagen:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {( [1, 8, 24] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => setImgBpp(b)}
                      className={`btn ${imgBpp === b ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.3rem' }}
                    >
                      {b === 1 ? '1 bit (B/N)' : b === 8 ? '8 bits' : '24 bits'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Muestreo del Sonido:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {([2000, 4000, 8000] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setAudioRate(r)}
                      className={`btn ${audioRate === r ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.3rem' }}
                    >
                      {r / 1000} kHz
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Cuantización del Sonido:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {([2, 4, 16] as const).map(b => (
                    <button
                      key={b}
                      onClick={() => setAudioBits(b)}
                      className={`btn ${audioBits === b ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, padding: '0.3rem' }}
                    >
                      {b} bits
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleTransmit}
                style={{ marginTop: '1rem', padding: '0.75rem' }}
              >
                📡 Transmitir Paquete a la Tierra
              </button>
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>📟 REPORTE DE PESO EN VIVO:</h4>
                <div style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                  <p>1. Mensaje de Texto (50 letras ASCII): <strong>{textBytes} bytes</strong></p>
                  <p>2. Imagen ({imgDim}x{imgDim} a {imgBpp} bits): <strong>{imgBytes} bytes</strong></p>
                  <p>3. Sonido (1s a {audioRate}Hz, {audioBits} bits): <strong>{audioBytes} bytes</strong></p>
                  
                  <div style={{
                    marginTop: '1rem',
                    borderTop: '2px solid var(--border-color)',
                    paddingTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Peso total:</span>
                    <strong style={{
                      fontSize: '1.4rem',
                      color: totalBytes <= bandwidthLimitBytes ? 'var(--color-accent)' : 'var(--color-danger)'
                    }}>
                      {totalBytes} / {bandwidthLimitBytes} bytes
                    </strong>
                  </div>
                </div>
              </div>

              {a1ShowFeedback && a1Explanation === '' && (
                <ExplanationBox
                  activityId="m11_a1"
                  prompt="Redactá el informe técnico para el centro terrestre. Justificá qué compromisos de calidad (ej. resolución o cuantización) sacrificaste para cumplir con el límite estricto."
                  onExplain={handleExplainA1}
                />
              )}
            </div>
          </div>
        )}

        {a1ShowFeedback !== null && (
          <FeedbackPanel
            success={a1ShowFeedback}
            message={a1ShowFeedback ? "¡Transmisión Exitosa! Lograste configurar el paquete por debajo de los 512 bytes. Los datos científicos llegaron limpios a la Tierra." : `⚠️ ¡Señal Cortada! El paquete pesa ${totalBytes} bytes, superando el límite de 512 bytes de la antena. Bajá las configuraciones e intentá nuevamente.`}
            hints={[
              "Una foto de 32x32 en 24 bits pesa 3072 bytes, excediendo la antena. Reducila a 8x8 y a 1 bit por píxel.",
              "Baja la tasa de muestreo del audio a 2000Hz (2 kHz) y la cuantización a 2 bits para ahorrar el máximo de espacio."
            ]}
          />
        )}
      </div>
    </div>
  );
};
