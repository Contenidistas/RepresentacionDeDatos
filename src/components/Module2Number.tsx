import React, { useState } from 'react';
import { decimalToBinary } from '../utils/binaryHelpers';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module2NumberProps {
  onComplete: () => void;
}

export const Module2Number: React.FC<Module2NumberProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Balanza)
  const a1Target = 13; // Peso objetivo constante
  const [a1Bits, setA1Bits] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]); // 8 bits (128 a 1)
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);
  const [a1ShowFeedback, setA1ShowFeedback] = useState<boolean | null>(null);
  const [a1FeedbackMsg, setA1FeedbackMsg] = useState('');

  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  const a1CurrentWeight = a1Bits.reduce((sum, val, idx) => sum + (val === 1 ? weights[idx] : 0), 0);

  const toggleA1Weight = (idx: number) => {
    setA1Bits(prev => {
      const next = [...prev];
      next[idx] = next[idx] === 0 ? 1 : 0;
      return next;
    });
  };

  const checkA1Challenge = () => {
    if (a1CurrentWeight === a1Target) {
      setA1ShowFeedback(true);
      setA1FeedbackMsg(`¡Equilibrio logrado! Conseguiste sumar exactamente ${a1Target} gramos usando las pesas: ${a1Bits.map((v, i) => v === 1 ? weights[i] : 0).filter(v => v > 0).join(' + ')}.`);
    } else {
      setA1ShowFeedback(false);
      setA1FeedbackMsg(`La balanza está desequilibrada. El platillo de pesas tiene ${a1CurrentWeight}g y el objetivo es ${a1Target}g. Intentá encender o apagar otras pesas.`);
    }
  };

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Estados Actividad 2 (Conversor sucesivo)
  const [a2Decimal, setA2Decimal] = useState(65);
  const [a2Completed, setA2Completed] = useState(false);

  const getDivisionsList = (num: number) => {
    const list = [];
    let current = num;
    if (current === 0) {
      list.push({ dividend: 0, quotient: 0, remainder: 0 });
    }
    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      list.push({ dividend: current, quotient, remainder });
      current = quotient;
    }
    return list;
  };

  const a2Divisions = getDivisionsList(a2Decimal);

  const handleExplainA2 = (exp: string) => {
    console.log("Explicación sucesiva guardada:", exp);
    setA2Completed(true);
  };

  // Estados Actividad 3 (Overflow)
  const [a3Counter, setA3Counter] = useState(14);
  const [a3Prediction, setA3Prediction] = useState('');
  const [a3Completed, setA3Completed] = useState(false);
  const [a3ShowFeedback, setA3ShowFeedback] = useState<boolean | null>(null);

  const handlePredictA3 = (pred: string) => {
    setA3Prediction(pred);
  };

  const handleIncrement = () => {
    setA3Counter(prev => {
      const next = prev + 1;
      if (next > 15) {
        setA3ShowFeedback(true);
        return 0; // Se desborda
      }
      return next;
    });
  };

  const getA3BitsStr = (num: number) => {
    const bin = num.toString(2);
    return bin.padStart(4, '0');
  };

  const handleExplainA3 = (exp: string) => {
    console.log("Explicación overflow guardada:", exp);
    setA3Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 2: Números en binario</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Comprendé cómo se representan números enteros más grandes mediante sumas de potencias de 2 (valores posicionales), experimentá con la conversión y entendé el concepto de desbordamiento (overflow).
      </p>

      {/* Navegador de actividades */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: La balanza binaria
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Conversor sucesivo
        </button>
        <button
          className={`btn ${activityIdx === 2 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(2)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 3: Desafío de desbordamiento
        </button>
      </div>

      {/* ACTIVIDAD 1: BALANZA BINARIA */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: La Balanza Binaria</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Tu objetivo es colocar pesas binarias en la balanza para equilibrar el peso decimal propuesto.
          </p>

          {/* Bloque Teórico */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>La Balanza y el Sistema Posicional (Un poco de teoría)</h4>
              <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }} aria-expanded={showTheory}>
                {showTheory ? 'Ocultar teoría ↑' : 'Mostrar teoría ↓'}
              </button>
            </div>
            {showTheory && (
              <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p>
                  En el sistema binario de 8 bits (1 byte), cada una de las 8 posiciones representa un valor fijo duplicado: 
                  <strong> 128, 64, 32, 16, 8, 4, 2 y 1</strong> (de izquierda a derecha).
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  Podés imaginar este sistema como una <strong>balanza de platillos</strong>:
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li>En el platillo derecho tenés un peso misterioso en gramos (sistema decimal).</li>
                  <li>En el platillo izquierdo solo podés colocar pesas que corresponden exactamente a los valores de posición del binario.</li>
                  <li>Al encender una pesa, ponés su bit en 1. Al quitarla, su bit vuelve a 0. ¡Lograr el equilibrio te dará la traducción binaria exacta!</li>
                </ul>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m2_a1"
              prompt="Si el peso objetivo es 13, ¿cuáles de las pesas (128, 64, 32, 16, 8, 4, 2, 1) considerás que deben estar activas?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '1rem' }}>Platillo de Pesas (1 = Activa / 0 = Inactiva):</h4>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {weights.map((w, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w}g</span>
                      <button
                        onClick={() => toggleA1Weight(idx)}
                        className="btn"
                        style={{
                          width: '45px',
                          height: '45px',
                          backgroundColor: a1Bits[idx] === 1 ? 'var(--color-accent)' : 'var(--bg-input)',
                          color: a1Bits[idx] === 1 ? 'var(--bg-main)' : 'var(--text-main)',
                          border: '2px solid var(--border-color)',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}
                      >
                        {a1Bits[idx]}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex" style={{ gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={checkA1Challenge}>
                    Comprobar Equilibrio
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setA1Bits(Array(8).fill(0)); setA1ShowFeedback(null); }}>
                    Reiniciar
                  </button>
                </div>

                {a1ShowFeedback && a1Explanation === '' && (
                  <ExplanationBox
                    activityId="m2_a1"
                    prompt="Explicá con tus palabras qué relación encontrás entre el equilibrio físico de las pesas y la traducción de un número decimal a binario."
                    onExplain={handleExplainA1}
                  />
                )}
              </div>

              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>📟 VISUALIZACIÓN DE LA BALANZA</h4>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-input)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    fontSize: '1.1rem',
                    textAlign: 'center'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Platillo Izquierdo (Pesas)</span>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)', margin: '0.25rem 0 0 0' }}>{a1CurrentWeight}g</p>
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {a1CurrentWeight === a1Target ? '⚖️ (Equilibrio)' : a1CurrentWeight > a1Target ? '◀ (Pesado Izq)' : '▶ (Pesado Der)'}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Platillo Derecho (Objetivo)</span>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-alert)', margin: '0.25rem 0 0 0' }}>{a1Target}g</p>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ color: 'var(--color-alert)', marginBottom: '0.5rem' }}>Patrón Binario Resultante:</h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', letterSpacing: '4px', margin: 0 }}>
                    {a1Bits.join('')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {a1ShowFeedback !== null && (
            <FeedbackPanel
              success={a1ShowFeedback}
              message={a1FeedbackMsg}
              hints={[
                "Para el 13, buscá la pesa de valor posicional más grande que no lo pase (8).",
                "Luego sumale las pesas que hagan falta: 8 + 4 + 1 = 13."
              ]}
              onNext={a1Completed ? () => setActivityIdx(1) : undefined}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: CONVERSOR SUCESIVO */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Conversor sucesivo paso a paso</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Ingresá un número decimal y analizá cómo la computadora calcula el binario dividiendo sucesivamente por 2.
          </p>

          <div className="grid grid-2" style={{ marginTop: '1rem' }}>
            <div className="panel">
              <h4 style={{ marginBottom: '1rem' }}>Ingresá el número decimal (0 a 255):</h4>
              <input
                type="number"
                className="input"
                min="0"
                max="255"
                value={a2Decimal}
                onChange={(e) => setA2Decimal(Math.max(0, Math.min(255, Number(e.target.value))))}
                style={{ marginBottom: '1.5rem' }}
                aria-label="Cargar número decimal para conversor"
              />

              {a2Completed ? (
                <div style={{ padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <p style={{ margin: 0, color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                </div>
              ) : (
                <ExplanationBox
                  activityId="m2_a2"
                  prompt="Explicá por qué las divisiones se hacen por el número 2 y de dónde sale el valor de cada bit resultante (restos)."
                  onExplain={handleExplainA2}
                />
              )}
            </div>

            {/* Panel de divisiones sucesivas */}
            <div className="panel">
              <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Operaciones Sucesivas:</h4>
              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: 'var(--bg-input)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                lineHeight: '1.6'
              }}>
                {a2Divisions.map((div, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', padding: '4px 0' }}>
                    Fila {idx+1}: {div.dividend} ÷ 2 = {div.quotient} (Resto: <strong style={{ color: 'var(--color-alert)' }}>{div.remainder}</strong>)
                  </div>
                ))}
                <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                  Patrón final (leyendo restos de abajo hacia arriba):<br />
                  <strong style={{ fontSize: '1.4rem', color: 'var(--color-accent)', letterSpacing: '2px' }}>
                    {decimalToBinary(a2Decimal).padStart(8, '0')}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {a2Completed && (
            <FeedbackPanel
              success={true}
              message="Analizaste el algoritmo matemático clásico de divisiones por 2 que rige las conversiones de base decimal a base binaria."
              hints={[]}
              onNext={() => setActivityIdx(2)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 3: DESAFÍO DE OVERFLOW */}
      {activityIdx === 2 && (
        <div>
          <h3>Actividad 3: Desafío de desbordamiento (Overflow)</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Incrementá el contador binario de 4 bits. ¿Qué sucede cuando pasa del valor máximo representable?
          </p>

          {a3Prediction === '' ? (
            <PredictionBox
              activityId="m2_a3"
              prompt="Si el contador de 4 bits está en 15 (patrón 1111) e incrementamos en 1, ¿dónde se guarda el valor 16? ¿Qué pensás que ocurrirá visualmente en la memoria?"
              onPredict={handlePredictA3}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '1rem' }}>Contador interactivo (4 bits):</h4>
                
                <div className="flex" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <button className="btn btn-primary" onClick={handleIncrement} style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
                    +1 Incrementar
                  </button>
                  <button className="btn btn-secondary" onClick={() => { setA3Counter(14); setA3ShowFeedback(null); }}>
                    Reiniciar a 14
                  </button>
                </div>

                {a3ShowFeedback && (
                  <ExplanationBox
                    activityId="m2_a3"
                    prompt="Explicá con tus palabras qué le ocurrió al contador al pasar de 15 a 16. ¿Por qué las lamparitas se apagaron en lugar de mostrar 16?"
                    onExplain={handleExplainA3}
                  />
                )}
              </div>

              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>2. ESTADO DE MEMORIA EN CONTADOR</h4>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {getA3BitsStr(a3Counter).split('').map((bit, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Valor: {Math.pow(2, 4 - 1 - idx)}</span>
                        <div style={{
                          width: '100%',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: bit === '1' ? 'var(--color-accent)' : 'var(--bg-input)',
                          color: bit === '1' ? 'var(--bg-main)' : 'var(--text-main)',
                          borderRadius: '8px',
                          fontWeight: 'bold',
                          border: '1px solid var(--border-color)',
                          fontSize: '1.2rem'
                        }}>
                          {bit}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <p style={{ margin: 0, fontSize: '1.1rem' }}>
                    Valor en decimal: <strong style={{ color: 'var(--color-alert)', fontSize: '1.4rem' }}>{a3Counter}</strong>
                  </p>
                  {a3Counter === 0 && a3ShowFeedback && (
                    <p style={{ color: 'var(--color-danger)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                      ⚠️ ¡Desbordamiento (Overflow)! Las lamparitas volvieron a cero.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {a3ShowFeedback && a3Completed && (
            <FeedbackPanel
              success={true}
              message="Completaste el Módulo 2. Comprendiste de forma activa los valores posicionales y cómo las computadoras gestionan el límite físico del desbordamiento numérico."
              hints={[]}
            />
          )}
        </div>
      )}
    </div>
  );
};
