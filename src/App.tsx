import { useState, useEffect } from 'react';
import { APP_CONFIG } from './data/appConfig';
import { MODULES_DATA } from './data/modulesData';
import { AccessibilitySettings } from './components/AccessibilitySettings';
import { TeacherGuide } from './components/TeacherGuide';
import { DigitalNotebook } from './components/DigitalNotebook';
import { ModuleCard } from './components/ModuleCard';
import { Module0Tutorial } from './components/Module0Tutorial';
import { Module1Bits } from './components/Module1Bits';
import { Module2Number } from './components/Module2Number';
import { Module3Text } from './components/Module3Text';
import { Module4Image } from './components/Module4Image';
import { Module5Grayscale } from './components/Module5Grayscale';
import { Module6ColorRGB } from './components/Module6ColorRGB';
import { Module7Resolution } from './components/Module7Resolution';
import { Module8Audio } from './components/Module8Audio';
import { Module9Video } from './components/Module9Video';
import { Module10Compression } from './components/Module10Compression';
import { Module11Integrator } from './components/Module11Integrator';
import { Module12Quiz } from './components/Module12Quiz';
import { loadProgress, persistProgress } from './utils/binaryHelpers';

export default function App() {
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [showTeacherGuide, setShowTeacherGuide] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  // Cargar progreso al iniciar
  useEffect(() => {
    const progress = loadProgress();
    if (progress && Array.isArray(progress.completedModules)) {
      setCompletedModules(progress.completedModules);
    }
  }, []);

  // Guardar progreso cuando cambia
  const markModuleCompleted = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      const nextCompleted = [...completedModules, moduleId];
      setCompletedModules(nextCompleted);
      persistProgress({ completedModules: nextCompleted });
    }
  };

  const handleResetProgress = () => {
    setCompletedModules([]);
    setSelectedModuleId(null);
  };

  // Todos los módulos ahora están implementados y activos
  const allModules = MODULES_DATA.map(mod => ({
    ...mod,
    isPlaceholder: false
  }));

  // Progreso general en porcentaje
  const progressPercentage = Math.round((completedModules.length / MODULES_DATA.length) * 100);

  return (
    <div>
      {/* Botón de omisión para accesibilidad por teclado */}
      <a href="#main-content" className="skip-link">Saltar a la navegación o contenido principal</a>

      {/* Barra de Accesibilidad superior */}
      <AccessibilitySettings onResetProgress={handleResetProgress} />

      {/* Header */}
      <header className="app-header">
        <div className="container" style={{ padding: 0 }}>
          <span className="sub-institution">
            {APP_CONFIG.institution}
          </span>
          <h1>
            {APP_CONFIG.appName}
          </h1>
          <p>
            Un recurso educativo abierto interactivo para explorar cómo las computadoras procesan, guardan y reconstruyen textos, números, imágenes y sonidos usando patrones de bits.
          </p>
          
          <div className="flex" style={{ justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-accent" onClick={() => setShowNotebook(true)}>
              Mi Cuaderno Digital (Entrega CREA)
            </button>
            <button className="btn btn-primary" onClick={() => setShowTeacherGuide(true)}>
              Orientación Docente
            </button>
            <button className="btn btn-secondary" onClick={() => setShowCredits(true)}>
              Créditos y Licencia
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main id="main-content" className="container" style={{ minHeight: '60vh' }}>
        {selectedModuleId === null ? (
          // DASHBOARD (PORTADA)
          <div>
            <div className="panel flex" style={{ justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div>
                <h2>Recorrido de Aprendizaje</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                  Seguí el camino sugerido o explorá libremente las estaciones interactivas.
                </p>
              </div>
              <div style={{ minWidth: '200px', textAlign: 'right' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Progreso del recorrido actual:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <div style={{ flex: 1, height: '10px', backgroundColor: 'var(--bg-input)', borderRadius: '5px', overflow: 'hidden', minWidth: '120px' }}>
                    <div style={{ width: `${progressPercentage}%`, height: '100%', backgroundColor: 'var(--color-accent)', transition: 'width 0.3s' }} />
                  </div>
                  <strong style={{ fontSize: '1.1rem' }}>{progressPercentage}%</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-3">
              {allModules.map((mod) => (
                <ModuleCard
                  key={mod.id}
                  module={mod}
                  completed={completedModules.includes(mod.id)}
                  inProgress={false}
                  onClick={() => {
                    if (mod.isPlaceholder) {
                      alert(`Estación "${mod.title}" bloqueada:\n\nEste módulo forma parte de la ampliación de la Fase 2 y Fase 3 del proyecto. Por favor, completá los módulos iniciales disponibles (0, 1, 3 y 4).`);
                    } else {
                      setSelectedModuleId(mod.id);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          // VISUALIZADOR DE MÓDULO ACTIVO (ACTIVITY LAYOUT)
          <div>
            <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedModuleId(null)}>
                Volver a la portada
              </button>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Módulo {selectedModuleId} activo</span>
              </div>
            </div>

            {selectedModuleId === 0 && (
              <Module0Tutorial onComplete={() => markModuleCompleted(0)} />
            )}
            {selectedModuleId === 1 && (
              <Module1Bits onComplete={() => markModuleCompleted(1)} />
            )}
            {selectedModuleId === 2 && (
              <Module2Number onComplete={() => markModuleCompleted(2)} />
            )}
            {selectedModuleId === 3 && (
              <Module3Text onComplete={() => markModuleCompleted(3)} />
            )}
            {selectedModuleId === 4 && (
              <Module4Image onComplete={() => markModuleCompleted(4)} />
            )}
            {selectedModuleId === 5 && (
              <Module5Grayscale onComplete={() => markModuleCompleted(5)} />
            )}
            {selectedModuleId === 6 && (
              <Module6ColorRGB onComplete={() => markModuleCompleted(6)} />
            )}
            {selectedModuleId === 7 && (
              <Module7Resolution onComplete={() => markModuleCompleted(7)} />
            )}
            {selectedModuleId === 8 && (
              <Module8Audio onComplete={() => markModuleCompleted(8)} />
            )}
            {selectedModuleId === 9 && (
              <Module9Video onComplete={() => markModuleCompleted(9)} />
            )}
            {selectedModuleId === 10 && (
              <Module10Compression onComplete={() => markModuleCompleted(10)} />
            )}
            {selectedModuleId === 11 && (
              <Module11Integrator onComplete={() => markModuleCompleted(11)} />
            )}
            {selectedModuleId === 12 && (
              <Module12Quiz onComplete={() => markModuleCompleted(12)} />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-panel)',
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 1.5rem',
        marginTop: '3rem',
        fontSize: '0.9rem',
        textAlign: 'center',
        color: 'var(--text-muted)'
      }}>
        <div className="container" style={{ padding: 0 }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>{APP_CONFIG.appName}</strong>
          </p>
          <p style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
            Desarrollado bajo licencia <strong>{APP_CONFIG.license}</strong>. Los contenidos de este recurso pueden compartirse y adaptarse libremente citando al autor correspondiente.
          </p>
          <p style={{ fontSize: '0.75rem', maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
            {APP_CONFIG.useAIGDeclaration}
          </p>
        </div>
      </footer>

      {/* Guía Docente Overlay */}
      {showTeacherGuide && (
        <TeacherGuide onClose={() => setShowTeacherGuide(false)} />
      )}

      {/* Cuaderno Digital Overlay */}
      {showNotebook && (
        <DigitalNotebook onClose={() => setShowNotebook(false)} />
      )}

      {/* Créditos y Atribuciones Overlay */}
      {showCredits && (
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
        }} role="dialog" aria-modal="true" aria-labelledby="credits-title">
          <div className="container" style={{
            backgroundColor: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius)',
            padding: '2rem',
            position: 'relative'
          }}>
            <button onClick={() => setShowCredits(false)} className="btn btn-secondary" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              Cerrar
            </button>
            <h2 id="credits-title" style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Créditos y Licencias</h2>
            
            <section style={{ marginBottom: '1.5rem' }}>
              <h3>Autoría y Colaboración</h3>
              <p>
                <strong>Autor original:</strong> {APP_CONFIG.author}<br />
                <strong>Institución:</strong> {APP_CONFIG.institution}
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h3>Licencia de Uso Abierto</h3>
              <p>
                Este recurso es distribuido como un Recurso Educativo Abierto (REA) bajo los términos de la licencia:
              </p>
              <p style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>
                Creative Commons Atribución 4.0 Internacional (CC BY 4.0)
              </p>
              <p>
                Usted es libre de compartir (copiar y redistribuir el material en cualquier medio o formato) y adaptar (remezclar, transformar y construir a partir del material para cualquier propósito, incluso comercial) bajo la única condición de dar el crédito correspondiente.
              </p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h3>Declaratoria de Uso de IAG</h3>
              <p>{APP_CONFIG.useAIGDeclaration}</p>
            </section>

            <section style={{ marginBottom: '1.5rem' }}>
              <h3>Créditos de Terceros y Atribuciones</h3>
              <p>
                Este proyecto representa una modernización completa basada en la secuencia didáctica y ejemplos del recurso educativo original <em>"Representación de datos"</em> de Santiago Hernández (Licencia CC BY-SA 4.0).
              </p>
              <p>
                Se portaron las mecánicas del desafío de mapa de bits estático a un simulador de lienzo interactivo y se re-diseñaron los esquemas estáticos para cumplir con los estándares modernos de accesibilidad web (WCAG 2.2 AA).
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
