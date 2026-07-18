import React, { useState } from 'react';
import { APP_CONFIG } from '../data/appConfig';

interface TeacherGuideProps {
  onClose: () => void;
}

export const TeacherGuide: React.FC<TeacherGuideProps> = ({ onClose }) => {
  const [iframeSrc, setIframeSrc] = useState('https://contenidistas.github.io/RepresentacionDeDatos/'); // URL de ejemplo o base
  const [iframeWidth, setIframeWidth] = useState('100%');
  const [iframeHeight, setIframeHeight] = useState('720');
  const [copySuccess, setCopySuccess] = useState(false);

  const iframeCode = `<iframe src="${iframeSrc}" width="${iframeWidth}" height="${iframeHeight}px" style="border:none; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15);" allow="microphone; camera; autoplay"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
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
    }} role="dialog" aria-modal="true" aria-labelledby="guide-title">
      <div className="container" style={{
        backgroundColor: 'var(--bg-panel)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--border-radius)',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0px 10px 40px rgba(0,0,0,0.5)'
      }}>
        {/* Botón cerrar */}
        <button 
          onClick={onClose} 
          className="btn btn-secondary" 
          style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.4rem 0.8rem', zIndex: 10 }}
          aria-label="Cerrar orientación docente"
        >
          Cerrar Guía
        </button>

        <header style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <h1 id="guide-title" style={{ color: 'var(--color-accent)', fontSize: '2rem' }}>
            Orientación Docente
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Propósitos didácticos, sugerencias por grado (EBI Uruguay) e integración con Plataforma CREA.
          </p>
        </header>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Propósito general del recurso</h2>
          <p>
            Esta aplicación interactiva está diseñada para acompañar la enseñanza de la representación digital de la información en la <strong>Educación Básica Integrada (EBI) de Uruguay (de 12 a 15 años)</strong>. 
            Busca que los estudiantes comprendan de forma activa que textos, números, imágenes, sonidos y videos son representados mediante patrones de bits (hileras de lamparitas encendidas o apagadas) que la computadora procesa bajo reglas preestablecidas.
          </p>
          <p>
            <strong>Importante:</strong> Este recurso interactivo es un objeto de aprendizaje de apoyo y ejercitación, y <strong>no sustituye</strong> una secuencia pedagógica completa liderada por el docente.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Sugerencias de Secuenciación y Trabajo por Grado (EBI Uruguay)</h2>
          <p>
            Para una implementación coherente con el desarrollo cognitivo de los estudiantes, se propone la siguiente distribución curricular:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div className="card" style={{ borderLeft: '4px solid var(--color-accent)', padding: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>7.º Grado (EBI) - Iniciación y Bases (Módulos 0 al 3)</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                Se sugiere trabajar principalmente el <strong>Módulo 0 (Tutorial)</strong>, <strong>Módulo 1 (Bits y Bytes)</strong>, <strong>Módulo 2 (Números en binario)</strong> y <strong>Módulo 3 (Texto a bits: ASCII/UTF-8)</strong>.
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <em>Enfoque:</em> Comprensión cualitativa de los bits como lamparitas de encendido/apagado, composición y descomposición numérica en la balanza binaria, desbordamiento (overflow) y mapeo inicial de letras en sistemas de comunicación.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-alert)', padding: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>8.º Grado (EBI) - Codificación e Imágenes (Módulos 4 al 7)</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                Se sugiere trabajar el <strong>Módulo 4 (Imágenes binarias)</strong>, <strong>Módulo 5 (Escala de grises)</strong>, <strong>Módulo 6 (Color RGB)</strong> y <strong>Módulo 7 (Resolución y tamaño)</strong>.
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <em>Enfoque:</em> Representación bidimensional en mapas de bits, cuantización cromática (banding), la mezcla aditiva RGB en pantallas de celulares y el cálculo matemático de almacenamiento comparado con la capacidad de disquetes clásicos.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-accent)', padding: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>9.º Grado (EBI) - Multimedia, Compresión y Laboratorio (Módulos 8 al 12)</h3>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>
                Se sugiere completar el recorrido con el <strong>Módulo 8 (Sonido digital)</strong>, <strong>Módulo 9 (Video digital)</strong>, <strong>Módulo 10 (Compresión)</strong>, <strong>Módulo 11 (Sonda Voyager-X)</strong> y la <strong>Autoevaluación final (Módulo 12)</strong>.
              </p>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <em>Enfoque:</em> Muestreo y cuantización de ondas continuas analógicas, compresión temporal de video, descarte visual JPEG y optimización límite en un laboratorio de transmisión espacial.
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Integración con Plataforma CREA (Ceibal, Uruguay)</h2>
          <p>
            Este recurso está diseñado para integrarse fácilmente en el ecosistema digital de Ceibal:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>
              <strong>Evaluación y Evidencias:</strong> Para saber qué hizo cada estudiante y corregir su trabajo de forma personalizada, indicales que entren a la sección <strong>"Mi Cuaderno Digital"</strong> al iniciar el trabajo. Allí completarán su nombre y grupo. Al finalizar el recorrido, deberán hacer clic en <strong>"Descargar Cuaderno para CREA"</strong> para descargar un archivo de texto (<code>.txt</code>) con todas sus predicciones y argumentaciones guardadas. Este archivo es el que subirán como entrega de la tarea en CREA.
            </li>
          </ul>

          <div className="panel" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px dashed var(--color-accent)', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-accent)', fontSize: '1.1rem' }}>🛠️ Generador de Código de Inserción (Iframe) para CREA</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Personalizá las dimensiones del recuadro para que se adapte perfectamente al diseño de tu curso en CREA Ceibal:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label htmlFor="if-src" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>URL del Recurso:</label>
                <input 
                  id="if-src"
                  type="text" 
                  value={iframeSrc} 
                  onChange={(e) => setIframeSrc(e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label htmlFor="if-width" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Ancho (ej: 100% o 800):</label>
                <input 
                  id="if-width"
                  type="text" 
                  value={iframeWidth} 
                  onChange={(e) => setIframeWidth(e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)' }}
                />
              </div>
              <div>
                <label htmlFor="if-height" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Alto en píxeles (px):</label>
                <input 
                  id="if-height"
                  type="number" 
                  value={iframeHeight} 
                  onChange={(e) => setIframeHeight(e.target.value)}
                  style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)' }}
                />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <pre style={{
                backgroundColor: 'var(--bg-input)',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                fontFamily: 'var(--font-mono)',
                margin: 0
              }}>
                {iframeCode}
              </pre>
              <button 
                onClick={handleCopyCode}
                className="btn btn-primary"
                style={{ marginTop: '0.75rem', width: '100%', padding: '0.5rem' }}
              >
                {copySuccess ? '¡Copiado al portapapeles! ✓' : 'Copiar Código de Inserción'}
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
              💡 <em>En CREA, agregá una tarea o página, seleccioná la pestaña "HTML" (en la barra superior derecha del editor enriquecido) y pegá este código.</em>
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Secuencia Didáctica Sugerida (Modelo de Interacción)</h2>
          <p>
            Para aprovechar el potencial didáctico de la aplicación, estimulá el siguiente ciclo cognitivo:
          </p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li><strong>Predecir:</strong> Que completen la caja de predicción antes de tocar los bits o interruptores.</li>
            <li><strong>Ejecutar:</strong> Que activen los interruptores de bits (lamparitas) para ver el cambio.</li>
            <li><strong>Observar:</strong> Que comparen el resultado visual/sonoro con su hipótesis.</li>
            <li><strong>Explicar:</strong> Que argumenten en la caja de explicación qué bit o parámetro produjo el cambio.</li>
            <li><strong>Modificar:</strong> Que exploren variaciones en las cuadrículas o deslizadores libres.</li>
          </ol>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Tabla de Módulos (Planificación Curricular)</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Módulo</th>
                  <th style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Objetivo</th>
                  <th style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Conceptos Clave</th>
                  <th style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Evidencia de Aprendizaje</th>
                  <th style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Error Común / Mediación</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>0. Tutorial</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Comprender el flujo Entrada → Codificación → Salida.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Codificar, decodificar, hardware, patrón.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>El estudiante explica que la computadora no guarda letras físicas sino electricidad.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Pensar que la pantalla muestra la misma 'A' que se guarda. Explicar el rol del software en decodificar.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>1. Bits y Bytes</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Diferenciar bit y byte y entender la progresión exponencial 2^n.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Bit, byte, nibble, combinaciones.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Crea patrones binarios específicos y calcula el total de combinaciones posibles.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Creer que 8 bits permiten solo 8 combinaciones (en lugar de 2^8 = 256). Guiar con la tabla posicional.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>2. Números en binario</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Comprender la conversión numérica posicional y el overflow.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Valor posicional, divisiones, desbordamiento.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Equilibra la balanza binaria, explica divisiones sucesivas y detecta el overflow.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Confundir el "valor de posición" con peso físico. Aclarar la correspondencia matemática de las potencias de 2.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>3. Texto y ASCII</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Comprender el mapeo de caracteres y UTF-8.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>ASCII, Unicode, UTF-8, bytes variables.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Traduce mensajes en binario y depura errores de bits en palabras.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Afirmar que 'toda letra ocupa siempre un byte'. Mostrar eñes y emojis en UTF-8 (2 o más bytes).</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>4. Imágenes Binarias</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Ver la relación entre una matriz bidimensional y secuencias de bits.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Píxel, cuadrícula, resolución, mapa de bits.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Dibuja una figura controlando la cuadrícula y ajusta el ancho/alto de reconstrucción.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Establecer dimensiones incorrectas de reconstrucción. Mostrar cómo se deforma el dibujo en diagonal.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>5. Escala de grises</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Comprender la modulación de brillo y cuantización.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Brillo (0-255), degradación banding, BPP.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Cambia el brillo de un píxel gigante y analiza el degradado cuantizado en Canvas.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Confundir 256 niveles de gris con colores de luz. Mostrar el efecto de bandas duras de color.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>6. Color RGB</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Entender la mezcla aditiva en pantallas de celulares.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Canal RGB, suma aditiva, True Color (24 bits).</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Recrea el color amarillo patito y analiza el peso de 3 bytes por píxel.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Pensar que mezclar luces rojas y verdes da marrón (como en pintura). Explicar la suma de luz.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>7. Resolución y peso</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Calcular pesos teóricos de imágenes.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Megapíxeles, kilobytes, bytes, disquete.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Calcula pesos de imágenes reales y justifica si caben en un disquete de 1.44 MB.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Olvidar dividir los bits por 8 para obtener bytes. Recordar la regla de conversión didáctica.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>8. Sonido digital</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Digitalizar ondas sonoras continuas.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Muestreo (Hz), cuantización, distorsión auditiva.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Modula frecuencias en Canvas y distingue auditivamente la cuantización a 2 y 4 bits.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>No percibir la distorsión auditiva. Recomendar el uso de auriculares para notar el siseo.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>9. Video digital</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Entender la animación por fotogramas y FPS.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Fotogramas por segundo, peso de video, compresión temporal.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Crea una animación de 4 cuadros 8x8 y estima el peso teórico total del video.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Creer que el video solo almacena fotos completas. Explicar cómo H.264 solo guarda cambios.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>10. Compresión</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Distinguir compresión con y sin pérdida.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Compresión RLE, JPEG descarte visual, tasa de ahorro.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Comprime una cadena con RLE y procesa una foto local ajustando calidad JPEG.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Creer que la compresión con pérdida es reversible. Mostrar la pérdida real de detalles finos.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>11. Sonda (Laboratorio)</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Optimizar archivos bajo restricciones de ancho de banda.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Ancho de banda, límite de 512 bytes, compromiso de calidad.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Envía el paquete científico reduciendo resoluciones y tasas hasta bajar de 512 bytes.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Frustración por no poder mandar la máxima calidad. Guiar sobre el compromiso técnico/funcional.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}><strong>12. Autoevaluación</strong></td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Consolidar aprendizajes generales.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Evaluación, retroalimentación, insignia final.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Completa el quiz integrador de 5 preguntas conceptuales y genera su certificado.</td>
                  <td style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>Cometer errores al responder. Recordar el uso de pistas y retroalimentación interactiva.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Criterios de Evaluación Sugeridos</h2>
          <p>
            Recomendamos evaluar el desempeño analizando:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>La calidad y coherencia de las explicaciones y predicciones registradas en el cuaderno digital exportable.</li>
            <li>La capacidad para justificar qué decisiones de codificación tomaron en las actividades desafiantes (ej: depuración de bits de GATO).</li>
            <li>El uso adecuado de la terminología (ej: distinguir consistentemente entre bit y byte).</li>
          </ul>
        </section>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>© {APP_CONFIG.year} {APP_CONFIG.institution}</span>
          <span>Autoría: {APP_CONFIG.author} | Licencia: {APP_CONFIG.license}</span>
        </div>
      </div>
    </div>
  );
};
