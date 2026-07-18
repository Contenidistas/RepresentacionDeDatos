import React, { useState, useEffect, useRef } from 'react';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module8AudioProps {
  onComplete: () => void;
}

export const Module8Audio: React.FC<Module8AudioProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Muestreo Canvas)
  const [rate, setRate] = useState(20); // 10 a 100 Hz
  const [bits, setBits] = useState(4); // 2 a 8 bits
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 1. Dibujar onda analógica original (Seno suave) en azul
    ctx.strokeStyle = 'rgba(58, 127, 194, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin((x / width) * Math.PI * 4) * (height * 0.35);
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 2. Muestreo y Cuantización
    const samplesCount = rate;
    const levels = Math.pow(2, bits); // Niveles de cuantización (amplitud)
    const stepX = width / samplesCount;

    ctx.strokeStyle = 'var(--color-alert)';
    ctx.fillStyle = 'var(--color-alert)';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let lastY = height / 2;

    for (let i = 0; i <= samplesCount; i++) {
      const sampleX = i * stepX;
      // Calcular valor de la onda continua en este punto
      const continuousYRatio = 0.5 + 0.35 * Math.sin((sampleX / width) * Math.PI * 4);
      
      // Cuantizar el ratio de la amplitud
      const quantizedRatio = Math.round(continuousYRatio * (levels - 1)) / (levels - 1);
      const sampleY = quantizedRatio * height;

      // Dibujar punto de muestreo
      ctx.beginPath();
      ctx.arc(sampleX, sampleY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Dibujar línea escalonada (cuadrada) que simula el audio digital
      if (i === 0) {
        ctx.moveTo(sampleX, sampleY);
      } else {
        // Línea horizontal hasta la X actual y luego vertical hasta la Y del sample
        ctx.lineTo(sampleX, lastY);
        ctx.lineTo(sampleX, sampleY);
      }
      lastY = sampleY;
    }
    ctx.stroke();
  }, [rate, bits, activityIdx]);

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Pitido)
  const [quantBits, setQuantBits] = useState(16); // 16 (limpio) vs 4 (sucio) vs 2 (crudo)
  const [playing, setPlaying] = useState(false);
  const [a2Completed, setA2Completed] = useState(false);

  const playBeep = () => {
    if (playing) return;
    setPlaying(true);

    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      // Frecuencia del pitido (La 440Hz)
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);

      if (quantBits === 16) {
        // Onda sinusoidal pura (limpia)
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      } else if (quantBits === 4) {
        // Onda triangular (un poco distorsionada, 8 bits-like)
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      } else {
        // Onda cuadrada (muy áspera y distorsionada, 2 bits-like)
        osc.type = 'square';
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      }

      osc.start();
      // Apagado progresivo corto
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.stop(audioCtx.currentTime + 0.6);

      setTimeout(() => {
        setPlaying(false);
      }, 700);
    } catch (err) {
      console.error(err);
      setPlaying(false);
    }
  };

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación de audio guardada:", exp);
    setA2Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 8: Representación digital del sonido</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Comprendé cómo se digitaliza una onda sonora analógica mediante el muestreo y la cuantización de amplitudes.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Muestreo de ondas
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Pitido y cuantización
        </button>
      </div>

      {/* ACTIVIDAD 1: MUESTREO DE ONDAS */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Simulador de muestreo</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Modificá la frecuencia de muestreo y los bits de cuantización para ver cómo la computadora convierte la onda analógica (azul) en digital (rojo).
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>La Digitalización del Sonido (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  El sonido físico es una <strong>onda analógica continua</strong> que viaja por el aire. Como las computadoras solo pueden 
                  guardar números discretos, deben "digitalizar" la onda mediante dos procesos:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Frecuencia de Muestreo (Sampling):</strong> Se mide en Hertz (Hz). Indica cuántas veces por segundo medimos la altura de la onda. Un CD de audio toma 44.100 muestras por segundo.
                  </li>
                  <li>
                    <strong>Cuantización (Amplitud en bits):</strong> Determina cuánta precisión usamos para guardar la altura medida en cada muestra. A más bits por muestra (ej. 16 bits), más escalones intermedios tiene la computadora para dibujar la altura exacta.
                  </li>
                </ul>

                {/* Ejemplo Simulado de Sonido */}
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>🔍 Ejemplo Simulado: Tabla de Muestreo de Audio (Cuantización de 8 bits)</strong>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
                    Así es como la computadora guarda 4 puntos (muestras) tomados de una onda de sonido en el tiempo:
                  </p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                        <th style={{ padding: '4px' }}>Muestra</th>
                        <th style={{ padding: '4px' }}>Tiempo</th>
                        <th style={{ padding: '4px' }}>Amplitud (0 a 255)</th>
                        <th style={{ padding: '4px' }}>Patrón Binario (1 Byte)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}>Muestra 1</td>
                        <td style={{ padding: '4px' }}>0.0 s</td>
                        <td style={{ padding: '4px' }}>128 (Centro)</td>
                        <td style={{ padding: '4px' }}><code>10000000</code></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}>Muestra 2</td>
                        <td style={{ padding: '4px' }}>0.1 s</td>
                        <td style={{ padding: '4px' }}>240 (Pico alto)</td>
                        <td style={{ padding: '4px' }}><code>11110000</code></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}>Muestra 3</td>
                        <td style={{ padding: '4px' }}>0.2 s</td>
                        <td style={{ padding: '4px' }}>128 (Centro)</td>
                        <td style={{ padding: '4px' }}><code>10000000</code></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}>Muestra 4</td>
                        <td style={{ padding: '4px' }}>0.3 s</td>
                        <td style={{ padding: '4px' }}>15 (Valle bajo)</td>
                        <td style={{ padding: '4px' }}><code>00001111</code></td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Al reproducirlo, la tarjeta de sonido lee los bytes secuencialmente y emite los impulsos eléctricos correspondientes a esas amplitudes, haciendo vibrar el altavoz.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-2">
            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.9rem' }}>Frecuencia de Muestreo: {rate} Hz</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                  aria-label="Frecuencia de muestreo"
                />
              </div>

              <div>
                <span style={{ fontSize: '0.9rem' }}>Precisión de Altura: {bits} bits</span>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={bits}
                  onChange={(e) => setBits(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-alert)' }}
                  aria-label="Bits de cuantización"
                />
              </div>

              {a1Explanation === '' ? (
                <ExplanationBox
                  activityId="m8_a1"
                  prompt="Explicá didácticamente qué le ocurre a la onda de sonido digital cuando la frecuencia de muestreo es extremadamente baja."
                  onExplain={handleExplainA1}
                />
              ) : (
                <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', gap: '0.5rem' }}>
              <h4 style={{ color: 'var(--color-accent)' }}>Visualización de la Digitalización:</h4>
              <canvas
                ref={canvasRef}
                width={300}
                height={150}
                style={{
                  width: '100%',
                  height: '180px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                *La curva azul es el sonido continuo real. Los escalones y puntos rojos son la copia digital guardada por la computadora.
              </span>
            </div>
          </div>

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Comprendiste de forma visual cómo el muestreo y la cuantización discretizan la información del sonido continuo."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: PITIDO */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Pitido y cuantización de audio</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Reproducí el tono y escuchá cómo afecta la profundidad de bits de la cuantización al ruido de distorsión digital.
          </p>

          <div className="grid grid-2">
            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ margin: 0 }}>Ajustar calidad de cuantización:</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>
                  <input
                    type="radio"
                    name="qbits"
                    checked={quantBits === 16}
                    onChange={() => setQuantBits(16)}
                  />
                  {' '} CD Calidad (16 bits - Limpio)
                </label>
                <label>
                  <input
                    type="radio"
                    name="qbits"
                    checked={quantBits === 4}
                    onChange={() => setQuantBits(4)}
                  />
                  {' '} 8-bit Consola (4 bits - Distorsión leve)
                </label>
                <label>
                  <input
                    type="radio"
                    name="qbits"
                    checked={quantBits === 2}
                    onChange={() => setQuantBits(2)}
                  />
                  {' '} Teléfono antiguo (2 bits - Distorsión extrema)
                </label>
              </div>

              <button
                className="btn btn-primary"
                onClick={playBeep}
                disabled={playing}
                style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem' }}
              >
                {playing ? '🔊 Reproduciendo...' : '▶ Escuchar Sonido'}
              </button>

              {a2Completed ? (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                </div>
              ) : (
                <ExplanationBox
                  activityId="m8_a2"
                  prompt="Describí cómo cambia el sonido que escuchaste de 16 bits a 2 bits. ¿Por qué ocurre ese ruido metálico rasposo?"
                  onExplain={handleExplainA2}
                />
              )}
            </div>

            <div className="panel">
              <h4 style={{ color: 'var(--color-alert)' }}>Compromiso técnico:</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                A 16 bits por muestra, cada segundo de audio estéreo pesa <strong>176.400 bytes (172 KB)</strong>.<br />
                A 2 bits por muestra, ese mismo segundo pesa solo <strong>22.050 bytes (21 KB)</strong>.<br />
                La computadora ahorra un 87% de espacio en disco, pero a costa de un siseo metálico audible debido a los errores de redondeo en la amplitud de la onda.
              </p>
            </div>
          </div>

          {a2Completed && (
            <FeedbackPanel
              success={true}
              message="¡Felicitaciones! Completaste el Módulo 8. Experimentaste el compromiso acústico entre fidelidad y peso de datos."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
