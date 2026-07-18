/**
 * Convierte un número decimal (entero) a su representación binaria.
 */
export function decimalToBinary(num: number): string {
  if (isNaN(num)) return "0";
  // Manejo de desbordamiento o valores negativos si es necesario
  const unsignedNum = Math.max(0, Math.floor(num));
  return unsignedNum.toString(2);
}

/**
 * Convierte una cadena binaria a su equivalente decimal.
 */
export function binaryToDecimal(bin: string): number {
  const cleanBin = bin.replace(/[^01]/g, "");
  if (!cleanBin) return 0;
  return parseInt(cleanBin, 2);
}

/**
 * Agrega ceros a la izquierda para completar el ancho deseado.
 */
export function padZero(bin: string, length: number = 8): string {
  return bin.padStart(length, "0");
}

/**
 * Devuelve la cantidad de combinaciones posibles para n bits (2^n).
 */
export function getCombinations(bits: number): number {
  if (bits < 0) return 0;
  return Math.pow(2, bits);
}

/**
 * Codifica una palabra en sus componentes numéricos (decimal, hexadecimal, binario)
 * según el sistema elegido (ASCII o UTF-8).
 */
export interface EncodedChar {
  char: string;
  dec: number;
  hex: string;
  bin: string;
  bytes: number;
}

export function encodeTextToBytes(text: string, encoding: 'ascii' | 'utf8'): EncodedChar[] {
  const result: EncodedChar[] = [];
  const encoder = new TextEncoder(); // Codificador estándar UTF-8

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const codePoint = char.codePointAt(0) || 0;

    if (encoding === 'ascii') {
      // Si se pide ASCII, ignoramos o representamos caracteres extendidos con "?"
      const isAscii = codePoint <= 127;
      const dec = isAscii ? codePoint : 63; // 63 es "?"
      const hex = dec.toString(16).toUpperCase().padStart(2, "0");
      const bin = padZero(dec.toString(2), 8);
      result.push({
        char: isAscii ? char : "?",
        dec,
        hex,
        bin,
        bytes: 1
      });
    } else {
      // UTF-8 (soporta tildes, ñ, emojis, etc.)
      const bytesArr = encoder.encode(char);
      bytesArr.forEach((dec) => {
        const hex = dec.toString(16).toUpperCase().padStart(2, "0");
        const bin = padZero(dec.toString(2), 8);
        result.push({
          char, // El carácter visual original
          dec,
          hex,
          bin,
          bytes: bytesArr.length // Cantidad de bytes que ocupa el carácter entero
        });
      });
    }
  }

  return result;
}

/**
 * Convierte valores de color R, G, B a formato hexadecimal (ej: #FF00FF).
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.floor(val)));
  const red = clamp(r).toString(16).padStart(2, "0").toUpperCase();
  const green = clamp(g).toString(16).padStart(2, "0").toUpperCase();
  const blue = clamp(b).toString(16).padStart(2, "0").toUpperCase();
  return `#${red}${green}${blue}`;
}

/**
 * Calcula el tamaño teórico de una imagen sin compresión en bits.
 */
export function getImageSize(width: number, height: number, bpp: number): number {
  if (width < 0 || height < 0 || bpp < 0) return 0;
  return width * height * bpp;
}

/**
 * Calcula el tamaño teórico de un audio sin compresión en bits.
 */
export function getAudioSize(sampleRate: number, depth: number, channels: number, duration: number): number {
  if (sampleRate < 0 || depth < 0 || channels < 0 || duration < 0) return 0;
  return sampleRate * depth * channels * duration;
}

/**
 * Calcula el tamaño teórico de un video sin compresión en bits.
 */
export function getVideoSize(width: number, height: number, bpp: number, fps: number, duration: number): number {
  if (width < 0 || height < 0 || bpp < 0 || fps < 0 || duration < 0) return 0;
  return width * height * bpp * fps * duration;
}

/**
 * Valida si las dimensiones ancho y alto cubren exactamente el tamaño de la matriz en bits.
 */
export function isValidMatrix(width: number, height: number, totalBits: number): boolean {
  if (width <= 0 || height <= 0) return false;
  return width * height === totalBits;
}

/**
 * Persistencia en LocalStorage.
 */
const PROGRESS_KEY = "antigravity_del_dato_al_bit_progress";

export function persistProgress(progress: any): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error al guardar progreso en LocalStorage:", e);
  }
}

export function loadProgress(): any {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error("Error al cargar progreso de LocalStorage:", e);
    return {};
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    console.error("Error al borrar progreso en LocalStorage:", e);
  }
}
