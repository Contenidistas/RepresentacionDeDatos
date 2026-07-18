# Del dato al bit: cómo las computadoras representan la información

Este es un recurso educativo abierto interactivo diseñado para estudiantes de **7.º, 8.º y 9.º de Educación Básica Integrada (EBI)** en Uruguay (edades de 12 a 15 años). Su propósito es facilitar la comprensión de cómo textos, números, imágenes, sonidos y videos se codifican en patrones binarios y son interpretados por el hardware de una computadora.

Desarrollado en co-creación utilizando tecnologías modernas, accesibles y limpias, respetando los lineamientos pedagógicos del modelo didáctico de Mileva (*predecir $\rightarrow$ ejecutar $\rightarrow$ observar $\rightarrow$ explicar $\rightarrow$ modificar*).

---

## 🚀 Requisitos e Instalación

Para ejecutar y compilar este proyecto de forma local, necesitás tener instalado **Node.js** (versión 18 o superior).

1. **Clonar o descargar** los archivos en tu computadora.
2. **Abrir una terminal** en la carpeta del proyecto (`del-dato-al-bit`).
3. **Instalar las dependencias** ejecutando:
   ```bash
   npm install
   ```

---

## 🛠️ Comandos de Ejecución

*   **Iniciar el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver los cambios en tiempo real.

*   **Compilar la aplicación para producción:**
   ```bash
   npm run build
   ```
   Esto compila y optimiza el código TypeScript/React y genera los archivos finales estáticos en la carpeta `dist/`.

*   **Ejecutar las pruebas unitarias (Vitest):**
   ```bash
   npm run test
   ```
   Esto correrá las 11 pruebas unitarias que verifican la precisión matemática y de codificación de los conversores.

---

## 📂 Estructura de Carpetas

```
del-dato-al-bit/
├── dist/                     # Carpeta de compilación de producción (autogenerada)
├── public/                   # Recursos estáticos globales (imágenes, gifs, etc.)
│   └── assets/reference/     # Materiales y recursos reutilizados del REA original ANEP
├── src/
│   ├── components/           # Componentes React modulares y accesibles
│   │   ├── AccessibilitySettings.tsx   # Barra superior de configuración de accesibilidad
│   │   ├── ExplanationBox.tsx          # Caja de texto para registrar explicaciones
│   │   ├── FeedbackPanel.tsx           # Panel de pistas y retroalimentación formativa
│   │   ├── Module0Tutorial.tsx         # Actividad interactiva del Módulo 0
│   │   ├── Module1Bits.tsx             # Actividades y simuladores del Módulo 1
│   │   ├── Module3Text.tsx             # Actividades y depuración del Módulo 3
│   │   ├── Module4Image.tsx            # Editor y binarizador de Canvas del Módulo 4
│   │   ├── ModuleCard.tsx              # Tarjeta de navegación de módulos en la portada
│   │   ├── PredictionBox.tsx           # Caja de hipótesis inicial de estudiantes
│   │   └── TeacherGuide.tsx            # Modal de orientación didáctica para docentes
│   ├── data/
│   │   ├── appConfig.ts      # Archivo de configuración global (título, autor, IAG)
│   │   └── modulesData.ts    # Base de datos editable con contenidos y consignas
│   ├── utils/
│   │   ├── binaryHelpers.ts  # Lógica de conversiones binarias y cálculos multimedia
│   │   └── binaryHelpers.test.ts # Casos de pruebas unitarias
│   ├── App.tsx               # Componente principal y enrutador de estado ligero
│   ├── index.css             # Estilos globales y tokens visuales (Cyber-Tech)
│   └── main.tsx              # Punto de entrada de la aplicación React
├── package.json              # Configuración de dependencias de Node.js
├── tsconfig.json             # Ajustes de TypeScript
└── vite.config.ts            # Ajustes de Vite y base path
```

---

## 📝 Personalización y Edición de Contenidos

### 1. Cambiar el Título, Autor o Licencia
Todo el metadato institucional y de autoría está centralizado. Para modificar el nombre de la app, el autor o la licencia, editá el archivo [appConfig.ts](file:///C:/Users/santi/.gemini/antigravity/scratch/del-dato-al-bit/src/data/appConfig.ts):
```typescript
export const APP_CONFIG = {
  appName: "Tu Nuevo Título de Aplicación",
  institution: "ANEP - EDyTIC",
  author: "Tu Nombre Completo",
  license: "Creative Commons BY 4.0",
  // ...
};
```

### 2. Modificar Consignas o Agregar Preguntas
Las explicaciones, tutoriales y pistas no están incrustados en los componentes. Están en el archivo de base de datos [modulesData.ts](file:///C:/Users/santi/.gemini/antigravity/scratch/del-dato-al-bit/src/data/modulesData.ts). Para cambiar el texto de una actividad o agregar pistas, editalo siguiendo esta estructura:
```typescript
{
  id: "m1_a1",
  type: "practica",
  title: "Tu Actividad",
  instruction: "Consigna detallada para los estudiantes.",
  predictionPrompt: "¿Qué pensás que ocurrirá?",
  explanationPrompt: "Explicá el cambio observador.",
  initialState: { ... },
  hints: [
    "Pista 1 para guiar al alumno.",
    "Pista 2..."
  ]
}
```

---

## 🎨 Accesibilidad (WCAG 2.2 AA)

La aplicación implementa de forma nativa estándares de accesibilidad:
*   **Foco visual explícito:** Borde grueso naranja de alta visibilidad para navegación con teclado.
*   **Contraste de color dinámico:** Selector para pasar de modo oscuro premium a un modo de **Alto Contraste** basado en fondos puramente blancos y textos negros.
*   **Ajuste de tipografía:** Botones superiores de escalado de fuentes (Normal, Medio, Grande).
*   **Lectores de pantalla:** HTML semántico y etiquetas descriptivas `aria-label` para botones y bits interactivos.
*   **Regiones dinámicas:** Región `aria-live` para retroalimentación formativa y pistas de audio para evitar redundancia de lectura.

---

## 🌐 Publicación en GitHub Pages

Para publicar esta aplicación web en GitHub Pages de forma estática:

1. Modificá el archivo `vite.config.ts` y agregá la propiedad `base` con el nombre de tu repositorio:
   ```typescript
   export default defineConfig({
     base: '/nombre-de-tu-repositorio/',
     // ...
   })
   ```
2. Compilá el proyecto con `npm run build`.
3. Subí el contenido de la carpeta `dist/` a la rama `gh-pages` de tu repositorio GitHub. ¡La aplicación funcionará al 100% en servidores estáticos sin base de datos!

---

## 📄 Licencia y Atribuciones

*   **Licencia del Software y Contenido Nuevo:** Creative Commons Atribución 4.0 Internacional (CC BY 4.0).
*   **Atribución de Materiales Originales:** Consultá el archivo [ATTRIBUTIONS.md](file:///C:/Users/santi/.gemini/antigravity/scratch/del-dato-al-bit/ATTRIBUTIONS.md) para ver la lista completa de créditos del Objeto de Aprendizaje original de ANEP y la Declaratoria de Uso de Inteligencia Artificial Generativa.
