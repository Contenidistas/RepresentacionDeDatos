import React, { useState } from 'react';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module7ResolutionProps {
  onComplete: () => void;
}

export const Module7Resolution: React.FC<Module7ResolutionProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Calculadora)
  const [w, setW] = useState(800);
  const [h, setH] = useState(600);
  const [bpp, setBpp] = useState(24);
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  const totalBits = w * h * bpp;
  const totalBytes = totalBits / 8;
  const totalKB = totalBytes / 1024;

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Desafío Disquete)
  const [floppyAnswer, setFloppyAnswer] = useState<string>(''); // 'yes' | 'no'
  const [a2ShowFeedback, setA2ShowFeedback] = useState<boolean | null>(null);
  const [a2Completed, setA2Completed] = useState(false);

  const checkA2Challenge = () => {
    if (floppyAnswer === 'yes') {
      setA2ShowFeedback(true);
    } else {
      setA2ShowFeedback(false);
    }
  };

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación del disquete guardada:", exp);
    setA2Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 7: Resolución, profundidad y tamaño</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Calculá el peso teórico sin compresión de tus archivos multimedia usando dimensiones y bits.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Calculadora de peso
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Desafío del disquete
        </button>
      </div>

      {/* ACTIVIDAD 1: CALCULADORA DE PESO */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Calculadora de peso de imagen</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Configurá las dimensiones y la profundidad de bits de la imagen para calcular su tamaño teórico.
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>La Relación Matemática del Peso (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  Para calcular el peso en almacenamiento de un mapa de bits sin comprimir, multiplicamos la resolución total 
                  (cantidad de píxeles) por la profundidad de color (bits que usa cada píxel):
                </p>
                <p style={{ margin: '0.5rem 0', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', color: 'var(--color-alert)' }}>
                  Tamaño (bits) = Ancho × Alto × Bits por píxel
                </p>
                <p>
                  Luego, para manejar cifras más legibles, realizamos la conversión de unidades digitales:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>Para pasar a <strong>Bytes</strong>: dividimos por 8 (porque 1 byte = 8 bits).</li>
                  <li>Para pasar a <strong>Kilobytes (KB)</strong>: dividimos los bytes por 1024 (porque 1 KB = 1024 bytes).</li>
                </ul>

                {/* Relación con la Realidad: Cámara del Celular */}
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>📱 ¿Qué significa que la cámara de tu celular tenga 12 Megapíxeles?</strong>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Cuando sacás una foto, el sensor de la cámara del celular captura una cuadrícula de <strong>12 millones de píxeles</strong> (por ejemplo, una resolución de 4000 píxeles de ancho por 3000 de alto). 
                  </p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Si cada uno de esos píxeles se guarda en color real (RGB de 24 bits = 3 bytes), el peso teórico de esa sola foto sería:
                  </p>
                  <code style={{ display: 'block', backgroundColor: 'var(--bg-input)', padding: '6px', borderRadius: '4px', marginTop: '0.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    4000 × 3000 × 3 bytes = 36.000.000 bytes (¡36 Megabytes!)
                  </code>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Si las fotos pesaran eso, la memoria de tu celular se llenaría con unas pocas decenas de fotos. 
                    Por suerte, al guardarla, el chip de la cámara aplica <strong>compresión JPEG</strong>, descartando detalles invisibles para el ojo y reduciendo el peso de la foto de 36 MB a solo 2 o 3 MB. ¡Así es como podés guardar miles de fotos en tu galería!
                  </p>
                </div>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m7_a1"
              prompt="Si duplicamos el ancho y el alto de una imagen (ej. de 400x300 a 800x600) sin cambiar los colores, ¿cuántas veces pensás que aumentará su tamaño de archivo?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ margin: 0 }}>Parámetros de la Foto:</h4>
                
                <div>
                  <label htmlFor="calc-w" style={{ fontSize: '0.9rem' }}>Ancho (px):</label>
                  <input
                    id="calc-w"
                    type="number"
                    className="input"
                    value={w}
                    min="1"
                    onChange={(e) => setW(Math.max(1, Number(e.target.value)))}
                    style={{ width: '100%', marginTop: '0.25rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="calc-h" style={{ fontSize: '0.9rem' }}>Alto (px):</label>
                  <input
                    id="calc-h"
                    type="number"
                    className="input"
                    value={h}
                    min="1"
                    onChange={(e) => setH(Math.max(1, Number(e.target.value)))}
                    style={{ width: '100%', marginTop: '0.25rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="calc-bpp" style={{ fontSize: '0.9rem' }}>Profundidad de color (BPP):</label>
                  <select
                    id="calc-bpp"
                    className="input"
                    value={bpp}
                    onChange={(e) => setBpp(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '0.25rem' }}
                  >
                    <option value={1}>1 bit (Blanco/Negro)</option>
                    <option value={8}>8 bits (Gris/256 colores)</option>
                    <option value={24}>24 bits (Color Real RGB)</option>
                  </select>
                </div>

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m7_a1"
                    prompt="Explicá la fórmula matemática. ¿Por qué al duplicar las dos dimensiones de una imagen, su tamaño se multiplica por 4 y no por 2?"
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                )}
              </div>

              <div className="panel">
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '1.5rem' }}>📟 CÁLCULO PASO A PASO:</h4>
                <div style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                  <p>1. Resolución: <br />
                    <strong>{w} × {h} = {(w * h).toLocaleString()} píxeles</strong>
                  </p>
                  <p>2. Multiplicación de bits: <br />
                    <strong>{(w * h).toLocaleString()} × {bpp} bits = {totalBits.toLocaleString()} bits</strong>
                  </p>
                  <p>3. Conversión a bytes: <br />
                    <strong>{totalBits.toLocaleString()} ÷ 8 = {totalBytes.toLocaleString()} bytes</strong>
                  </p>
                  <p>4. Conversión a Kilobytes (KB): <br />
                    <strong>{totalBytes.toLocaleString()} ÷ 1024 = <span style={{ color: 'var(--color-alert)', fontSize: '1.3rem', fontWeight: 'bold' }}>{totalKB.toFixed(2)} KB</span></strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Analizaste la multiplicación bidimensional y comprendiste cómo escala el peso de las imágenes con la resolución y los bits por píxel."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: DESAFÍO DISQUETE */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: El desafío del disquete</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            ¿Cabe una foto a color RGB sin comprimir de 800x600 píxeles en un disquete clásico de 1.44 Megabytes (1.474.560 bytes)?
          </p>

          <div className="grid grid-2">
            <div className="panel">
              <h4 style={{ marginBottom: '1rem' }}>Elegí tu respuesta:</h4>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setFloppyAnswer('yes')}
                  className="btn"
                  style={{
                    flex: 1,
                    backgroundColor: floppyAnswer === 'yes' ? 'var(--color-accent)' : 'var(--bg-input)',
                    color: floppyAnswer === 'yes' ? 'var(--bg-main)' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem'
                  }}
                >
                  Sí, cabe
                </button>
                <button
                  onClick={() => setFloppyAnswer('no')}
                  className="btn"
                  style={{
                    flex: 1,
                    backgroundColor: floppyAnswer === 'no' ? 'var(--color-accent)' : 'var(--bg-input)',
                    color: floppyAnswer === 'no' ? 'var(--bg-main)' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '1rem'
                  }}
                >
                  No, no cabe
                </button>
              </div>

              <button className="btn btn-primary" onClick={checkA2Challenge} disabled={!floppyAnswer} style={{ marginBottom: '1.5rem' }}>
                Comprobar Respuesta
              </button>

              {a2ShowFeedback && !a2Completed && (
                <ExplanationBox
                  activityId="m7_a2"
                  prompt="Escribí los cálculos que hiciste para justificar tu respuesta y comparar el tamaño de la foto frente al disquete."
                  onExplain={handleExplainA2}
                />
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ color: 'var(--color-accent)' }}>Comparación de datos:</h4>
              <div style={{
                backgroundColor: 'var(--bg-input)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                <p>💾 <strong>Capacidad física disquete:</strong> 1.474.560 bytes</p>
                <p>📷 <strong>Tamaño de foto 800x600 (24 bits/3 bytes):</strong><br />
                  800 × 600 = 480000 píxeles<br />
                  480000 × 3 bytes = <strong>1.440.000 bytes</strong>
                </p>
                <p style={{ marginTop: '0.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                  Restan libres: <strong>{1474560 - 1440000} bytes</strong> de espacio.
                </p>
              </div>
            </div>
          </div>

          {a2ShowFeedback !== null && (
            <FeedbackPanel
              success={a2ShowFeedback}
              message={a2ShowFeedback ? "¡Excelente cálculo! Sí, la imagen pesa 1.440.000 bytes, por lo que entra raspando en el disquete (sobran unos 34 KB)." : "Respuesta errónea. Realizá la multiplicación: 800 * 600 * 3 bytes. Compará ese valor en bytes."}
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
