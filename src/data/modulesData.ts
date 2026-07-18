export interface Activity {
  id: string;
  type: 'tutorial' | 'practica' | 'desafio' | 'laboratorio' | 'mision';
  title: string;
  instruction: string;
  predictionPrompt?: string;
  explanationPrompt?: string;
  validationRuleName?: string;
  initialState: any;
  hints: string[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: 'inicial' | 'intermedio' | 'desafio';
  activities: Activity[];
}

export const MODULES_DATA: Module[] = [
  {
    id: 0,
    title: "Tutorial: del mundo al bit",
    description: "Comprendé el proceso general de cómo viajan los datos físicos hacia la memoria de la computadora y cómo se decodifican.",
    difficulty: "inicial",
    activities: [
      {
        id: "m0_a1",
        type: "tutorial",
        title: "El camino de la información",
        instruction: "Observá cómo una letra que escribís en el teclado realiza un recorrido por tres paneles para transformarse en impulsos eléctricos (como lamparitas que se prenden y apagan), guardarse en la memoria, y luego volver a dibujarse en la pantalla como una letra legible. Avanzá paso a paso y completá la predicción.",
        predictionPrompt: "¿Qué forma pensás que toma el dato cuando está guardado en el procesador/memoria de la computadora?",
        explanationPrompt: "Explicá con tus palabras por qué la computadora necesita transformar la letra 'A' antes de guardarla.",
        initialState: { step: 0, inputChar: "A" },
        hints: [
          "Recordá que los cables y chips solo pueden transportar estados eléctricos.",
          "El codificador traduce la letra usando reglas conocidas (como la tabla ASCII)."
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Bits, bytes y sistema binario",
    description: "Explorá la unidad mínima de información: el bit. Aprendé a agruparlos y descubrí cuántas combinaciones podés crear.",
    difficulty: "inicial",
    activities: [
      {
        id: "m1_a1",
        type: "practica",
        title: "Interruptores y lamparitas",
        instruction: "Imaginate cada bit como una lamparita: encendida equivale a 1 y apagada equivale a 0. Hacé clic en los interruptores para prender y apagar las lamparitas. Observá cómo cambia el patrón y cómo afecta al número decimal y las combinaciones.",
        predictionPrompt: "Si activás 4 lamparitas, ¿cuántas combinaciones posibles en total pensás que podés representar?",
        explanationPrompt: "Explicá la relación entre la cantidad de bits (lamparitas) y el número máximo de combinaciones.",
        initialState: { bitsCount: 4, bits: [0, 0, 0, 0] },
        hints: [
          "Cada interruptor controla una lamparita. Puede ser 0 (apagada) o 1 (encendida).",
          "Con 1 bit tenés 2 combinaciones. Con 2 bits, tenés 4 combinaciones. ¿Ves el patrón?"
        ]
      },
      {
        id: "m1_a2",
        type: "desafio",
        title: "Constructor de patrones",
        instruction: "Formá el patrón binario exacto que represente el número decimal 5 usando 4 bits. Pensá en el peso de cada posición de la lamparita.",
        predictionPrompt: "¿Qué lamparitas pensás que deben estar encendidas para sumar exactamente 5?",
        explanationPrompt: "Justificá por qué elegiste encender esas lamparitas específicas.",
        validationRuleName: "validatePattern5",
        initialState: { bitsCount: 4, bits: [0, 0, 0, 0], target: 5 },
        hints: [
          "La lamparita más a la derecha vale 1. La siguiente vale 2, luego 4 y la de más a la izquierda vale 8.",
          "Para formar el 5, necesitás encender las lamparitas de pesos 4 y 1, porque 4 + 1 = 5."
        ]
      },
      {
        id: "m1_a2_capsule", // id dummy para asegurar que esté en cuaderno
        type: "practica",
        title: "Cápsula de Bases Numéricas",
        instruction: "Revisá el bloque de teoría de comparación de bases decimal (Base 10) y binaria (Base 2). Completa la explicación.",
        explanationPrompt: "Explicá la diferencia entre la descomposición polinómica en Base 10 (multiplicar por 10, 100, etc.) y en Base 2 (multiplicar por 2, 4, 8, etc.).",
        initialState: {},
        hints: []
      },
      {
        id: "m1_a3",
        type: "laboratorio",
        title: "Explorador de capacidad",
        instruction: "Deslizá el control para cambiar el número de bits (de 1 a 16). Observá cómo crece exponencialmente el número de valores que la computadora puede representar al agregar más lamparitas.",
        explanationPrompt: "¿Por qué pensás que las computadoras modernas usan palabras de 64 bits (64 lamparitas en paralelo) en lugar de 8 o 16?",
        initialState: { bitsCount: 8 },
        hints: [
          "La fórmula general es 2 elevado a la cantidad de bits (2^n).",
          "Con 8 bits tenés 256 combinaciones. ¡Probá qué pasa con 16!"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Números en binario",
    description: "Comprendé cómo se representan números enteros más grandes mediante sumas de potencias de 2 (valores posicionales), experimentá con la conversión y entendé el concepto de desbordamiento (overflow).",
    difficulty: "inicial",
    activities: [
      {
        id: "m2_a1",
        type: "practica",
        title: "La Balanza Binaria",
        instruction: "Equilibrá la balanza colocando pesas binarias (de valores 128, 64, 32, 16, 8, 4, 2 y 1) en el platillo izquierdo para igualar el peso decimal aleatorio que aparece a la derecha. Cada pesa que ponés enciende una lamparita binaria.",
        predictionPrompt: "Si el peso objetivo a equilibrar es 13, ¿cuáles pesas pensás que deberás colocar para equilibrar la balanza?",
        explanationPrompt: "Detallá cómo elegiste las pesas para formar el número objetivo de la balanza.",
        validationRuleName: "validateBalance",
        initialState: { target: 13, placed: [0, 0, 0, 0, 0, 0, 0, 0] },
        hints: [
          "Empezá buscando la pesa más grande que no supere el peso objetivo.",
          "Para 13, la pesa de 16 es muy grande. Elegí la de 8, luego sumale 4 (llevás 12) y finalmente la de 1 (llevás 13)."
        ]
      },
      {
        id: "m2_a2",
        type: "laboratorio",
        title: "Conversor Bidireccional Paso a Paso",
        instruction: "Escribí cualquier número decimal entre 0 y 255 y mirá el proceso matemático de divisiones sucesivas por 2 que realiza la computadora para generar el binario. También podés prender las lamparitas directamente para ver la suma en vivo.",
        explanationPrompt: "Explicá el método de las divisiones sucesivas. ¿Por qué los restos de las divisiones (0 y 1) se leen de abajo hacia arriba?",
        initialState: { decimalVal: 65 },
        hints: [
          "Cada división por 2 determina si el bit es par (0) o impar (1).",
          "El último resto corresponde a la lamparita de mayor valor posicional (más a la izquierda)."
        ]
      },
      {
        id: "m2_a3",
        type: "desafio",
        title: "Desafío de Desbordamiento (Overflow)",
        instruction: "Un contador de 4 bits puede contar de 0 a 15 (con todas las lamparitas encendidas: 1111). Incrementá el contador hasta 15 y luego presioná '+1' una vez más. Observá qué ocurre en el visor.",
        predictionPrompt: "¿Qué pensás que ocurrirá con las 4 lamparitas si intentás sumarle 1 al número 15 (que ya ocupa todo el espacio)?",
        explanationPrompt: "Describí qué ocurrió en las lamparitas al sumar 1 al 15 y por qué se llama desbordamiento de memoria (overflow).",
        initialState: { counter: 15 },
        hints: [
          "En 4 bits no cabe el número 16 (que requiere 5 bits: 10000).",
          "Al no tener un quinto casillero físico para guardar el bit sobrante, la computadora vuelve a cero. ¡Ocurrió un desbordamiento!"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Texto, ASCII y Unicode",
    description: "Escribí palabras y observá cómo cada carácter se convierte en un código numérico y luego en un patrón de bits.",
    difficulty: "inicial",
    activities: [
      {
        id: "m3_a1",
        type: "practica",
        title: "Codificador y Máquina de escribir binaria",
        instruction: "Escribí un texto o una letra en la caja. Observá la tabla con su equivalente decimal, hexadecimal, binario y cuántos bytes ocupa en UTF-8. Probá cambiar los bits (lamparitas) a mano y mirá qué carácter aparece.",
        predictionPrompt: "¿Qué pensás que ocurrirá si escribís la letra 'ñ' o una letra con tilde como 'á' en codificación ASCII?",
        explanationPrompt: "Explicá por qué algunos caracteres ocupan más de un byte (más de 8 lamparitas) en Unicode/UTF-8.",
        initialState: { text: "Hola" },
        hints: [
          "La codificación ASCII original solo usaba 7 bits (127 caracteres) y no tenía eñes ni tildes.",
          "UTF-8 es de longitud variable: los caracteres comunes en inglés ocupan 1 byte, pero las letras del español y los emojis ocupan más."
        ]
      },
      {
        id: "m3_a2",
        type: "desafio",
        title: "Mensaje secreto",
        instruction: "Descifrá el siguiente mensaje secreto decodificando los bytes binarios a caracteres ASCII. El mensaje es de 4 letras.",
        predictionPrompt: "El primer byte es 01000010 (decimal 66). ¿Qué letra mayúscula pensás que es?",
        explanationPrompt: "Detallá cómo hiciste para traducir el patrón de bits a la palabra legible.",
        validationRuleName: "validateSecretMessage",
        initialState: {
          binaryData: ["01000010", "01001001", "01010100", "01010011"],
          userAttempt: ""
        },
        hints: [
          "Buscá el valor decimal de cada byte: 01000010 = 66, 01001001 = 73, 01010100 = 84, 01010011 = 83.",
          "En la tabla ASCII, 65 es 'A', 66 es 'B', 67 es 'C', y así sucesivamente."
        ]
      },
      {
        id: "m3_a3",
        type: "desafio",
        title: "Error de transmisión",
        instruction: "Recibimos la palabra 'GATO' pero un bit (lamparita) se alteró en el camino y llegó 'FATO'. Encontrá el bit que falló y corregilo.",
        predictionPrompt: "Si el carácter recibido es 'FATO' en lugar de 'GATO', ¿qué bit de la primera letra pensás que cambió?",
        explanationPrompt: "Explicá cómo identificaste el bit erróneo comparando los códigos binarios de 'G' y 'F'.",
        validationRuleName: "validateCorruptedWord",
        initialState: {
          corruptedBits: ["01000110", "01000001", "01010100", "01001111"],
          targetWord: "GATO"
        },
        hints: [
          "La letra 'G' tiene código ASCII 71 (binario 01000111).",
          "La letra 'F' tiene código ASCII 70 (binario 01000110). ¡Compará los bits más a la derecha!"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Imágenes binarias y mapas de bits",
    description: "Pintá píxeles con unos y ceros. Reconstruí figuras y cargá tus propias imágenes locales para binarizarlas.",
    difficulty: "intermedio",
    activities: [
      {
        id: "m4_a1",
        type: "practica",
        title: "Editor de píxeles binarios",
        instruction: "Pintá en la cuadrícula de 8x8. Cada celda es un píxel. Activarlo representa un 1 (lamparita encendida = negro) y desactivarlo un 0 (lamparita apagada = blanco). Observá cómo se genera la secuencia lineal de bits.",
        predictionPrompt: "Si queremos dibujar una línea diagonal, ¿qué patrón de bits pensás que tendrá la primera fila de 8 píxeles?",
        explanationPrompt: "Explicá cómo calcula la computadora el tamaño total en bits de esta imagen de 8x8.",
        initialState: {
          width: 8,
          height: 8,
          pixels: Array(64).fill(0),
          zeroIsWhite: true
        },
        hints: [
          "La imagen se lee de izquierda a derecha y de arriba a abajo, como si leyeras un renglón de texto.",
          "Cada celda es 1 bit. Como son 8x8, son 64 píxeles en total, es decir, 64 bits (8 bytes)."
        ]
      },
      {
        id: "m4_a2",
        type: "desafio",
        title: "Reconstrucción desde bits",
        instruction: "Te damos una secuencia de bits: 01100110100110011000000110011001. Configurá el ancho y el alto correctos para reconstruir la figura (una cara simétrica).",
        predictionPrompt: "Si la secuencia tiene 32 bits, ¿qué dimensiones (ancho x alto) pensás que darán una cuadrícula perfecta sin píxeles sobrantes?",
        explanationPrompt: "Explicá qué sucede con el dibujo cuando ponés dimensiones incorrectas.",
        validationRuleName: "validateReconstructImage",
        initialState: {
          binaryString: "01100110100110011000000110011001",
          width: 8,
          height: 4
        },
        hints: [
          "Multiplicá el ancho por el alto. El resultado tiene que ser exactamente igual al total de bits (32).",
          "Probá con un ancho de 8 y alto de 4, u observa las repeticiones del patrón de ojos y boca."
        ]
      },
      {
        id: "m4_a3",
        type: "laboratorio",
        title: "Binarizador de fotos",
        instruction: "Cargá una foto de tu dispositivo. Se procesará únicamente en tu navegador. Ajustá el control de umbral para decidir qué píxeles se convierten en 1 (negro) y cuáles en 0 (blanco). ¡Mirá el tamaño del archivo resultante!",
        explanationPrompt: "Describí qué ocurre didácticamente con los detalles de la foto cuando el umbral es muy alto o muy bajo.",
        initialState: { threshold: 128 },
        hints: [
          "El umbral es el valor de corte (0-255). Si el brillo del píxel es menor, se vuelve negro (1).",
          "Este proceso convierte una imagen a color compleja en una imagen binaria pura de 1 bit por píxel."
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Escala de grises",
    description: "Descubrí los niveles de gris y el efecto de la profundidad de bits por píxel en las imágenes digitales.",
    difficulty: "inicial",
    activities: [
      {
        id: "m5_a1",
        type: "practica",
        title: "Brillo de un Píxel Grises",
        instruction: "Ajustá el control de brillo de un solo píxel de 0 (negro absoluto) a 255 (blanco absoluto). Observá el valor decimal de brillo y su conversión a un byte binario (8 bits).",
        predictionPrompt: "¿Qué patrón de bits pensás que representará un gris medio exacto (brillo 127 u 128)?",
        explanationPrompt: "Explicá con tus palabras por qué usamos el valor 0 para el negro y el 255 para el blanco.",
        initialState: { brightness: 128 },
        hints: [
          "El cero representa la ausencia de luz reflejada (oscuridad total).",
          "El 255 es el valor máximo representable en 8 bits (2^8 = 256 combinaciones, del 0 al 255)."
        ]
      },
      {
        id: "m5_a2",
        type: "laboratorio",
        title: "Efecto de Cuantización y Banding",
        instruction: "Deslizá la barra de profundidad de bits (de 1 a 8 bits por píxel) para ver cómo se deforma un degradado o gradiente continuo de grises.",
        explanationPrompt: "Explicá didácticamente por qué aparecen líneas duras ('escalonamiento' o banding) en el gradiente cuando bajás a 2 o 3 bits por píxel.",
        initialState: { bpp: 8 },
        hints: [
          "Con pocos bits (por ejemplo, 2 bits = 4 colores), la computadora no tiene suficientes matices intermedios y debe agrupar píxeles vecinos con el mismo color.",
          "Aumentar los bits permite suavizar las transiciones visuales a costa de un mayor tamaño de archivo."
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Imágenes en color: RGB",
    description: "Mezclá canales rojo, verde y azul para formar más de 16 millones de colores y entender el código hexadecimal.",
    difficulty: "inicial",
    activities: [
      {
        id: "m6_a1",
        type: "practica",
        title: "Mezclador de Canales RGB",
        instruction: "Deslizá los controles de Rojo (Red), Verde (Green) y Azul (Blue) de 0 a 255. Observá la mezcla de luz en pantalla, el código hexadecimal resultante y los 3 bytes en memoria (24 bits en total).",
        predictionPrompt: "¿Qué color pensás que se formará en la pantalla si subís al máximo los tres canales (R=255, G=255, B=255)?",
        explanationPrompt: "Describí cómo se obtiene el código hexadecimal a partir de los valores de brillo decimales de los tres canales.",
        initialState: { r: 128, g: 128, b: 128 },
        hints: [
          "El color digital es aditivo (mezcla de luces). Al revés que las témperas, sumar luz roja, verde y azul da color blanco.",
          "Cada canal ocupa 1 byte (8 bits). El hexadecimal toma 2 caracteres por canal (ej: FF, 00, 80) para formar una palabra de 6 caracteres (ej: #FF0080)."
        ]
      },
      {
        id: "m6_a2",
        type: "desafio",
        title: "Desafío del Pintor RGB",
        instruction: "Tu misión es encontrar los valores R, G, B aproximados para recrear el color objetivo que se muestra en el panel de la derecha (Amarillo Patito).",
        predictionPrompt: "El amarillo es una mezcla de luz. ¿Qué canales pensás que deben estar encendidos para formarlo?",
        explanationPrompt: "Detallá cómo lograste mezclar los colores para recrear el amarillo objetivo.",
        validationRuleName: "validateRGBYellow",
        initialState: { r: 128, g: 128, b: 0 },
        hints: [
          "El amarillo se obtiene sumando luz roja y verde al máximo, manteniendo el azul apagado.",
          "Probá valores de R > 200, G > 200 y B < 30."
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Resolución, profundidad y tamaño",
    description: "Calculá el peso teórico sin compresión de tus archivos multimedia usando dimensiones y bits.",
    difficulty: "intermedio",
    activities: [
      {
        id: "m7_a1",
        type: "practica",
        title: "Calculadora de Peso de Imagen",
        instruction: "Ingresá el ancho, el alto y la profundidad de bits de una imagen. Observá cómo se aplica la fórmula matemática y se calcula el peso en bits, bytes y Kilobytes.",
        predictionPrompt: "Si duplicás el ancho y el alto de una imagen manteniendo la misma profundidad de color, ¿cuántas veces pensás que aumentará su peso total en disco?",
        explanationPrompt: "Escribí la fórmula matemática completa para calcular el tamaño de almacenamiento y explicala paso a paso.",
        initialState: { width: 800, height: 600, bpp: 24 },
        hints: [
          "Fórmula: Ancho * Alto * Profundidad (en bits).",
          "Para pasar a bytes dividimos por 8. Para pasar a Kilobytes dividimos el resultado entre 1024."
        ]
      },
      {
        id: "m7_a2",
        type: "desafio",
        title: "El Desafío del Disquete",
        instruction: "Una foto RGB (24 bits) tiene una resolución de 800x600 píxeles. Calculá su peso teórico y determiná si es posible guardarla en un viejo disquete de 1.44 Megabytes (1.474.560 bytes).",
        predictionPrompt: "Realizando una estimación rápida (800 * 600 * 3 bytes), ¿pensás que la foto cabrá en el disquete?",
        explanationPrompt: "Justificá matemáticamente tu respuesta detallando los cálculos de conversión a bytes.",
        validationRuleName: "validateFloppyDisk",
        initialState: { answer: "" },
        hints: [
          "Multiplicá 800 * 600 * 3 bytes. Eso da 1.440.000 bytes.",
          "Compará ese número con los 1.474.560 bytes de capacidad del disquete."
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Representación digital del sonido",
    description: "Muestreá y cuantizá ondas continuas para escucharlas de forma segura y comprender la digitalización del audio.",
    difficulty: "intermedio",
    activities: [
      {
        id: "m8_a1",
        type: "laboratorio",
        title: "Simulador de Muestreo de Ondas",
        instruction: "Modificá la Frecuencia de Muestreo (Hz) y los bits de Cuantización. Observá en el gráfico de Canvas cómo la onda continua (analógica) se deforma y se vuelve una onda escalonada (digitalizada).",
        explanationPrompt: "Explicá con tus palabras qué diferencia visual hay entre una frecuencia de muestreo alta y una baja en el gráfico de Canvas.",
        initialState: { rate: 10, bits: 4 },
        hints: [
          "El muestreo (rate) toma 'fotos' de la onda en momentos de tiempo. Si hay pocos Hz, las fotos están muy separadas.",
          "La cuantización (bits) aproxima la altura de cada punto. Con pocos bits, las alturas se redondean a escalones duros."
        ]
      },
      {
        id: "m8_a2",
        type: "practica",
        title: "Pitido y Distorsión de Audio",
        instruction: "Escuchá un pitido corto generado en tu navegador (volumen bajo regulado). Cambiá la calidad del audio de 16 bits (estándar CD) a 2 bits (baja resolución). Observá el ruido metálico que se agrega.",
        predictionPrompt: "¿Qué tipo de distorsión auditiva pensás que aparecerá cuando reproducimos un sonido a una profundidad de solo 2 bits?",
        explanationPrompt: "Describí didácticamente la diferencia de sonido y por qué ocurre esa distorsión al reducir los bits de cuantización.",
        initialState: { playing: false, quantBits: 16 },
        hints: [
          "La cuantización baja introduce errores de redondeo en la amplitud del sonido.",
          "Este error se escucha como un siseo áspero o ruido metálico superpuesto al tono puro."
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Representación digital del video",
    description: "Creá pequeñas animaciones de píxeles y calculá el peso de los fotogramas sucesivos.",
    difficulty: "intermedio",
    activities: [
      {
        id: "m9_a1",
        type: "laboratorio",
        title: "Animador de Fotogramas 8x8",
        instruction: "Dibuja un patrón en la cuadrícula de 8x8 píxeles en 4 fotogramas (ej: una pelota que rebota). Dale a 'Play' para reproducirla y mirá el peso total del archivo resultante.",
        explanationPrompt: "Explicá por qué el video sin comprimir es un formato que requiere un gran ancho de banda y almacenamiento en comparación con el texto o la imagen.",
        initialState: {
          currentFrame: 0,
          frames: [Array(64).fill(0), Array(64).fill(0), Array(64).fill(0), Array(64).fill(0)],
          fps: 4
        },
        hints: [
          "Fórmula de video: Peso de 1 fotograma * FPS * Duración.",
          "Un segundo de video a 24 FPS son 24 imágenes completas en secuencia."
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Compresión y formatos",
    description: "Diferenciá compresión con pérdida y sin pérdida, y formatos PNG, JPEG y MP3.",
    difficulty: "intermedio",
    activities: [
      {
        id: "m10_a1",
        type: "desafio",
        title: "Compresión sin pérdida (RLE)",
        instruction: "La compresión RLE (Run Length Encoding) agrupa píxeles idénticos seguidos. Compri-mí esta fila de 12 píxeles: 6 blancos y 6 negros en formato '6B6N' o similar.",
        predictionPrompt: "Si la fila tiene 6 píxeles Blancos seguidos de 6 píxeles Negros, ¿qué código de compresión RLE pensás que representará esta fila?",
        explanationPrompt: "Describí el ahorro de espacio que se obtiene en bits al aplicar RLE sobre patrones repetitivos en lugar de escribir cada bit uno por uno.",
        validationRuleName: "validateRLE",
        initialState: { rawPattern: "BBBBBBNNNNNN", userCode: "" },
        hints: [
          "Escribí la cantidad seguido de la letra: '6B' para 6 Blancos, y '6N' para 6 Negros.",
          "Juntalo todo como: '6B6N'."
        ]
      },
      {
        id: "m10_a2",
        type: "laboratorio",
        title: "Compresor JPEG en Vivo",
        instruction: "Cargá una foto local. Deslizá la barra de calidad JPEG para ver cómo aparecen distorsiones (bloques en la imagen) y cómo disminuye el peso en Kilobytes del archivo.",
        explanationPrompt: "Explicá por qué la compresión con pérdida (como JPEG) es aceptable para fotografías de redes sociales pero no para archivos de texto o código de programas.",
        initialState: { quality: 0.8 },
        hints: [
          "JPEG descarta información fina de color que el ojo humano casi no nota.",
          "En un programa de computadoras, perder un solo bit o letra puede hacer que el programa falle o no funcione."
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Laboratorio integrador",
    description: "Estaciones libres de experimentación y el desafío de la Sonda Espacial.",
    difficulty: "desafio",
    activities: [
      {
        id: "m11_a1",
        type: "mision",
        title: "Misión: La Sonda Espacial",
        instruction: "SOS espacial: La antena de la sonda espacial tiene un ancho de banda de solo 512 bytes. Debés enviar un paquete científico que incluye: un mensaje de texto de 50 letras, una foto RGB y un sonido. Optimizá los formatos para no superar el límite de bits.",
        predictionPrompt: "¿Qué formato y resoluciones pensás que deberás aplicar a la foto y al sonido para recortar el peso del paquete por debajo de los 512 bytes?",
        explanationPrompt: "Escribí el informe técnico para la base terrestre. Justificá qué sacrificios de calidad hiciste (resolución de imagen, tasa de muestreo) para cumplir con el límite estricto de bytes.",
        validationRuleName: "validateSpaceProbe",
        initialState: {
          imageRes: "32", // "8x8", "16x16", "32x32"
          imageBpp: 24, // 1, 8, 24
          audioBits: 16, // 2, 4, 16
          audioRate: 8000, // 2000, 4000, 8000
          textLength: 50
        },
        hints: [
          "Una foto de 32x32 en 24 bits pesa 3072 bytes, ¡excede por mucho la capacidad! Reducí la foto a 8x8 y a 1 bit por píxel.",
          "Reducí el audio a 2 bits de cuantización y tasa baja de muestreo para ahorrar el máximo de espacio."
        ]
      }
    ]
  },
  {
    id: 12,
    title: "Autoevaluación y desafíos finales",
    description: "Preguntas y desafíos prácticos aleatorios para consolidar tu conocimiento.",
    difficulty: "desafio",
    activities: [
      {
        id: "m12_a1",
        type: "desafio",
        title: "Quiz de Consolidación EBI",
        instruction: "Respondé a las 5 preguntas conceptuales sobre representación de datos, bits, ASCII e imágenes.",
        explanationPrompt: "Escribí una reflexión final sobre lo que aprendiste en este recurso didáctico interactivo.",
        validationRuleName: "validateQuizFinal",
        initialState: { answers: [-1, -1, -1, -1, -1] },
        hints: [
          "Recordá: 1 byte son 8 bits. Un bit representa 0 o 1.",
          "El código ASCII tiene problemas con caracteres del español porque originalmente solo usaba 7 bits."
        ]
      }
    ]
  }
];
