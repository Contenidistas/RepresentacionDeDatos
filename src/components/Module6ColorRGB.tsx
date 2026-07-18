import React, { useState } from 'react';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module6ColorRGBProps {
  onComplete: () => void;
}

export const Module6ColorRGB: React.FC<Module6ColorRGBProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Mezclador)
  const [r, setR] = useState(128);
  const [g, setG] = useState(128);
  const [b, setB] = useState(128);
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  const getHex = (val: number) => {
    const hex = val.toString(16).toUpperCase();
    return hex.padStart(2, '0');
  };

  const hexColor = `#${getHex(r)}${getHex(g)}${getHex(b)}`;

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Desafío Pintor)
  // Amarillo patito target: R=255, G=215, B=0
  const targetR = 255;
  const targetG = 215;
  const targetB = 0;

  const [pr, setPr] = useState(128);
  const [pg, setPg] = useState(128);
  const [pb, setPb] = useState(0);
  const [a2ShowFeedback, setA2ShowFeedback] = useState<boolean | null>(null);
  const [a2Completed, setA2Completed] = useState(false);

  const checkA2Challenge = () => {
    const dist = Math.abs(pr - targetR) + Math.abs(pg - targetG) + Math.abs(pb - targetB);
    if (dist < 40) {
      setA2ShowFeedback(true);
    } else {
      setA2ShowFeedback(false);
    }
  };

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación pintor RGB guardada:", exp);
    setA2Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 6: Imágenes en color: RGB</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Mezclá canales rojo, verde y azul para formar más de 16 millones de colores y entender el código hexadecimal.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Mezclador RGB
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Desafío del pintor
        </button>
      </div>

      {/* ACTIVIDAD 1: MEZCLADOR RGB */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Mezclador RGB</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Ajustá los controles de Rojo, Verde y Azul de 0 a 255 y observá la mezcla de color resultante.
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>La Mezcla Aditiva de Color (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  Las pantallas forman todos los colores mezclando luces de tres colores primarios digitales: 
                  <strong> Rojo (Red), Verde (Green) y Azul (Blue)</strong>. Este método se llama mezcla aditiva.
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>Cada color primario (canal) se regula con 1 byte (8 bits), dándole 256 niveles de intensidad (0 a 255).</li>
                  <li>Al usar 3 canales, cada píxel a color de la pantalla requiere exactamente **3 bytes (24 bits)** en la memoria.</li>
                  <li>Esto genera 256 * 256 * 256 = <strong>16,7 millones de colores posibles</strong> (True Color).</li>
                </ul>

                {/* Ejemplo Simulado de Color RGB */}
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>🔍 Ejemplo Simulado: Una cuadrícula de 2x1 a color (RGB de 24 bits)</strong>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
                    Supongamos que queremos guardar una hilera de 2 píxeles: uno Rojo y uno Verde:
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {/* Dibujo 2x1 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 40px)', gap: '2px', border: '2px solid var(--border-color)', borderRadius: '4px' }}>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(255,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'white', fontWeight: 'bold' }}>R</div>
                      <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(0,255,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'black', fontWeight: 'bold' }}>G</div>
                    </div>
                    {/* Explicación de memoria */}
                    <div style={{ fontSize: '0.85rem', flex: 1 }}>
                      <p>En memoria, cada píxel necesita 3 bytes (R, G, B):</p>
                      <code style={{ display: 'block', backgroundColor: 'var(--bg-input)', padding: '4px', borderRadius: '4px', marginTop: '0.25rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                        - Píxel 1 (Rojo): R=255, G=0, B=0 <br />
                        &nbsp;&nbsp;→ [11111111] [00000000] [00000000] <br />
                        - Píxel 2 (Verde): R=0, G=255, B=0 <br />
                        &nbsp;&nbsp;→ [00000000] [11111111] [00000000]
                      </code>
                      <p style={{ marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                        Peso total: 2 píxeles * 24 bits = 48 bits (6 bytes).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m6_a1"
              prompt="Si apagamos los tres canales al mínimo (R=0, G=0, B=0), ¿qué color pensás que aparecerá en pantalla?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
                <h4 style={{ margin: 0 }}>Canales de Luz (0 - 255):</h4>
                
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-danger)' }}>Canal Rojo (R): {r}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={r}
                    onChange={(e) => setR(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-danger)' }}
                    aria-label="Canal Rojo de 0 a 255"
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>Canal Verde (G): {g}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={g}
                    onChange={(e) => setG(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                    aria-label="Canal Verde de 0 a 255"
                  />
                </div>

                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-alert)' }}>Canal Azul (B): {b}</span>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-alert)' }}
                    aria-label="Canal Azul de 0 a 255"
                  />
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                  Código Hexadecimal: <strong style={{ color: 'var(--color-accent)' }}>{hexColor}</strong>
                </div>

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m6_a1"
                    prompt="Explicá cómo se representan en binario los 3 bytes necesarios para guardar el color actual."
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                )}
              </div>

              {/* Panel de renderizado del color */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 style={{ alignSelf: 'flex-start', margin: '0 0 1rem 0' }}>Color mezclado:</h4>
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    backgroundColor: hexColor,
                    border: '4px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                  role="img"
                  aria-label={`Muestra del color resultante ${hexColor}`}
                />
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Analizaste cómo el sistema RGB utiliza 3 bytes independientes para componer cualquier luz de color en pantalla."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: DESAFÍO PINTOR */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Desafío del pintor RGB</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Encontrá la mezcla correcta de luces para recrear el color <strong>Amarillo Patito</strong>.
          </p>

          <div className="grid grid-2">
            <div className="panel flex" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ margin: 0 }}>Tus luces:</h4>
              
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-danger)' }}>Canal Rojo (R): {pr}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={pr}
                  onChange={(e) => setPr(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-danger)' }}
                  aria-label="Canal Rojo pintor"
                />
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)' }}>Canal Verde (G): {pg}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={pg}
                  onChange={(e) => setPg(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                  aria-label="Canal Verde pintor"
                />
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-alert)' }}>Canal Azul (B): {pb}</span>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={pb}
                  onChange={(e) => setPb(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-alert)' }}
                  aria-label="Canal Azul pintor"
                />
              </div>

              <div className="flex" style={{ gap: '1rem', marginTop: '1rem' }}>
                <button className="btn btn-primary" onClick={checkA2Challenge}>
                  Comprobar Color
                </button>
              </div>

              {a2ShowFeedback && !a2Completed && (
                <ExplanationBox
                  activityId="m6_a2"
                  prompt="Explicá por qué en las pantallas pintar de Amarillo requiere encender las luces Roja y Verde, a diferencia del comportamiento de las pinturas tradicionales."
                  onExplain={handleExplainA2}
                />
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tu color</span>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: `rgb(${pr}, ${pg}, ${pb})`,
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    marginTop: '0.5rem'
                  }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Objetivo</span>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: `rgb(${targetR}, ${targetG}, ${targetB})`,
                    border: '2px solid var(--border-color)',
                    borderRadius: '8px',
                    marginTop: '0.5rem'
                  }} />
                </div>
              </div>
            </div>
          </div>

          {a2ShowFeedback !== null && (
            <FeedbackPanel
              success={a2ShowFeedback}
              message={a2ShowFeedback ? "¡Logrado! Encontraste la mezcla justa de luz roja y verde con ausencia de azul." : "Color lejano. Pista: Para hacer amarillo, necesitás activar Rojo y Verde con mucha intensidad, y apagar el Azul."}
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
