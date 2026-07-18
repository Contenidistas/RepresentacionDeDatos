import React, { useState, useEffect } from 'react';
import { loadProgress } from '../utils/binaryHelpers';

interface DigitalNotebookProps {
  onClose: () => void;
}

export const DigitalNotebook: React.FC<DigitalNotebookProps> = ({ onClose }) => {
  const [studentName, setStudentName] = useState('');
  const [studentGroup, setStudentGroup] = useState('');
  const [teacherName, setTeacherName] = useState('');
  
  // Guardamos las respuestas guardadas en LocalStorage
  const [answers, setAnswers] = useState<Record<string, { prediction?: string; explanation?: string }>>({});

  useEffect(() => {
    // Cargar metadatos
    setStudentName(localStorage.getItem('notebook_student_name') || '');
    setStudentGroup(localStorage.getItem('notebook_student_group') || '');
    setTeacherName(localStorage.getItem('notebook_teacher_name') || '');

    // Cargar todas las respuestas guardadas de las predicciones y explicaciones
    const allAnswers: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('pred_') || key.startsWith('exp_'))) {
        const value = localStorage.getItem(key) || '';
        const activityId = key.substring(5); // corta 'pred_' o 'exp_'
        
        if (!allAnswers[activityId]) {
          allAnswers[activityId] = {};
        }
        
        if (key.startsWith('pred_')) {
          allAnswers[activityId].prediction = value;
        } else {
          allAnswers[activityId].explanation = value;
        }
      }
    }
    setAnswers(allAnswers);
  }, []);

  const handleSaveMeta = () => {
    localStorage.setItem('notebook_student_name', studentName);
    localStorage.setItem('notebook_student_group', studentGroup);
    localStorage.setItem('notebook_teacher_name', teacherName);
    alert("Datos del estudiante guardados localmente.");
  };

  const handleExportText = () => {
    if (!studentName || !studentGroup) {
      alert("Por favor, completá tu nombre y grupo antes de exportar tu cuaderno.");
      return;
    }

    const progress = loadProgress();
    const completed = progress.completedModules || [];

    let textContent = `==================================================\n`;
    textContent += ` CUADERNO DIGITAL: REPRESENTACIÓN DE DATOS\n`;
    textContent += `==================================================\n\n`;
    textContent += `Estudiante: ${studentName}\n`;
    textContent += `Grupo/Clase: ${studentGroup}\n`;
    textContent += `Profesor/a: ${teacherName || 'No especificado'}\n`;
    textContent += `Fecha de exportación: ${new Date().toLocaleDateString('es-UY')}\n\n`;
    textContent += `Módulos Completados: ${completed.join(', ')}\n`;
    textContent += `--------------------------------------------------\n\n`;

    // Mapeo de IDs de actividades a nombres didácticos
    const activityNames: Record<string, string> = {
      "m0_a1": "Módulo 0: Tutorial (El camino de la información)",
      "m1_a1": "Módulo 1: Bits y Bytes (Interruptores)",
      "m1_a2": "Módulo 1: Bits y Bytes (Constructor de 5)",
      "m1_a2_capsule": "Módulo 1: Bits y Bytes (Cápsula de bases numéricas)",
      "m1_a3": "Módulo 1: Bits y Bytes (Capacidad)",
      "m2_a1": "Módulo 2: Números en Binario (Balanza binaria)",
      "m2_a2": "Módulo 2: Números en Binario (Conversor sucesivo)",
      "m2_a3": "Módulo 2: Números en Binario (Desafío de desbordamiento)",
      "m3_a1": "Módulo 3: Texto y ASCII (Codificador)",
      "m3_a2": "Módulo 3: Texto y ASCII (Mensaje secreto)",
      "m3_a3": "Módulo 3: Texto y ASCII (Error de transmisión)",
      "m4_a1": "Módulo 4: Imágenes Binarias (Editor)",
      "m4_a2": "Módulo 4: Imágenes Binarias (Reconstructor)",
      "m4_a3": "Módulo 4: Imágenes Binarias (Binarizador)",
      "m5_a1": "Módulo 5: Escala de Grises (Brillo de píxel)",
      "m5_a2": "Módulo 5: Escala de Grises (Cuantización y banding)",
      "m6_a1": "Módulo 6: Color RGB (Mezclador)",
      "m6_a2": "Módulo 6: Color RGB (Desafío del pintor)",
      "m7_a1": "Módulo 7: Resolución y Tamaño (Calculadora de peso)",
      "m7_a2": "Módulo 7: Resolución y Tamaño (Desafío del disquete)",
      "m8_a1": "Módulo 8: Sonido (Simulador de muestreo)",
      "m8_a2": "Módulo 8: Sonido (Pitido y cuantización)",
      "m9_a1": "Módulo 9: Video (Animador 8x8)",
      "m10_a1": "Módulo 10: Compresión (Desafío RLE)",
      "m10_a2": "Módulo 10: Compresión (Compresor JPEG local)",
      "m11_a1": "Módulo 11: Laboratorio Integrador (Desafío de la Sonda Espacial)",
      "m12_a1": "Módulo 12: Autoevaluación (Quiz conceptual de EBI)"
    };

    Object.keys(answers).forEach((actId) => {
      const name = activityNames[actId] || `Actividad ${actId}`;
      textContent += `📝 ${name}\n`;
      if (answers[actId].prediction) {
        textContent += `   - Hipótesis (Predicción): "${answers[actId].prediction}"\n`;
      }
      if (answers[actId].explanation) {
        textContent += `   - Argumentación (Explicación): "${answers[actId].explanation}"\n`;
      }
      textContent += `\n`;
    });

    textContent += `==================================================\n`;
    textContent += `Entregá este archivo en Plataforma CREA (Ceibal)\n`;
    textContent += `==================================================\n`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cuaderno_Digital_${studentName.replace(/\s+/g, '_')}_${studentGroup}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 15, 30, 0.95)',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '2rem 1rem'
    }} role="dialog" aria-modal="true" aria-labelledby="notebook-title">
      <div className="container" style={{
        backgroundColor: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius)',
        padding: '2rem',
        position: 'relative'
      }}>
        <button onClick={onClose} className="btn btn-secondary" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          Cerrar Cuaderno
        </button>
        <h2 id="notebook-title" style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Mi Cuaderno Digital</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Completá tus datos personales. Tus predicciones y explicaciones se guardarán automáticamente en esta sección. Al finalizar el trabajo, exportá el archivo para entregárselo a tu profesor en la Plataforma CREA.
        </p>

        <div className="grid grid-2" style={{ marginBottom: '2rem' }}>
          <div className="panel flex" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
            <h3>Datos Personales</h3>
            <label htmlFor="nb-name">
              Nombre Completo:
              <input
                id="nb-name"
                type="text"
                className="input"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Escribí tu nombre..."
              />
            </label>
            <label htmlFor="nb-group">
              Grupo / Clase:
              <input
                id="nb-group"
                type="text"
                className="input"
                value={studentGroup}
                onChange={(e) => setStudentGroup(e.target.value)}
                placeholder="Ej: 7mo A, 8vo 2..."
              />
            </label>
            <label htmlFor="nb-teacher">
              Profesor/a:
              <input
                id="nb-teacher"
                type="text"
                className="input"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Nombre de tu docente..."
              />
            </label>
            <div className="flex">
              <button className="btn btn-primary" onClick={handleSaveMeta}>
                Guardar datos
              </button>
              <button className="btn btn-accent" onClick={handleExportText}>
                Descargar Cuaderno para CREA 📥
              </button>
            </div>
          </div>

          <div className="panel" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h3>Respuestas Registradas</h3>
            {Object.keys(answers).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '1rem' }}>
                Aún no has registrado predicciones ni explicaciones. Ingresá a los módulos y completá las actividades para ver tus respuestas aquí.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {Object.keys(answers).map((actId) => (
                  <div key={actId} className="card" style={{ padding: '0.75rem', fontSize: '0.85rem' }}>
                    <strong style={{ color: 'var(--color-accent)' }}>Actividad: {actId}</strong>
                    {answers[actId].prediction && (
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>Predicción:</strong> "{answers[actId].prediction}"
                      </p>
                    )}
                    {answers[actId].explanation && (
                      <p style={{ margin: '0.25rem 0' }}>
                        <strong>Explicación:</strong> "{answers[actId].explanation}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
