import React, { useState, useRef, useEffect } from 'react';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module10CompressionProps {
  onComplete: () => void;
}

export const Module10Compression: React.FC<Module10CompressionProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (RLE)
  const [rleCode, setRleCode] = useState('');
  const [a1Completed, setA1Completed] = useState(false);
  const [a1ShowFeedback, setA1ShowFeedback] = useState<boolean | null>(null);

  const checkA1Challenge = () => {
    const formatted = rleCode.trim().toUpperCase();
    if (formatted === '6B6N') {
      setA1ShowFeedback(true);
      setA1Completed(true);
    } else {
      setA1ShowFeedback(false);
    }
  };

  // Estados Actividad 2 (JPEG Canvas local)
  const [quality, setQuality] = useState(0.8);
  const [imgSrc, setImgSrc] = useState<string>(''); // Data URL de la imagen cargada
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [a2Completed, setA2Completed] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const rawCanvasRef = useRef<HTMLCanvasElement>(null);

  // Cargar imagen local
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImgSrc(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imgSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = rawCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Escalar la imagen a un tamaño manejable (max 300px) para el visor
      let w = img.width;
      let h = img.height;
      if (w > 300) {
        h = (300 * h) / w;
        w = 300;
      }
      canvas.width = w;
      canvas.height = h;

      ctx.drawImage(img, 0, 0, w, h);

      // Calcular el tamaño comprimido a la calidad seleccionada
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      // Estimar tamaño en KB (el base64 añade ~33% de peso, lo corregimos)
      const base64Len = dataUrl.split(',')[1].length;
      const bytes = (base64Len * 3) / 4;
      setCompressedSize(bytes / 1024);
    };
    img.src = imgSrc;
  }, [imgSrc, quality]);

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación de compresión con pérdida guardada:", exp);
    setA2Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 10: Compresión y formatos</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Diferenciá compresión con pérdida y sin pérdida, y formatos PNG, JPEG y MP3.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Compresión sin pérdida (RLE)
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Compresor JPEG en vivo
        </button>
      </div>

      {/* ACTIVIDAD 1: COMPRESIÓN SIN PÉRDIDA RLE */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Compresión sin pérdida (RLE)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Compromiso sin pérdida: Descubrí cómo la computadora agrupa secuencias repetidas de bits para ahorrar espacio sin alterar el dato.
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>Compresión con y sin pérdida (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  Las computadoras usan <strong>algoritmos de compresión</strong> para reducir el peso de los archivos:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Compresión SIN pérdida:</strong> Reduce el peso agrupando datos redundantes sin perder ningún detalle. Es ideal para textos y programas (ej: ZIP, PNG).
                  </li>
                  <li>
                    <strong>Algoritmo RLE (Run Length Encoding):</strong> Agrupa elementos repetidos seguidos indicando la cantidad. En lugar de guardar `BBBBBBNNNNNN` (12 bits), guarda `6B6N` (indicando 6 Blancos y 6 Negros).
                  </li>
                  <li>
                    <strong>Compresión CON pérdida:</strong> Descarta detalles visuales o auditivos que el cerebro humano casi no percibe (ej: JPEG, MP3). No se puede revertir.
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-2">
            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ margin: 0 }}>Fila de píxeles original:</h4>
              <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--border-color)', padding: '4px', borderRadius: '4px', maxWidth: '240px' }}>
                {Array(6).fill('white').map((_, i) => (
                  <div key={i} style={{ width: '18px', height: '18px', backgroundColor: 'white' }} />
                ))}
                {Array(6).fill('black').map((_, i) => (
                  <div key={i} style={{ width: '18px', height: '18px', backgroundColor: '#222' }} />
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Códificación lineal: BBBB BBNN NNNN (B = Blanco / N = Negro)</span>

              <div style={{ marginTop: '0.5rem' }}>
                <label htmlFor="rle-code" style={{ fontSize: '0.9rem' }}>Escribí el código comprimido RLE:</label>
                <input
                  id="rle-code"
                  type="text"
                  placeholder="Ej: 6B6N"
                  value={rleCode}
                  onChange={(e) => setRleCode(e.target.value)}
                  className="input"
                  style={{ width: '100%', marginTop: '0.25rem' }}
                  disabled={a1Completed}
                />
              </div>

              {!a1Completed && (
                <button className="btn btn-primary" onClick={checkA1Challenge} style={{ alignSelf: 'flex-start' }}>
                  Comprimir
                </button>
              )}
            </div>

            <div className="panel">
              <h4 style={{ color: 'var(--color-accent)' }}>Resultados de la compresión:</h4>
              {a1Completed ? (
                <div>
                  <p>Tamaño inicial: <strong>12 caracteres</strong></p>
                  <p>Tamaño RLE comprimido: <strong>4 caracteres (6B6N)</strong></p>
                  <p style={{ color: 'var(--color-accent)' }}>¡Ahorro de almacenamiento de un 66% sin perder calidad!</p>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>Completá el desafío para ver el ahorro.</p>
              )}
            </div>
          </div>

          {a1ShowFeedback !== null && (
            <FeedbackPanel
              success={a1ShowFeedback}
              message={a1ShowFeedback ? "¡Excelente! Comprimiste la secuencia indicando la cantidad seguida del identificador cromático." : "Intento incorrecto. Pista: Indicá la cantidad (6) de Blancos (B) y la cantidad (6) de Negros (N). Ej: 6B6N"}
              hints={[]}
              onNext={a1Completed ? () => setActivityIdx(1) : undefined}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: COMPRESOR JPEG */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Compresor JPEG en vivo</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Cargá una foto local y deslizá el control de calidad JPEG para ver cómo se degradan los detalles y disminuye el peso del archivo.
          </p>

          <div className="grid grid-2">
            <div className="panel flex" style={{ flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ margin: 0 }}>Cargar foto:</h4>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input"
                style={{ width: '100%' }}
                aria-label="Cargar foto local para compresión JPEG"
              />

              {imgSrc && (
                <div>
                  <span style={{ fontSize: '0.9rem' }}>Calidad JPEG: {Math.round(quality * 100)}%</span>
                  <input
                    type="range"
                    min="0.05"
                    max="1.00"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                    aria-label="Calidad JPEG slider"
                  />
                </div>
              )}

              {imgSrc && a2Completed ? (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                </div>
              ) : imgSrc ? (
                <ExplanationBox
                  activityId="m10_a2"
                  prompt="Explicá por qué la compresión con pérdida (como JPEG) es aceptable para compartir fotos familiares, pero sería catastrófica si la aplicáramos a un archivo de texto o programa."
                  onExplain={handleExplainA2}
                />
              ) : null}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h4 style={{ alignSelf: 'flex-start', margin: '0 0 1rem 0' }}>Previsualización y Peso Estimado:</h4>
              
              {imgSrc ? (
                <div style={{ textAlign: 'center' }}>
                  <canvas
                    ref={rawCanvasRef}
                    style={{
                      maxHeight: '180px',
                      maxWidth: '100%',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px'
                    }}
                  />
                  {compressedSize !== null && (
                    <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold' }}>
                      Tamaño aproximado: <span style={{ color: 'var(--color-alert)', fontSize: '1.2rem' }}>{compressedSize.toFixed(1)} KB</span>
                    </p>
                  )}
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                  Cargá una foto local para iniciar la simulación.
                </div>
              )}
            </div>
          </div>

          {a2Completed && (
            <FeedbackPanel
              success={true}
              message="¡Felicitaciones! Completaste el Módulo 10. Comprendiste cómo actúan los algoritmos de compresión con y sin pérdida."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
