import React, { useState, useRef, useEffect } from 'react';
import { getImageSize, isValidMatrix } from '../utils/binaryHelpers';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module4ImageProps {
  onComplete: () => void;
}

export const Module4Image: React.FC<Module4ImageProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Editor de píxeles)
  const [gridSize, setGridSize] = useState<number>(8); // 8x8 por defecto
  const [pixels, setPixels] = useState<number[]>(Array(64).fill(0));
  const [zeroIsWhite, setZeroIsWhite] = useState(true);
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  // Sincronizar tamaño de píxeles si cambia el gridSize
  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
    setPixels(Array(size * size).fill(0));
  };

  const togglePixel = (idx: number) => {
    setPixels(prev => {
      const next = [...prev];
      next[idx] = next[idx] === 0 ? 1 : 0;
      return next;
    });
  };

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Reconstrucción desde bits)
  const binaryString = "01100110100110011000000110011001"; // 32 bits
  const [reconWidth, setReconWidth] = useState(8);
  const [reconHeight, setReconHeight] = useState(4);
  const [a2ShowFeedback, setA2ShowFeedback] = useState<boolean | null>(null);
  const [a2FeedbackMsg, setA2FeedbackMsg] = useState("");
  const [a2Prediction, setA2Prediction] = useState('');
  const [a2Explanation, setA2Explanation] = useState('');
  const [a2Completed, setA2Completed] = useState(false);

  const checkA2Challenge = () => {
    if (reconWidth === 8 && reconHeight === 4) {
      setA2ShowFeedback(true);
      setA2FeedbackMsg("¡Excelente! Encontraste las dimensiones exactas (8 columnas x 4 filas) para reconstruir la figura. El patrón dibuja una cara simétrica.");
    } else {
      setA2ShowFeedback(false);
      setA2FeedbackMsg(`Incorrecto. Con ancho ${reconWidth} y alto ${reconHeight} la imagen tiene la cantidad de bits correcta (${reconWidth * reconHeight}), pero se ve desordenada o desfasada. Probá con otras dimensiones que sumen 32.`);
    }
  };

  const handlePredictA2 = (pred: string) => {
    setA2Prediction(pred);
  };

  const handleExplainA2 = (exp: string) => {
    setA2Explanation(exp);
    setA2Completed(true);
  };

  // Estados Actividad 3 (Binarizador de fotos)
  const [threshold, setThreshold] = useState(128);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [binarizedSizeBits, setBinarizedSizeBits] = useState(0);
  const [a3Completed, setA3Completed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const binarizedCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setImageLoaded(true);
        processImage();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    const img = imageRef.current;
    const canvasOrig = originalCanvasRef.current;
    const canvasBin = binarizedCanvasRef.current;

    if (!img || !canvasOrig || !canvasBin) return;

    const ctxOrig = canvasOrig.getContext('2d');
    const ctxBin = canvasBin.getContext('2d');
    if (!ctxOrig || !ctxBin) return;

    const size = 32;
    canvasOrig.width = size;
    canvasOrig.height = size;
    canvasBin.width = size;
    canvasBin.height = size;

    ctxOrig.drawImage(img, 0, 0, size, size);

    const imgData = ctxOrig.getImageData(0, 0, size, size);
    const data = imgData.data;

    const binarizedImgData = ctxBin.createImageData(size, size);
    const binData = binarizedImgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];

      const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;

      const isBlack = grayscale < threshold;
      const colorVal = isBlack ? 0 : 255;

      binData[i] = colorVal;
      binData[i+1] = colorVal;
      binData[i+2] = colorVal;
      binData[i+3] = 255;
    }

    ctxBin.putImageData(binarizedImgData, 0, 0);

    setBinarizedSizeBits(getImageSize(size, size, 1));
  };

  useEffect(() => {
    if (imageLoaded) {
      processImage();
    }
  }, [threshold, imageLoaded]);

  return (
    <div>
      <h2>Módulo 4: Imágenes binarias y mapas de bits</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Comprendé la estructura de las imágenes digitales formadas por cuadrículas de píxeles (mapas de bits).
      </p>

      {/* Selector de sub-actividad */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Editor de píxeles
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Reconstrucción desde bits
        </button>
        <button
          className={`btn ${activityIdx === 2 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(2)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 3: Binarizador de fotos
        </button>
      </div>

      {/* ACTIVIDAD 1: EDITOR DE PÍXELES */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Editor de píxeles</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Hacé clic en las celdas para pintar y mirá cómo se forma la secuencia binaria correspondiente.
          </p>

          {/* Panel de Teoría - Módulo 4 */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>¿Cómo representan imágenes las computadoras? (Un poco de teoría)</h4>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                aria-expanded={showTheory}
              >
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  Las imágenes digitales se dividen en una cuadrícula o matriz formada por pequeños puntos de color llamados <strong>píxeles</strong> (el acrónimo en inglés de <em>Picture Element</em>).
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  En las <strong>imágenes binarias (de 1 bit por píxel)</strong>, cada píxel solo tiene dos opciones posibles:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>Dígito <strong>0</strong>: Píxel blanco (lamparita apagada).</li>
                  <li>Dígito <strong>1</strong>: Píxel negro (lamparita encendida).</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}>
                  Físicamente, la memoria de la computadora es lineal (una larga fila de transistores). Por eso, para almacenar la imagen de dos dimensiones, la máquina lee la cuadrícula por filas (de izquierda a derecha, comenzando arriba y bajando renglón por renglón) y junta todos los bits en una sola cadena lineal.
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>La clave de la reconstrucción:</strong> Para que el monitor vuelva a dibujar la cuadrícula correctamente, necesita saber exactamente las **dimensiones** de la imagen (su ancho y su alto). Si estas dimensiones se pierden o se configuran mal, las filas se cortan antes o después de tiempo y el dibujo se deforma por completo.
                </p>

                {/* Cápsula de Profundidad de Color */}
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>¿Y si queremos más colores? (La profundidad de color)</strong>
                  <p style={{ marginTop: '0.25rem' }}>
                    Con <strong>1 bit por píxel</strong> solo podés representar 2<sup>1</sup> = 2 estados (blanco o negro). Para obtener tonos intermedios y colores, la computadora debe asignar <strong>más bits (más lamparitas) a cada píxel individual</strong>:
                  </p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                        <th style={{ padding: '4px' }}>Profundidad</th>
                        <th style={{ padding: '4px' }}>Cálculo</th>
                        <th style={{ padding: '4px' }}>Cantidad de Colores</th>
                        <th style={{ padding: '4px' }}>Peso en memoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}><strong>1 bit</strong></td>
                        <td style={{ padding: '4px' }}>2<sup>1</sup></td>
                        <td style={{ padding: '4px' }}>2 (Blanco y Negro)</td>
                        <td style={{ padding: '4px' }}>1 bit por píxel</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}><strong>2 bits</strong></td>
                        <td style={{ padding: '4px' }}>2<sup>2</sup></td>
                        <td style={{ padding: '4px' }}>4 (Blanco, Gris Claro, Gris Oscuro, Negro)</td>
                        <td style={{ padding: '4px' }}>2 bits por píxel</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}><strong>8 bits</strong></td>
                        <td style={{ padding: '4px' }}>2<sup>8</sup></td>
                        <td style={{ padding: '4px' }}>256 (Escala de grises completa)</td>
                        <td style={{ padding: '4px' }}><strong>1 byte (8 bits)</strong> por píxel</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '4px' }}><strong>24 bits</strong></td>
                        <td style={{ padding: '4px' }}>2<sup>24</sup></td>
                        <td style={{ padding: '4px' }}>16.7 Millones (Color Real / RGB)</td>
                        <td style={{ padding: '4px' }}><strong>3 bytes (24 bits)</strong> por píxel</td>
                      </tr>
                    </tbody>
                  </table>
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                    <strong>La relación con el peso del archivo:</strong> Si una imagen de 10×10 píxeles usa 1 bit por píxel, pesa <strong>100 bits</strong>. 
                    Si esa misma imagen usa color de 24 bits (3 bytes por píxel), pesará <strong>2.400 bits (300 bytes)</strong>. ¡El archivo es 24 veces más pesado solo para poder representar más colores!
                  </p>
                </div>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m4_a1"
              prompt="Si configurás una cuadrícula de 8x8 píxeles y pintás todos los píxeles de la primera fila, ¿qué secuencia binaria de unos y ceros esperás que aparezca al inicio?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>1. DATO ORIGINAL (Cuadrícula interactiva):</h4>
                
                <div className="flex" style={{ marginBottom: '1rem', gap: '0.5rem' }}>
                  <span>Resolución:</span>
                  {[4, 8, 10, 16].map(size => (
                    <button
                      key={size}
                      className="btn btn-secondary"
                      onClick={() => handleGridSizeChange(size)}
                      style={{
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.8rem',
                        borderColor: gridSize === size ? 'var(--color-accent)' : 'var(--border-color)'
                      }}
                    >
                      {size}x{size}
                    </button>
                  ))}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="color-conv" className="flex" style={{ cursor: 'pointer' }}>
                    <input
                      id="color-conv"
                      type="checkbox"
                      checked={zeroIsWhite}
                      onChange={(e) => setZeroIsWhite(e.target.checked)}
                      style={{ marginRight: '0.25rem' }}
                    />
                    El bit 0 es blanco (y el bit 1 es negro)
                  </label>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gap: '2px',
                  width: '320px',
                  height: '320px',
                  backgroundColor: 'var(--border-color)',
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  margin: '0 auto 1.5rem auto'
                }}>
                  {pixels.map((pixel, idx) => {
                    const isDark = zeroIsWhite ? pixel === 1 : pixel === 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => togglePixel(idx)}
                        aria-label={`Píxel en posición ${idx + 1}. Valor: ${pixel}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: isDark ? 'hsl(220, 25%, 10%)' : 'hsl(0, 0%, 95%)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      />
                    );
                  })}
                </div>

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m4_a1"
                    prompt="Explicá cómo calcula la computadora el tamaño en bits de esta imagen de mapa de bits. ¿Depende del dibujo que hagas o solo de la cuadrícula?"
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                )}
              </div>

              {/* Panel de representación */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1.5rem' }}>2. REPRESENTACIÓN INTERNA (Matriz lineal de bits)</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>La computadora lee la cuadrícula por filas y genera esta cadena de bits:</p>
                  
                  <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    backgroundColor: 'var(--bg-input)',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    {(() => {
                      const rows = [];
                      for (let i = 0; i < pixels.length; i += gridSize) {
                        rows.push(pixels.slice(i, i + gridSize).join(''));
                      }
                      return rows.map((row, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '2px' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Fila {idx + 1}:</span>
                          <strong style={{ letterSpacing: '4px', color: 'var(--color-accent)' }}>{row}</strong>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--color-alert)', marginBottom: '0.5rem' }}>3. RECONSTRUCCIÓN Y TAMAÑO</h4>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    Resolución: <strong>{gridSize} x {gridSize} = {pixels.length} píxeles</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                    Profundidad de color: <strong>1 bit por píxel</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                    Tamaño en disco sin compresión: <strong style={{ color: 'var(--color-accent)' }}>{pixels.length} bits ({pixels.length / 8} bytes)</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Comprendiste cómo cada celda pintada es leída y transmitida de forma lineal en la memoria."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: RECONSTRUCCIÓN DESDE BITS (DESAFÍO) */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Reconstrucción desde bits</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Te damos una cadena de bits de 32 elementos. Ajustá las dimensiones del ancho y el alto para formar la cara simétrica.
          </p>

          {a2Prediction === '' ? (
            <PredictionBox
              activityId="m4_a2"
              prompt="Si la secuencia lineal tiene 32 bits, ¿cuál debe ser el ancho y alto del mapa de bits para que la imagen no sobre ni falte espacio? (ancho * alto = 32)."
              onPredict={handlePredictA2}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '1rem' }}>Ajustar dimensiones de reconstrucción:</h4>
                
                <div className="flex" style={{ marginBottom: '1rem' }}>
                  <label htmlFor="recon-w">
                    Ancho:
                    <input
                      id="recon-w"
                      type="number"
                      className="input"
                      style={{ width: '80px', marginLeft: '0.5rem' }}
                      min="1"
                      max="32"
                      value={reconWidth}
                      onChange={(e) => setReconWidth(Math.max(1, Number(e.target.value)))}
                    />
                  </label>
                  <label htmlFor="recon-h">
                    Alto:
                    <input
                      id="recon-h"
                      type="number"
                      className="input"
                      style={{ width: '80px', marginLeft: '0.5rem' }}
                      min="1"
                      max="32"
                      value={reconHeight}
                      onChange={(e) => setReconHeight(Math.max(1, Number(e.target.value)))}
                    />
                  </label>
                </div>

                <div className="flex" style={{ gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button className="btn btn-primary" onClick={checkA2Challenge} disabled={!isValidMatrix(reconWidth, reconHeight, binaryString.length)}>
                    Reconstruir y Comprobar
                  </button>
                  <span style={{ fontSize: '0.85rem', color: (reconWidth * reconHeight !== 32) ? 'var(--color-danger)' : 'var(--color-accent)' }}>
                    Total píxeles en matriz: {reconWidth * reconHeight} / 32
                  </span>
                </div>

                {a2ShowFeedback && a2Explanation === '' && (
                  <ExplanationBox
                    activityId="m4_a2"
                    prompt="Explicá por qué la imagen se desordena o deforma cuando ingresás dimensiones incorrectas, incluso si la multiplicación de ancho y alto es 32."
                    onExplain={handleExplainA2}
                  />
                )}
              </div>

              {/* Panel de renderizado del dibujo reconstruido */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h4 style={{ color: 'var(--color-alert)', alignSelf: 'flex-start', marginBottom: '1rem' }}>3. IMAGEN RECONSTRUIDA</h4>
                
                {isValidMatrix(reconWidth, reconHeight, binaryString.length) ? (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${reconWidth}, 24px)`,
                    gap: '1px',
                    backgroundColor: 'var(--border-color)',
                    border: '2px solid var(--border-color)',
                    borderRadius: '4px'
                  }}>
                    {binaryString.split('').map((bit, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: bit === '1' ? 'hsl(220, 25%, 10%)' : 'hsl(0, 0%, 95%)'
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{ color: 'var(--color-danger)', textAlign: 'center', padding: '1rem' }}>
                    Las dimensiones ingresadas deben multiplicar exactamente 32.
                  </div>
                )}
              </div>
            </div>
          )}

          {a2ShowFeedback !== null && (
            <FeedbackPanel
              success={a2ShowFeedback}
              message={a2FeedbackMsg}
              hints={[
                "Un ancho de 8 y un alto de 4 da exactamente 32 píxeles.",
                "Esa dimensión hace que los 'unos' dibujen los ojos de forma simétrica en los renglones."
              ]}
              onNext={a2Completed ? () => setActivityIdx(2) : undefined}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 3: BINARIZADOR DE FOTOS (LABORATORIO) */}
      {activityIdx === 2 && (
        <div>
          <h3>Actividad 3: Binarizador de fotos</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Cargá una foto local. Se procesará localmente a blanco y negro de 1 bit por píxel. Ajustá el umbral de luminosidad.
          </p>

          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            <div className="panel">
              <h4 style={{ marginBottom: '0.5rem' }}>Subir imagen:</h4>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ marginBottom: '1.5rem' }}
                aria-label="Cargar archivo de imagen"
              />

              {imageLoaded && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="thresh-slider" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span>Ajustar umbral de brillo: <strong>{threshold}</strong></span>
                    <input
                      id="thresh-slider"
                      type="range"
                      min="10"
                      max="240"
                      value={threshold}
                      onChange={(e) => setThreshold(Number(e.target.value))}
                      style={{ accentColor: 'var(--color-accent)' }}
                    />
                  </label>
                </div>
              )}

              {imageLoaded && (
                <ExplanationBox
                  activityId="m4_a3"
                  prompt="Explicá con tus palabras qué sucede con la cantidad de bits de la imagen cuando movés el deslizador. ¿Cambia el tamaño del archivo o solo cambia el dibujo?"
                  onExplain={() => { setA3Completed(true); onComplete(); }}
                />
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <h4 style={{ alignSelf: 'flex-start', margin: 0 }}>Visualización del procesado (32x32 píxeles):</h4>
              
              <div className="flex" style={{ gap: '2rem', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Original (Escalado)</p>
                  <canvas ref={originalCanvasRef} style={{ width: '128px', height: '128px', border: '1px solid var(--border-color)', imageRendering: 'pixelated' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Binarizado (1 bit)</p>
                  <canvas ref={binarizedCanvasRef} style={{ width: '128px', height: '128px', border: '1px solid var(--border-color)', imageRendering: 'pixelated' }} />
                </div>
              </div>

              {imageLoaded && (
                <div style={{ borderTop: '1px solid var(--border-color)', width: '100%', paddingTop: '1rem', fontSize: '0.9rem' }}>
                  <p>Resolución procesada: <strong>32 x 32 = 1.024 píxeles</strong></p>
                  <p>Profundidad de color: <strong>1 bit por píxel</strong></p>
                  <p>Tamaño teórico binario: <strong style={{ color: 'var(--color-accent)' }}>{binarizedSizeBits} bits (128 bytes)</strong></p>
                </div>
              )}
            </div>
          </div>

          {a3Completed && (
            <FeedbackPanel
              success={true}
              message="Has completado el Módulo 4 de imágenes y mapas de bits. Aprendiste a editar matrices y a procesar imágenes reales en 1 bit."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
