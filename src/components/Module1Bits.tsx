import React, { useState } from 'react';
import { getCombinations, binaryToDecimal } from '../utils/binaryHelpers';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module1BitsProps {
  onComplete: () => void;
}

export const Module1Bits: React.FC<Module1BitsProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1
  const [a1Bits, setA1Bits] = useState<number[]>([0, 0, 0, 0]);
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  // Estados Actividad 2
  const [a2Bits, setA2Bits] = useState<number[]>([0, 0, 0, 0]);
  const [a2Prediction, setA2Prediction] = useState('');
  const [a2Explanation, setA2Explanation] = useState('');
  const [a2Completed, setA2Completed] = useState(false);
  const [a2ShowFeedback, setA2ShowFeedback] = useState<boolean | null>(null);
  const [a2FeedbackMsg, setA2FeedbackMsg] = useState('');

  // Estados Actividad 3
  const [a3Size, setA3Size] = useState(8);
  const [a3Explanation, setA3Explanation] = useState('');
  const [a3Completed, setA3Completed] = useState(false);

  const handleA1BitsCountChange = (count: number) => {
    setA1Bits(Array(count).fill(0));
  };

  const toggleA1Bit = (index: number) => {
    setA1Bits(prev => {
      const next = [...prev];
      next[index] = next[index] === 0 ? 1 : 0;
      return next;
    });
  };

  const a1DecimalValue = binaryToDecimal(a1Bits.join(''));
  const a1BinaryStr = a1Bits.join('');

  const toggleA2Bit = (index: number) => {
    setA2Bits(prev => {
      const next = [...prev];
      next[index] = next[index] === 0 ? 1 : 0;
      return next;
    });
  };

  const a2DecimalValue = binaryToDecimal(a2Bits.join(''));

  const checkA2Challenge = () => {
    if (a2DecimalValue === 5) {
      setA2ShowFeedback(true);
      setA2FeedbackMsg("¡Correcto! El patrón binario 0101 representa exactamente al número decimal 5 (valores posicionales activos: 4 + 1 = 5).");
    } else {
      setA2ShowFeedback(false);
      let detail = "";
      if (a2Bits[1] === 0) {
        detail = "La lamparita de valor posicional 4 está apagada.";
      } else if (a2Bits[3] === 0) {
        detail = "La lamparita de valor posicional 1 está apagada.";
      } else {
        detail = `Tu patrón actual suma ${a2DecimalValue}, pero necesitamos que sume exactamente 5.`;
      }
      setA2FeedbackMsg(`Incorrecto. ${detail} Revisá los valores posicionales de los bits [8, 4, 2, 1].`);
    }
  };

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  const handlePredictA2 = (pred: string) => {
    setA2Prediction(pred);
  };

  const handleExplainA2 = (exp: string) => {
    setA2Explanation(exp);
    setA2Completed(true);
  };

  const handleExplainA3 = (exp: string) => {
    setA3Explanation(exp);
    setA3Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 1: Bits, bytes y sistema binario</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Explorá la unidad mínima de información: el bit. Podés pensarlo como una hilera de lamparitas: si la lamparita está encendida representa un 1, y si está apagada representa un 0.
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Interruptores y lamparitas
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Desafío de patrón (Formar 5)
        </button>
        <button
          className={`btn ${activityIdx === 2 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(2)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 3: Capacidad de bits
        </button>
      </div>

      {/* ACTIVIDAD 1: INTERRUPTORES DE BITS */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Interruptores y lamparitas</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Elegí la cantidad de lamparitas (1, 2, 4 u 8) y hacé clic en los interruptores para prenderlas o apagarlas.
          </p>

          {/* Panel de Teoría Adaptado */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>¿Cómo funciona el sistema binario? (Un poco de teoría)</h4>
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
                  En la computadora, la información se representa utilizando <strong>bits</strong>. Un bit es la unidad más chica de información.
                  Podés imaginarlo como una <strong>lamparita</strong>:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>Si la lamparita está <strong>apagada</strong>, representa el valor <strong>0</strong>.</li>
                  <li>Si la lamparita está <strong>encendida</strong>, representa el valor <strong>1</strong>.</li>
                </ul>
                <p style={{ marginTop: '0.5rem' }}>
                  Cuando agrupamos varias lamparitas en una hilera, cada una tiene un <strong>valor de posición</strong> diferente. 
                  Este valor representa cuánto suma esa lamparita al total si está encendida, y se duplica cada vez que nos movemos un casillero hacia la izquierda:
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  margin: '1rem 0',
                  padding: '0.75rem',
                  backgroundColor: 'var(--bg-input)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ textAlign: 'center' }}>[Posición 4] <br /> Suma: <strong>8</strong></div>
                  <div>→</div>
                  <div style={{ textAlign: 'center' }}>[Posición 3] <br /> Suma: <strong>4</strong></div>
                  <div>→</div>
                  <div style={{ textAlign: 'center' }}>[Posición 2] <br /> Suma: <strong>2</strong></div>
                  <div>→</div>
                  <div style={{ textAlign: 'center' }}>[Posición 1] <br /> Suma: <strong>1</strong></div>
                </div>
                 <p>
                  Si una lamparita está encendida (1), se suma su valor posicional al total. Si está apagada (0), no se suma nada. 
                  ¡La suma de todas las posiciones encendidas nos da el número decimal final!
                </p>

                {/* Cápsula matemática de descomposiciones de bases */}
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-color)' }}>
                  <strong style={{ color: 'var(--color-alert)' }}>¿De dónde salen el 1, 2, 4, 8... y por qué se duplican?</strong>
                  <p style={{ marginTop: '0.25rem' }}>
                    Todos los días usamos el <strong>sistema decimal (Base 10)</strong>. Cuando escribís el número 345, descomponés según la posición de sus dígitos (Unidades, Decenas, Centenas):
                  </p>
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    margin: '0.5rem 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem'
                  }}>
                    345 = (<strong>3</strong> × 100) &nbsp;+&nbsp; (<strong>4</strong> × 10) &nbsp;+&nbsp; (<strong>5</strong> × 1)
                  </div>
                  <p style={{ fontSize: '0.9rem' }}>
                    ¡Las posiciones en el sistema decimal van multiplicándose por 10 a medida que vas a la izquierda! (1, 10, 100, 1000...).
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>
                    El <strong>sistema binario (Base 2)</strong> funciona exactamente igual, ¡pero multiplicando por 2 en cada posición! (1, 2, 4, 8, 16...). 
                    Como solo tenemos dos opciones (0 o 1), la descomposición de un patrón binario como <strong>0101</strong> se realiza multiplicando cada dígito por el valor de su casillero:
                  </p>
                  <div style={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    margin: '0.5rem 0',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem'
                  }}>
                    0101 = (<strong>0</strong> × 8) &nbsp;+&nbsp; (<strong>1</strong> × 4) &nbsp;+&nbsp; (<strong>0</strong> × 2) &nbsp;+&nbsp; (<strong>1</strong> × 1) <br />
                    0101 = 0 &nbsp;+&nbsp; 4 &nbsp;+&nbsp; 0 &nbsp;+&nbsp; 1 = <strong>5</strong>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                    Al encender la lamparita (ponerla en 1), le estás diciendo a la computadora: <em>"Sumá el valor posicional de este casillero al total"</em>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m1_a1"
              prompt="Si tenés 4 lamparitas independientes, ¿cuántas combinaciones diferentes de encendido y apagado pensás que podés representar en total?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              {/* Panel de control de bits */}
              <div className="panel">
                <h4 style={{ marginBottom: '1rem' }}>Cantidad de bits (lamparitas):</h4>
                <div className="flex" style={{ marginBottom: '1rem' }}>
                  {[1, 2, 4, 8].map(count => (
                    <button
                      key={count}
                      className="btn btn-secondary"
                      onClick={() => handleA1BitsCountChange(count)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        fontSize: '0.85rem',
                        borderColor: a1Bits.length === count ? 'var(--color-accent)' : 'var(--border-color)'
                      }}
                    >
                      {count} {count === 1 ? 'lamparita' : 'lamparitas'}
                    </button>
                  ))}
                </div>

                {/* Interruptores */}
                <h4 style={{ marginBottom: '0.5rem' }}>1. DATO ORIGINAL (Interruptores):</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {a1Bits.map((bit, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Valor: {Math.pow(2, a1Bits.length - 1 - idx)}
                      </span>
                      <button
                        className="btn"
                        onClick={() => toggleA1Bit(idx)}
                        aria-label={`Lamparita con valor posicional ${Math.pow(2, a1Bits.length - 1 - idx)}. Estado: ${bit === 1 ? 'encendida' : 'apagada'}`}
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: bit === 1 ? 'var(--color-accent)' : 'var(--bg-input)',
                          color: bit === 1 ? 'var(--bg-main)' : 'var(--text-main)',
                          border: '2px solid var(--border-color)',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      >
                        {bit}
                      </button>
                      <span style={{ fontSize: '0.7rem', color: bit === 1 ? 'var(--color-accent)' : 'var(--text-muted)' }}>
                        {bit === 1 ? 'ENCENDIDA' : 'APAGADA'}
                      </span>
                    </div>
                  ))}
                </div>

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m1_a1"
                    prompt="Explicá con tus palabras qué relación encontrás entre prender/apagar las lamparitas y los números decimales."
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                  </div>
                )}
              </div>

              {/* Panel de visualización */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>2. REPRESENTACIÓN DIGITAL</h4>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Patrón binario:</span>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', letterSpacing: '4px', margin: '0.25rem 0' }}>
                      {a1BinaryStr.match(/.{1,4}/g)?.join(' ') || a1BinaryStr}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Agrupación en memoria:</span>
                    <p style={{ fontSize: '1rem', marginTop: '0.25rem' }}>
                      {a1Bits.length === 8 ? (
                        <span>Forma exactamente <strong>1 byte (8 bits)</strong>.</span>
                      ) : a1Bits.length === 4 ? (
                        <span>Forma exactamente <strong>1 nibble (4 bits)</strong>.</span>
                      ) : (
                        <span>Se compone de <strong>{a1Bits.length} bits</strong>.</span>
                      )}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--color-alert)', marginBottom: '0.5rem' }}>3. RECONSTRUCCIÓN</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    Suma decimal resultante: <strong style={{ fontSize: '1.3rem', color: 'var(--color-accent)' }}>{a1DecimalValue}</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                    Combinaciones posibles con {a1Bits.length} {a1Bits.length === 1 ? 'bit' : 'bits'}: <strong style={{ fontSize: '1.2rem' }}>{getCombinations(a1Bits.length)}</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Has explorado cómo las lamparitas binarias representan valores decimales y cuántas combinaciones posibles habilitan."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: CONSTRUCTOR DE PATRONES (DESAFÍO) */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Desafío de patrón (Formar 5)</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Tu misión es encender las lamparitas correctas para representar el número **5** en sistema decimal.
          </p>

          {a2Prediction === '' ? (
            <PredictionBox
              activityId="m1_a2"
              prompt="Para sumar exactamente 5 usando bits con valores posicionales 8, 4, 2 y 1, ¿cuáles pensás que tienen que estar encendidas?"
              onPredict={handlePredictA2}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              {/* Panel de manipulación */}
              <div className="panel">
                <h4 style={{ marginBottom: '0.75rem' }}>1. DATO ORIGINAL (4 lamparitas):</h4>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {a2Bits.map((bit, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Valor: {Math.pow(2, 4 - 1 - idx)}
                      </span>
                      <button
                        className="btn"
                        onClick={() => toggleA2Bit(idx)}
                        aria-label={`Lamparita con valor posicional ${Math.pow(2, 4 - 1 - idx)}. Estado: ${bit === 1 ? 'encendida' : 'apagada'}`}
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: bit === 1 ? 'var(--color-accent)' : 'var(--bg-input)',
                          color: bit === 1 ? 'var(--bg-main)' : 'var(--text-main)',
                          border: '2px solid var(--border-color)',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      >
                        {bit}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <button className="btn btn-primary" onClick={checkA2Challenge}>
                    Comprobar resultado
                  </button>
                  <button className="btn btn-secondary" onClick={() => setA2Bits([0, 0, 0, 0])}>
                    Reiniciar
                  </button>
                </div>

                {a2ShowFeedback && a2Explanation === '' && (
                  <ExplanationBox
                    activityId="m1_a2"
                    prompt="Explicá cómo decidiste qué interruptores activar. ¿Qué lamparitas son responsables de formar el número 5?"
                    onExplain={handleExplainA2}
                  />
                )}
              </div>

              {/* Panel de representación */}
              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>2. REPRESENTACIÓN DIGITAL</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Patrón binario resultante:</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', letterSpacing: '4px' }}>
                    {a2Bits.join('')}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--color-alert)', marginBottom: '0.5rem' }}>3. RECONSTRUCCIÓN</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    Valor decimal construido: <strong style={{ fontSize: '1.3rem', color: 'var(--color-accent)' }}>{a2DecimalValue}</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Objetivo a representar: <strong>5</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {a2ShowFeedback !== null && (
            <FeedbackPanel
              success={a2ShowFeedback}
              message={a2FeedbackMsg}
              hints={[
                "Los valores posicionales para 4 bits son: 8, 4, 2, 1 (de izquierda a derecha).",
                "Para obtener 5, tenés que encender las lamparitas de valores 4 y 1, porque 4 + 1 = 5."
              ]}
              onNext={a2Completed ? () => setActivityIdx(2) : undefined}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 3: EXPLORADOR DE CAPACIDAD (LABORATORIO) */}
      {activityIdx === 2 && (
        <div>
          <h3>Actividad 3: Capacidad de bits</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Modificá la cantidad de bits deslizando la barra y descubrí el crecimiento exponencial de combinaciones.
          </p>

          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            <div className="panel">
              <h4 style={{ marginBottom: '1rem' }}>Elegir bits (1 a 16):</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={a3Size}
                  onChange={(e) => setA3Size(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-accent)' }}
                  aria-label="Cantidad de bits slider de 1 a 16"
                />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '3ch', textAlign: 'right' }}>
                  {a3Size}
                </span>
              </div>

              {a3Explanation === '' ? (
                <ExplanationBox
                  activityId="m1_a3"
                  prompt="Si agregás una sola lamparita más a tu hilera, ¿qué sucede con el número total de combinaciones? ¿Por qué?"
                  onExplain={handleExplainA3}
                />
              ) : (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                </div>
              )}
            </div>

            <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>2. CAPACIDAD DE REPRESENTACIÓN</h4>
                <p style={{ fontSize: '0.95rem' }}>
                  Fórmula exponencial: <strong>2<sup>n</sup></strong>
                </p>
                <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                  Cálculo: 2<sup>{a3Size}</sup> = <strong style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>{getCombinations(a3Size)}</strong> combinaciones posibles.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ color: 'var(--color-alert)', marginBottom: '0.5rem' }}>RANGO DE VALORES</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  Entero sin signo (unsigned): <strong>0 a {getCombinations(a3Size) - 1}</strong>
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  *Los números negativos (con signo) usan otra regla (ej. complemento a 2) y son contenido de profundización.
                </p>
              </div>
            </div>
          </div>

          {a3Completed && (
            <FeedbackPanel
              success={true}
              message="Completaste el Módulo 1 sobre bits, bytes y sistema binario. Ahora comprendés la ley exponencial que rige a las computadoras."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
