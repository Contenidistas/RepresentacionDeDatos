import React, { useState } from 'react';
import { encodeTextToBytes, binaryToDecimal } from '../utils/binaryHelpers';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module3TextProps {
  onComplete: () => void;
}

export const Module3Text: React.FC<Module3TextProps> = ({ onComplete }) => {
  const [activityIdx, setActivityIdx] = useState(0);
  const [showTheory, setShowTheory] = useState(true);

  // Estados Actividad 1 (Codificador y Máquina de escribir)
  const [a1Text, setA1Text] = useState("A");
  const [a1Encoding, setA1Encoding] = useState<'ascii' | 'utf8'>('utf8');
  const [a1EditingCharIdx, setA1EditingCharIdx] = useState<number | null>(null);
  const [a1AlteredBits, setA1AlteredBits] = useState<string>("");
  const [a1Prediction, setA1Prediction] = useState('');
  const [a1Explanation, setA1Explanation] = useState('');
  const [a1Completed, setA1Completed] = useState(false);

  // Estados Actividad 2 (Mensaje secreto)
  const [a2SecretInput, setA2SecretInput] = useState("");
  const [a2ShowFeedback, setA2ShowFeedback] = useState<boolean | null>(null);
  const [a2FeedbackMsg, setA2FeedbackMsg] = useState("");
  const [a2Prediction, setA2Prediction] = useState('');
  const [a2Explanation, setA2Explanation] = useState('');
  const [a2Completed, setA2Completed] = useState(false);

  // Estados Actividad 3 (Error de transmisión)
  const [a3Bits, setA3Bits] = useState<string[]>(["01000110", "01000001", "01010100", "01001111"]);
  const [a3ShowFeedback, setA3ShowFeedback] = useState<boolean | null>(null);
  const [a3FeedbackMsg, setA3FeedbackMsg] = useState("");
  const [a3Prediction, setA3Prediction] = useState('');
  const [a3Explanation, setA3Explanation] = useState('');
  const [a3Completed, setA3Completed] = useState(false);

  // Métodos Actividad 1
  const encodedList = encodeTextToBytes(a1Text, a1Encoding);

  const startEditingBits = (charIdx: number, currentBin: string) => {
    setA1EditingCharIdx(charIdx);
    setA1AlteredBits(currentBin);
  };

  const toggleA1AlteredBit = (bitIdx: number) => {
    const nextBits = a1AlteredBits.split('');
    nextBits[bitIdx] = nextBits[bitIdx] === '0' ? '1' : '0';
    const newBin = nextBits.join('');
    setA1AlteredBits(newBin);

    const dec = binaryToDecimal(newBin);
    const newChar = String.fromCharCode(dec);
    
    setA1Text(prev => {
      const arr = prev.split('');
      if (a1EditingCharIdx !== null && a1EditingCharIdx < arr.length) {
        arr[a1EditingCharIdx] = newChar;
      }
      return arr.join('');
    });
  };

  const handlePredictA1 = (pred: string) => {
    setA1Prediction(pred);
  };

  const handleExplainA1 = (exp: string) => {
    setA1Explanation(exp);
    setA1Completed(true);
  };

  // Métodos Actividad 2
  const checkA2Challenge = () => {
    const attempt = a2SecretInput.trim().toUpperCase();
    if (attempt === "BITS") {
      setA2ShowFeedback(true);
      setA2FeedbackMsg("¡Correcto! Descifraste el mensaje: B - I - T - S.");
    } else {
      setA2ShowFeedback(false);
      setA2FeedbackMsg(`Incorrecto. Ingresaste "${attempt}". Recordá que 66='B', 73='I', 84='T' y 83='S'.`);
    }
  };

  const handlePredictA2 = (pred: string) => {
    setA2Prediction(pred);
  };

  const handleExplainA2 = (exp: string) => {
    setA2Explanation(exp);
    setA2Completed(true);
  };

  // Métodos Actividad 3
  const toggleA3Bit = (charIdx: number, bitIdx: number) => {
    const nextBits = [...a3Bits];
    const bitsArr = nextBits[charIdx].split('');
    bitsArr[bitIdx] = bitsArr[bitIdx] === '0' ? '1' : '0';
    nextBits[charIdx] = bitsArr.join('');
    setA3Bits(nextBits);
  };

  const getA3DecodedWord = () => {
    return a3Bits.map(bin => {
      const dec = binaryToDecimal(bin);
      return String.fromCharCode(dec);
    }).join('');
  };

  const checkA3Challenge = () => {
    const word = getA3DecodedWord();
    if (word === "GATO") {
      setA3ShowFeedback(true);
      setA3FeedbackMsg("¡Excelente! Encontraste el bit erróneo en la letra F (01000110) y lo cambiaste a G (01000111). ¡Reparaste el error de transmisión!");
    } else {
      setA3ShowFeedback(false);
      setA3FeedbackMsg(`Tu palabra actual es "${word}". Acordate que la letra 'G' tiene el código decimal 71 (binario 01000111).`);
    }
  };

  const handlePredictA3 = (pred: string) => {
    setA3Prediction(pred);
  };

  const handleExplainA3 = (exp: string) => {
    setA3Explanation(exp);
    setA3Completed(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 3: Texto, ASCII y Unicode</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Escribí palabras y observá cómo cada carácter se convierte en un código numérico y luego en un patrón de bits (hileras de lamparitas).
      </p>

      {/* Selector de sub-actividad */}
      <div className="flex" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activityIdx === 0 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(0)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 1: Codificador de caracteres
        </button>
        <button
          className={`btn ${activityIdx === 1 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 2: Mensaje secreto
        </button>
        <button
          className={`btn ${activityIdx === 2 ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActivityIdx(2)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          Actividad 3: Error de transmisión
        </button>
      </div>

      {/* ACTIVIDAD 1: CODIFICADOR Y MÁQUINA DE ESCRIBIR */}
      {activityIdx === 0 && (
        <div>
          <h3>Actividad 1: Máquina de escribir binaria</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Escribí texto en la caja. Hacé clic en la secuencia de lamparitas de un carácter para modificar sus bits a mano.
          </p>

          {/* Panel de Teoría - Módulo 3 */}
          <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
            <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
              <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>¿Cómo representan texto las computadoras? (Un poco de teoría)</h4>
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
                  Las computadoras no guardan dibujos de las letras en su memoria. En su lugar, a cada carácter (letra, número, espacio, tilde o emoji) le asignan un <strong>código numérico</strong> único, el cual luego se guarda como una hilera de bits (lamparitas).
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  A lo largo de la historia de la informática se crearon distintas tablas de reglas (codificaciones):
                </p>
                <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Codificación ASCII:</strong> Creada en los años 60 en Estados Unidos. Utilizaba originalmente 7 bits por carácter, lo que permitía representar solo 128 símbolos (abecedario en inglés sin eñes, sin tildes ni caracteres especiales). Ocupa siempre <strong>1 byte (8 bits)</strong> por carácter en disco.
                  </li>
                  <li>
                    <strong>Codificación UTF-8 (Unicode):</strong> Es el estándar universal moderno. Permite representar más de 140.000 caracteres de todos los idiomas y emojis del mundo. Es de <strong>longitud variable</strong>: los caracteres del inglés básico ocupan 1 byte (8 bits/lamparitas), pero las letras especiales del español (como la <em>ñ</em> o la <em>á</em>) ocupan 2 bytes (16 bits) y los emojis ocupan 4 bytes (32 bits).
                  </li>
                </ul>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  💡 En la máquina de escribir vas a poder ingresar texto, elegir el sistema de codificación, ver cuántos bytes ocupa y hacer clic sobre las lamparitas para alterar directamente su código numérico y mutar las letras.
                </p>
              </div>
            )}
          </div>

          {a1Prediction === '' ? (
            <PredictionBox
              activityId="m3_a1"
              prompt="Si escribís un carácter español como la eñe 'ñ' o una vocal acentuada como la 'á', ¿qué pensás que pasará en la codificación ASCII tradicional?"
              onPredict={handlePredictA1}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>1. DATO ORIGINAL:</h4>
                <input
                  type="text"
                  className="input"
                  value={a1Text}
                  onChange={(e) => {
                    setA1Text(e.target.value);
                    setA1EditingCharIdx(null);
                  }}
                  placeholder="Escribí acá..."
                  aria-label="Caja de texto para codificar"
                  maxLength={15}
                  style={{ marginBottom: '1rem' }}
                />

                <div className="flex" style={{ marginBottom: '1rem' }}>
                  <span>Codificación:</span>
                  <label htmlFor="enc-ascii" className="flex" style={{ cursor: 'pointer' }}>
                    <input
                      id="enc-ascii"
                      type="radio"
                      name="a1-enc"
                      checked={a1Encoding === 'ascii'}
                      onChange={() => { setA1Encoding('ascii'); setA1EditingCharIdx(null); }}
                    />
                    ASCII (7-bit / 1 byte)
                  </label>
                  <label htmlFor="enc-utf8" className="flex" style={{ cursor: 'pointer' }}>
                    <input
                      id="enc-utf8"
                      type="radio"
                      name="a1-enc"
                      checked={a1Encoding === 'utf8'}
                      onChange={() => { setA1Encoding('utf8'); setA1EditingCharIdx(null); }}
                    />
                    Unicode (UTF-8 bytes variables)
                  </label>
                </div>

                {a1EditingCharIdx !== null && (
                  <div className="card" style={{ borderLeft: '4px solid var(--color-alert)', backgroundColor: 'var(--bg-input)', padding: '0.75rem', marginBottom: '1rem' }}>
                    <h4 style={{ color: 'var(--color-alert)', fontSize: '0.9rem' }}>Modificá las lamparitas de la letra seleccionada:</h4>
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem' }}>
                      {a1AlteredBits.split('').map((bit, idx) => (
                        <button
                          key={idx}
                          className="btn"
                          onClick={() => toggleA1AlteredBit(idx)}
                          style={{
                            width: '35px',
                            height: '35px',
                            padding: 0,
                            fontSize: '1rem',
                            backgroundColor: bit === '1' ? 'var(--color-accent)' : 'var(--bg-panel)',
                            color: bit === '1' ? 'var(--bg-main)' : 'var(--text-main)',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          {bit}
                        </button>
                      ))}
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', marginTop: '0.5rem' }} onClick={() => setA1EditingCharIdx(null)}>
                      Cerrar editor de bits
                    </button>
                  </div>
                )}

                {a1Explanation === '' ? (
                  <ExplanationBox
                    activityId="m3_a1"
                    prompt="Explicá por qué al modificar un bit de la letra elegida, esta se transforma inmediatamente en otra letra completamente distinta."
                    onExplain={handleExplainA1}
                  />
                ) : (
                  <p style={{ color: 'var(--color-accent)' }}>Explicación guardada en tu cuaderno.</p>
                )}
              </div>

              <div className="panel" style={{ overflowX: 'auto' }}>
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>2. REPRESENTACIÓN DIGITAL Y RECONSTRUCCIÓN</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.4rem' }}>Letra</th>
                      <th style={{ padding: '0.4rem' }}>Dec</th>
                      <th style={{ padding: '0.4rem' }}>Hex</th>
                      <th style={{ padding: '0.4rem' }}>Binario (Hacer clic para editar)</th>
                      <th style={{ padding: '0.4rem' }}>Bytes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {encodedList.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: a1EditingCharIdx === idx ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>{item.char}</td>
                        <td style={{ padding: '0.5rem', fontFamily: 'var(--font-mono)' }}>{item.dec}</td>
                        <td style={{ padding: '0.5rem', fontFamily: 'var(--font-mono)' }}>{item.hex}</td>
                        <td style={{ padding: '0.5rem' }}>
                          <button
                            className="btn btn-secondary"
                            onClick={() => startEditingBits(idx, item.bin)}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              padding: '0.2rem 0.5rem',
                              fontSize: '0.85rem',
                              border: a1EditingCharIdx === idx ? '1px dashed var(--color-alert)' : '1px solid transparent'
                            }}
                          >
                            {item.bin}
                          </button>
                        </td>
                        <td style={{ padding: '0.5rem' }}>{item.bytes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {a1Completed && (
            <FeedbackPanel
              success={true}
              message="Observaste cómo cada letra tiene asignado un casillero numérico y cómo modificar un bit corrompe la letra original."
              hints={[]}
              onNext={() => setActivityIdx(1)}
            />
          )}
        </div>
      )}

      {/* ACTIVIDAD 2: MENSAJE SECRETO */}
      {activityIdx === 1 && (
        <div>
          <h3>Actividad 2: Descifrar mensaje secreto</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Leé los 4 bytes de lamparitas a la derecha y escribí la palabra de 4 letras mayúsculas resultante.
          </p>

          {a2Prediction === '' ? (
            <PredictionBox
              activityId="m3_a2"
              prompt="El primer byte es 01000010, que es decimal 66. Buscando en la regla ASCII, ¿cuál pensás que es la primera letra?"
              onPredict={handlePredictA2}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Escribí el mensaje descifrado (4 letras en mayúsculas):</h4>
                <input
                  type="text"
                  className="input"
                  value={a2SecretInput}
                  onChange={(e) => setA2SecretInput(e.target.value)}
                  placeholder="Escribí acá..."
                  maxLength={4}
                  style={{ textTransform: 'uppercase', marginBottom: '1rem' }}
                  aria-label="Caja de texto para respuesta del mensaje secreto"
                />

                <div className="flex" style={{ gap: '0.5rem' }}>
                  <button className="btn btn-primary" onClick={checkA2Challenge}>
                    Comprobar respuestas
                  </button>
                </div>

                {a2ShowFeedback && a2Explanation === '' && (
                  <ExplanationBox
                    activityId="m3_a2"
                    prompt="Explicá cómo fuiste buscando los bytes en la tabla decimal para encontrar los caracteres correspondientes."
                    onExplain={handleExplainA2}
                  />
                )}
              </div>

              <div className="panel">
                <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>SECUENCIA DE BYTES SECRETOS</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                  <div>Byte 1: <strong>01000010</strong> (Decimal: 66)</div>
                  <div>Byte 2: <strong>01001001</strong> (Decimal: 73)</div>
                  <div>Byte 3: <strong>01010100</strong> (Decimal: 84)</div>
                  <div>Byte 4: <strong>01010011</strong> (Decimal: 83)</div>
                </div>
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

      {/* ACTIVIDAD 3: ERROR DE TRANSMISIÓN */}
      {activityIdx === 2 && (
        <div>
          <h3>Actividad 3: Reparar un error de transmisión</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Se transmitió la palabra **GATO** pero llegó **FATO**. Hacé clic en los bits del primer byte para transformarlo de F (01000110) a G (01000111).
          </p>

          {a3Prediction === '' ? (
            <PredictionBox
              activityId="m3_a3"
              prompt="Comparando 'F' (01000110) y 'G' (01000111), ¿cuál es el único bit (lamparita) que cambia y en qué posición está?"
              onPredict={handlePredictA3}
            />
          ) : (
            <div className="grid grid-2" style={{ marginTop: '1rem' }}>
              <div className="panel">
                <h4 style={{ marginBottom: '0.5rem' }}>Hacé clic en el bit incorrecto para repararlo:</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {a3Bits.map((bin, charIdx) => (
                    <div key={charIdx} className="flex" style={{ justifyContent: 'space-between', backgroundColor: 'var(--bg-input)', padding: '0.5rem', borderRadius: '8px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 'bold', width: '3ch' }}>
                        {String.fromCharCode(binaryToDecimal(bin))}
                      </span>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        {bin.split('').map((bit, bitIdx) => (
                          <button
                            key={bitIdx}
                            onClick={() => toggleA3Bit(charIdx, bitIdx)}
                            className="btn"
                            disabled={charIdx !== 0}
                            style={{
                              padding: 0,
                              width: '28px',
                              height: '28px',
                              fontSize: '0.85rem',
                              backgroundColor: bit === '1' ? 'var(--color-accent)' : 'var(--bg-panel)',
                              color: bit === '1' ? 'var(--bg-main)' : 'var(--text-main)',
                              border: charIdx === 0 ? '1px dashed var(--color-alert)' : '1px solid var(--border-color)',
                              cursor: charIdx === 0 ? 'pointer' : 'not-allowed'
                            }}
                          >
                            {bit}
                          </button>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        (Dec: {binaryToDecimal(bin)})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex" style={{ gap: '0.5rem' }}>
                  <button className="btn btn-primary" onClick={checkA3Challenge}>
                    Verificar reparación
                  </button>
                  <button className="btn btn-secondary" onClick={() => setA3Bits(["01000110", "01000001", "01010100", "01001111"])}>
                    Reiniciar
                  </button>
                </div>

                {a3ShowFeedback && a3Explanation === '' && (
                  <ExplanationBox
                    activityId="m3_a3"
                    prompt="Describí cómo lograste transformar la F en una G. ¿Qué bit cambiaste y qué valor posicional tiene?"
                    onExplain={handleExplainA3}
                  />
                )}
              </div>

              <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>PALABRA DECODIFICADA ACTUAL</h4>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '8px', color: 'var(--color-alert)', margin: '0.5rem 0' }}>
                    {getA3DecodedWord()}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    Palabra objetivo: <strong>GATO</strong>
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    *G en ASCII es 71, F es 70.
                  </p>
                </div>
              </div>
            </div>
          )}

          {a3ShowFeedback !== null && (
            <FeedbackPanel
              success={a3ShowFeedback}
              message={a3FeedbackMsg}
              hints={[
                "El código de la letra 'F' es 70 (01000110). El de 'G' es 71 (01000111).",
                "El único bit que cambia es el último (valor posicional 1). Hacé clic en el último bit de la primera letra para cambiarlo de 0 a 1."
              ]}
              onNext={a3Completed ? onComplete : undefined}
              isLastActivity={true}
            />
          )}
        </div>
      )}
    </div>
  );
};
