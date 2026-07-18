import React, { useState } from 'react';
import { PredictionBox } from './PredictionBox';
import { ExplanationBox } from './ExplanationBox';
import { FeedbackPanel } from './FeedbackPanel';

interface Module0TutorialProps {
  onComplete: () => void;
}

export const Module0Tutorial: React.FC<Module0TutorialProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [prediction, setPrediction] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  const steps = [
    {
      title: "Paso 1: Entrada de Datos",
      desc: "Escribís la letra 'A' usando el teclado. Para vos es un símbolo visual, pero el teclado detecta la presión física y envía una señal eléctrica inicial por los cables.",
      visual: "[Presión de tecla A] -- Enlace Eléctrico --> Computadora"
    },
    {
      title: "Paso 2: Codificación",
      desc: "La computadora no entiende qué es una 'A'. Busca en una tabla de reglas acordadas (como la tabla ASCII) y encuentra que la 'A' equivale al decimal 65. Luego, convierte ese 65 a binario: 01000001.",
      visual: "Carácter 'A'  -->  Decimal 65  -->  Binario 01000001"
    },
    {
      title: "Paso 3: Almacenamiento y Procesamiento",
      desc: "El patrón de bits 01000001 se almacena en los transistores de la memoria. Físicamente, podés pensarlo como 8 lamparitas alineadas: apagada (0), encendida (1), apagada (0), etc. La electricidad fluye por estos carriles.",
      visual: "Memoria: [ APAGADA ] [ ENCENDIDA ] [ APAGADA ] [ APAGADA ] [ APAGADA ] [ APAGADA ] [ APAGADA ] [ ENCENDIDA ]"
    },
    {
      title: "Paso 4: Decodificación",
      desc: "Cuando querés ver la letra, la CPU lee la secuencia de lamparitas 01000001 y se la pasa al procesador gráfico, el cual consulta las reglas de la tipografía y sabe que debe dibujar una letra 'A' usando píxeles.",
      visual: "Binario 01000001  -->  Decodificador  -->  Matriz de dibujo de 'A'"
    },
    {
      title: "Paso 5: Salida",
      desc: "El monitor enciende los píxeles de la pantalla para formar el dibujo de la letra 'A' en la pantalla. ¡Ahora tus ojos vuelven a interpretar la luz de la pantalla como la letra original!",
      visual: "[ Píxeles del monitor activos ] --> Letra 'A' visible"
    }
  ];

  const handlePredict = (pred: string) => {
    setPrediction(pred);
    setStep(1);
  };

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleExplain = (exp: string) => {
    setExplanation(exp);
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div>
      <h2>Módulo 0: Tutorial: del mundo al bit</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Comprendé el proceso de cómo viajan los datos físicos hacia la memoria de la computadora y cómo se decodifican.
      </p>

      {/* Cápsula de Teoría - Módulo 0 */}
      <div className="panel" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-accent)' }}>
        <div className="flex" style={{ justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setShowTheory(!showTheory)}>
          <h4 style={{ margin: 0, color: 'var(--color-accent)' }}>El camino de la información (Un poco de teoría)</h4>
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
              En nuestro mundo físico, nos comunicamos usando formas continuas como la voz, la luz o dibujos en papel. 
              Sin embargo, las computadoras son dispositivos eléctricos que solo pueden entender y almacenar dos estados: 
              si pasa corriente (<strong>1</strong>) o si no pasa corriente (<strong>0</strong>).
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              Para procesar cualquier información, la computadora sigue un ciclo de tres etapas principales:
            </p>
            <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
              <li><strong>Entrada (Input):</strong> Un periférico (teclado, mouse, micrófono) detecta una acción física del mundo exterior y la envía a la máquina.</li>
              <li><strong>Codificación y Procesamiento:</strong> El procesador traduce esa entrada a números binarios (bits) bajo reglas fijas y los guarda como pequeños transistores apagados (0) o encendidos (1).</li>
              <li><strong>Salida (Output):</strong> El procesador lee esos bits de la memoria, los decodifica y enciende píxeles en la pantalla o vibra los parlantes para devolvernos información comprensible.</li>
            </ul>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              💡 En esta actividad interactiva vas a poder ver el camino completo que recorre la letra "A" desde que pulsás la tecla hasta que aparece dibujada en la pantalla.
            </p>
          </div>
        )}
      </div>

      {/* Ciclo Mileva: Fase Predicción */}
      {prediction === '' ? (
        <PredictionBox
          activityId="m0_a1"
          prompt="Una letra 'A' en tu teclado viaja hasta guardarse en el procesador. ¿De qué forma se almacena en la memoria y cómo vuelve a aparecer en la pantalla? ¿Qué cambia en el camino?"
          onPredict={handlePredict}
        />
      ) : (
        <div className="grid grid-2">
          {/* Panel Izquierdo: Control y Animación Paso a Paso */}
          <div className="panel">
            <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Simulación del Recorrido</h3>
            
            <div className="card" style={{ borderLeft: '4px solid var(--color-accent)', backgroundColor: 'var(--bg-input)', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: 0 }}>{steps[step].title}</h4>
              <p style={{ fontSize: '0.95rem', margin: '0.5rem 0' }}>{steps[step].desc}</p>
              
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.05rem',
                color: 'var(--color-accent)'
              }}>
                {steps[step].visual}
              </div>
            </div>

            {/* Barra de control */}
            <div className="flex" style={{ justifyContent: 'space-between' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handlePrevStep}
                disabled={step <= 1}
              >
                Anterior
              </button>
              
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Paso {step} de {steps.length - 1}
              </span>

              {step < steps.length - 1 ? (
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Siguiente paso
                </button>
              ) : (
                <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>¡Fin del recorrido!</span>
              )}
            </div>

            {step === steps.length - 1 && explanation === '' && (
              <ExplanationBox
                activityId="m0_a1"
                prompt="Explicá con tus palabras qué diferencia hay entre lo que escribís en el teclado (dato original) y lo que la computadora guarda internamente (patrón de bits en memoria)."
                onExplain={handleExplain}
              />
            )}
          </div>

          {/* Panel Derecho: El Modelo de Tres Paneles Coordinados */}
          <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <h3 style={{ marginBottom: '1rem' }}>Modelo de Tres Paneles</h3>
            
            {/* Panel 1: Dato Original */}
            <div className="card" style={{ opacity: step >= 1 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <h4 style={{ color: 'var(--color-alert)' }}>1. DATO ORIGINAL</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Lo que la persona ingresa:</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>Letra "A"</p>
            </div>

            {/* Panel 2: Representación Digital */}
            <div className="card" style={{ opacity: step >= 2 ? 1 : 0.4, transition: 'opacity 0.3s', marginTop: '1rem' }}>
              <h4 style={{ color: 'var(--color-accent)' }}>2. REPRESENTACIÓN DIGITAL</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Patrón en memoria (lamparitas encendidas/apagadas):</p>
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                {["0", "1", "0", "0", "0", "0", "0", "1"].map((bit, idx) => (
                  <span key={idx} style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: bit === "1" ? 'var(--color-accent)' : 'var(--bg-input)',
                    color: bit === "1" ? 'var(--bg-main)' : 'var(--text-main)',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    border: '1px solid var(--border-color)'
                  }}>
                    {bit}
                  </span>
                ))}
              </div>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem' }}>
                Decimal: <strong>65</strong> | Hex: <strong>41</strong> | UTF-8: <strong>1 byte</strong>
              </p>
            </div>

            {/* Panel 3: Reconstrucción */}
            <div className="card" style={{ opacity: step >= 4 ? 1 : 0.4, transition: 'opacity 0.3s', marginTop: '1rem' }}>
              <h4 style={{ color: 'var(--color-alert)' }}>3. RECONSTRUCCIÓN</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Lo que la computadora interpreta y muestra:</p>
              <div style={{ 
                marginTop: '0.5rem',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-input)',
                borderRadius: '8px',
                border: '2px solid var(--color-accent)',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                A
              </div>
            </div>
          </div>
        </div>
      )}

      {isCompleted && (
        <FeedbackPanel
          success={true}
          message="Completaste el tutorial de inicio. Entendiste el concepto clave: la computadora no almacena letras o dibujos directamente; almacena patrones de impulsos que interpreta según reglas preestablecidas."
          hints={[]}
        />
      )}
    </div>
  );
};
