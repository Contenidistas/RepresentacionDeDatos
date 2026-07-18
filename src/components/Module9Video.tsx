import React, { useState, useEffect } from 'react';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module9VideoProps {
  onComplete: () => void;
}

export const Module9Video: React.FC<Module9VideoProps> = ({ onComplete }) => {
  const [showTheory, setShowTheory] = useState(true);

  // Estados Animador de Cuadros
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frames, setFrames] = useState<number[][]>([
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0),
    Array(64).fill(0)
  ]);
  const [fps, setFps] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  useEffect(() => {
    let intervalId: any = null;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % 4);
      }, 1000 / fps);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, fps]);

  const togglePixel = (pixelIdx: number) => {
    if (isPlaying) return; // No pintar durante reproducción
    setFrames(prev => {
      const next = prev.map((frame, fIdx) => {
        if (fIdx === currentFrame) {
          const nextFrame = [...frame];
          nextFrame[pixelIdx] = nextFrame[pixelIdx] === 0 ? 1 : 0;
          return nextFrame;
        }
        return frame;
      });
      return next;
    });
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
    onComplete();
  };

  // Peso de un fotograma: 8x8 = 64 bits = 8 bytes.
  // Peso del video de 4 fotogramas: 256 bits = 32 bytes.
  const frameWeightBits = 64;
  const totalVideoWeightBits = 64 * 4;

  return (
    <div>
      <h2>Módulo 9: Representación digital del video</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Comprendé cómo se forma el video digital mediante la sucesión rápida de fotogramas y calculá su peso físico en disco.
      </p>

      <div>
        <h3>Actividad 1: Animador de fotogramas</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Dibuja en la cuadrícula de 8x8 píxeles para cada uno de los 4 fotogramas (ej: una pelota que cae) y dale a "Play" para ver la animación correr.
        </p>

        {/* Bloque Teórico */}
        <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
          <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
            <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>¿Cómo se digitaliza el video? (Un poco de teoría)</h4>
            <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
              {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
            </button>
          </div>
          {showTheory && (
            <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
              <p>
                Un video digital no es más que una **secuencia rápida de imágenes fijas** llamadas <strong>fotogramas</strong> (o *frames*).
              </p>
              <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>FPS (Fotogramas por segundo):</strong> Frecuencia a la que se proyectan las imágenes. El cerebro percibe movimiento fluido a partir de unos 12 o 15 FPS. El cine estándar usa 24 FPS.
                </li>
                <li>
                  <strong>El peso del video sin compresión:</strong> Es gigantesco porque se multiplica el peso de cada foto individual por la cantidad de fotos por segundo y la duración.
                </li>
              </ul>

              {/* Ejemplo Simulado de Video */}
              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: 'var(--color-alert)' }}>🔍 Ejemplo Simulado: Un video de 3x3 píxeles (3 Fotogramas, 1 bit por píxel)</strong>
                <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
                  Supongamos que queremos animar un punto que se mueve en diagonal en una mini-pantalla de 3x3 píxeles:
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {/* Dibujos fotogramas */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cuadro 1</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '1px', border: '1px solid var(--border-color)', padding: '2px', backgroundColor: 'var(--border-color)' }}>
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'black' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cuadro 2</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '1px', border: '1px solid var(--border-color)', padding: '2px', backgroundColor: 'var(--border-color)' }}>
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'black' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cuadro 3</span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 15px)', gap: '1px', border: '1px solid var(--border-color)', padding: '2px', backgroundColor: 'var(--border-color)' }}>
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'white' }} />
                        <div style={{ width: '15px', height: '15px', backgroundColor: 'black' }} />
                      </div>
                    </div>
                  </div>
                  {/* Explicación de memoria */}
                  <div style={{ fontSize: '0.85rem', flex: 1 }}>
                    <p>En memoria se guarda la cadena lineal de los 3 fotogramas consecutivos:</p>
                    <code style={{ display: 'block', backgroundColor: 'var(--bg-input)', padding: '4px', borderRadius: '4px', marginTop: '0.25rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                      [F1: 100000000] [F2: 000010000] [F3: 000000001]
                    </code>
                    <p style={{ marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                      Peso total: 3 fotogramas * 9 píxeles = 27 bits en total.
                    </p>
                  </div>
                </div>
              </div>

              {/* Relación con la Realidad: Video en el Celular */}
              <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                <strong style={{ color: 'var(--color-alert)' }}>📱 ¿Cuánto pesa un video de 10 segundos grabado con tu celular?</strong>
                <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Cuando grabás un video de alta calidad (Full HD a 1080p) a <strong>30 fotogramas por segundo (FPS)</strong> en tu celular:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0', fontSize: '0.85rem' }}>
                  <li>Cada fotograma individual tiene una resolución de 1920 × 1080 = 2.073.600 píxeles.</li>
                  <li>En color real (3 bytes por píxel), una sola imagen pesa unos 6 Megabytes.</li>
                  <li>¡En un segundo se graban 30 de estas fotos! Eso equivale a 6 MB × 30 = 180 Megabytes por segundo.</li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  Si no hubiera compresión, ¡un video corto de 10 segundos para TikTok pesaría <strong>1,8 Gigabytes</strong> y llenaría tu celular en un instante!
                </p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  ¿Cómo lo soluciona el celular? Aplica <strong>compresión temporal de video (como MP4 / H.264)</strong>. En lugar de guardar 30 fotos completas por segundo, solo guarda la primera foto y luego registra únicamente los píxeles que cambiaron de posición o de color en los siguientes fotogramas. Esto reduce el peso de 1.8 GB a apenas unos 15 o 20 MB.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-2">
          <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ margin: 0 }}>
              {isPlaying ? '▶ Animación en reproducción' : `Dibujando Fotograma ${currentFrame + 1} de 4:`}
            </h4>

            {/* Controles de reproducción */}
            <div className="flex" style={{ gap: '0.5rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏹ Detener' : '▶ Reproducir'}
              </button>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>FPS:</span>
              <input
                type="number"
                min="1"
                max="10"
                value={fps}
                onChange={(e) => setFps(Math.max(1, Math.min(10, Number(e.target.value))))}
                className="input"
                style={{ width: '60px' }}
                disabled={isPlaying}
                aria-label="Fotogramas por segundo"
              />
            </div>

            {/* Selector manual de fotograma */}
            <div className="flex" style={{ gap: '0.25rem' }}>
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  onClick={() => setCurrentFrame(idx)}
                  className={`btn ${currentFrame === idx ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                  disabled={isPlaying}
                >
                  F {idx + 1}
                </button>
              ))}
            </div>

            {/* Cuadrícula interactiva 8x8 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 30px)',
                gap: '1px',
                backgroundColor: 'var(--border-color)',
                width: '248px',
                padding: '4px',
                borderRadius: '8px',
                margin: '0 auto'
              }}
            >
              {frames[currentFrame].map((bit, idx) => (
                <button
                  key={idx}
                  onClick={() => togglePixel(idx)}
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: bit === 1 ? 'var(--color-accent)' : 'var(--bg-main)',
                    border: 'none',
                    cursor: isPlaying ? 'not-allowed' : 'pointer'
                  }}
                  aria-label={`Píxel ${idx + 1} en fotograma ${currentFrame + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="panel flex" style={{ flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
            <div>
              <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>📟 CÁLCULO DE MEMORIA DEL VIDEO:</h4>
              <p>Resolución de fotograma: <strong>8 × 8 = 64 píxeles</strong></p>
              <p>Profundidad de color: <strong>1 bit por píxel</strong></p>
              <p>Peso por fotograma: <strong>{frameWeightBits} bits (8 bytes)</strong></p>
              <p style={{ marginTop: '0.5rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                Peso total video (4 fotos): <strong style={{ color: 'var(--color-alert)', fontSize: '1.2rem' }}>{totalVideoWeightBits} bits ({totalVideoWeightBits / 8} bytes)</strong>
              </p>
            </div>

            {a1Explanation === '' ? (
              <ExplanationBox
                activityId="m9_a1"
                prompt="Explicá con tus palabras qué sucedería con el peso de este video si pasamos de 1 bit (blanco y negro) a 24 bits (color RGB) por píxel."
                onExplain={handleExplainA1}
              />
            ) : (
              <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
            )}
          </div>
        </div>

        {a1Completed && (
          <FeedbackPanel
            success={true}
            message="¡Excelente! Completaste el Módulo 9. Comprendiste cómo el video digital escala su tamaño multiplicando la resolución por los fotogramas y la profundidad."
            hints={[]}
          />
        )}
      </div>
    </div>
  );
};
