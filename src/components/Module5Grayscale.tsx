import React, { useState, useEffect, useRef } from 'react';
import { decimalToBinary } from '../utils/binaryHelpers';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module5GrayscaleProps {
  onComplete: () => void;
}

export const Module5Grayscale: React.FC<Module5GrayscaleProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Brillo Píxel)
  const [brightness, setBrightness] = useState(128);
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Banding Gradiente)
  const [bpp, setBpp] = useState(8);
  const [a2Completed, setA2Completed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Dibujar un gradiente de izquierda (negro) a derecha (blanco) cuantizado según BPP
    const levels = Math.pow(2, bpp); // Cantidad de colores posibles (2, 4, 16, 256)

    for (let x = 0; x < width; x++) {
      // Valor continuo entre 0 y 1
      const ratio = x / width;
      // Cuantizar ratio a los niveles permitidos
      const quantizedRatio = Math.round(ratio * (levels - 1)) / (levels - 1);
      const grayVal = Math.round(quantizedRatio * 255);

      ctx.fillStyle = `rgb(${grayVal}, ${grayVal}, ${grayVal})`;
      ctx.fillRect(x, 0, 1, height);
    }
  }, [bpp, activityIdx]);

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación de cuantización guardada:", exp);
    setA2Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 5: Escala de grises</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Descubrí los niveles de gris y el efecto de la profundidad de bits por píxel en las imágenes digitales.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Brillo de un píxel
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Cuantización (Banding)
        </button>
      </div>

      {/* ACTIVIDAD 1: BRILLO DE UN PÍXEL */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Brillo de un píxel</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Desliza el control de brillo de un solo píxel y observa su patrón de bits en memoria.
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>El Brillo del Píxel y los Niveles de Gris (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  En una pantalla, cada celda de imagen es un <strong>píxel</strong>. Si la pantalla es de escala de grises de 8 bits, 
                  cada píxel puede regular su nivel de intensidad de luz de 0 a 255.
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>El valor <strong>0</strong> (binario <code>00000000</code>) es el apagado total: <strong>negro absoluto</strong>.</li>
                  <li>El valor <strong>255</strong> (binario <code>11111111</code>) es el encendido total: <strong>blanco brillante</strong>.</li>
                  <li>Todos los valores intermedios (1 al 254) representan los diferentes tonos de gris.</li>
                 </ul>

                {/* Ejemplo Simulado de Grises */}
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>🔍 Ejemplo Simulado: Una cuadrícula de 2x2 en escala de grises (8 bits)</strong>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
                    Supongamos que queremos guardar una mini-imagen de 2x2 píxeles con diferentes tonos de gris:
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {/* Dibujo 2x2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 40px)', gap: '2px', border: '2px solid var(--border-color)', borderRadius: '4px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'white' }}>0</div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(85,85,85)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'white' }}>85</div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(170,170,170)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'black' }}>170</div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(255,255,255)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'black' }}>255</div>
                    </div>
                    {/* Explicación de memoria */}
                    <div style={{ fontSize: '0.85rem', flex: 1 }}>
                      <p>En memoria, la computadora guarda 4 bytes en fila (uno tras otro):</p>
                      <code style={{ display: 'block', backgroundColor: 'var(--bg-input)', padding: '4px', borderRadius: '4px', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                        [P1: 00000000] [P2: 01010101] <br />
                        [P3: 10101010] [P4: 11111111]
                      </code>
                      <p style={{ marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                        Peso total: 4 píxeles * 8 bits = 32 bits (4 bytes).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m5_a1"
              prompt="Si el valor 0 es negro absoluto y 255 es blanco, ¿qué valor decimal pensás que dará un gris medio exacto? ¿Cuál será su traducción en bits?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ margin: 0 }}>Ajustar Brillo del Píxel:</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    style={{ flex: 1, accentColor: 'var(--color-accent)' }}
                    aria-label="Brillo slider de 0 a 255"
                  />
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '3ch', textAlign: 'right' }}>
                    {brightness}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Representación en memoria (8 bits):</span>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', letterSpacing: '4px', margin: '0.25rem 0 0 0', color: 'var(--color-accent)' }}>
                    {decimalToBinary(brightness).padStart(8, '0')}
                  </p>
                </div>

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m5_a1"
                    prompt="Explicá cómo calcula la computadora el nivel de brillo de la luz a partir de la hilera de lamparitas (bits) en memoria."
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                )}
              </div>

              {/* Panel de renderizado del píxel gigante */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 style={{ alignSelf: 'flex-start', margin: '0 0 1rem 0' }}>El píxel gigante en pantalla:</h4>
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    backgroundColor: `rgb(${brightness}, ${brightness}, ${brightness})`,
                    border: '4px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                  role="img"
                  aria-label={`Un píxel gigante iluminado a nivel de brillo ${brightness}`}
                />
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Observaste de forma práctica cómo los valores de 0 a 255 determinan la cantidad de luz que emite un píxel en escala de grises de 1 byte."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: CUANTIZACIÓN GRADIENTE */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Profundidad de grises (Banding)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Cambiá la cantidad de bits por píxel (BPP) para ver cómo afecta a la calidad del gradiente continuo de grises.
          </p>

          <div className="grid grid-2">
            <div className="panel">
              <h4 style={{ marginBottom: '1rem' }}>Profundidad de bits (de 1 a 8 bits por píxel):</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={bpp}
                  onChange={(e) => setBpp(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-accent)' }}
                  aria-label="Bits por píxel slider de 1 a 8"
                />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '4ch', textAlign: 'right' }}>
                  {bpp} {bpp === 1 ? 'bit' : 'bits'}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Colores posibles: 2<sup>{bpp}</sup> = <strong style={{ color: 'var(--color-accent)' }}>{Math.pow(2, bpp)} tonos</strong>
              </div>

              {a2Completed ? (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                </div>
              ) : (
                <ExplanationBox
                  activityId="m5_a2"
                  prompt="Explicá por qué aparecen líneas y bandas duras ('escalones' de color) cuando bajás la profundidad de bits por debajo de 8 bits."
                  onExplain={handleExplainA2}
                />
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <h4 style={{ alignSelf: 'flex-start', margin: 0 }}>Gradiente Resultante:</h4>
              <canvas
                ref={canvasRef}
                width={300}
                height={150}
                style={{
                  width: '100%',
                  height: '150px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  imageRendering: 'pixelated'
                }}
              />
              <div style={{ alignSelf: 'flex-start', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                *A 1 bit solo hay blanco y negro. A 8 bits el gradiente es suave (256 grises).
              </div>
            </div>
          </div>

          {a2Completed && (
            <FeedbackPanel
              success={true}
              message="¡Felicitaciones! Completaste el Módulo 5. Comprendiste cómo la profundidad de bits determina la cantidad de matices de brillo y el tamaño del archivo resultante."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
