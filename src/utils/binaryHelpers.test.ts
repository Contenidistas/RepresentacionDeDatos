import { describe, it, expect, beforeEach } from 'vitest';
import {
  decimalToBinary,
  binaryToDecimal,
  padZero,
  getCombinations,
  encodeTextToBytes,
  rgbToHex,
  getImageSize,
  getAudioSize,
  getVideoSize,
  isValidMatrix,
  persistProgress,
  loadProgress,
  clearProgress
} from './binaryHelpers';

// Mock simple de localStorage para el entorno de test
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true
});

describe('Pruebas unitarias de helpers binarios y multimedia', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('debe convertir decimal a binario correctamente', () => {
    expect(decimalToBinary(0)).toBe("0");
    expect(decimalToBinary(5)).toBe("101");
    expect(decimalToBinary(65)).toBe("1000001");
    expect(decimalToBinary(255)).toBe("11111111");
    expect(decimalToBinary(-5)).toBe("0"); // límite inferior
  });

  it('debe convertir binario a decimal correctamente', () => {
    expect(binaryToDecimal("0")).toBe(0);
    expect(binaryToDecimal("101")).toBe(5);
    expect(binaryToDecimal("1000001")).toBe(65);
    expect(binaryToDecimal("11111111")).toBe(255);
    expect(binaryToDecimal("invalid")).toBe(0); // manejo de caracteres inválidos
  });

  it('debe rellenar con ceros a la izquierda (padding) a 8 bits', () => {
    expect(padZero("101", 8)).toBe("00000101");
    expect(padZero("11111111", 8)).toBe("11111111");
    expect(padZero("0", 4)).toBe("0000");
  });

  it('debe calcular la cantidad de combinaciones posibles para n bits', () => {
    expect(getCombinations(1)).toBe(2);
    expect(getCombinations(4)).toBe(16);
    expect(getCombinations(8)).toBe(256);
    expect(getCombinations(16)).toBe(65536);
    expect(getCombinations(0)).toBe(1);
  });

  it('debe codificar caracteres a bytes en ASCII y UTF-8', () => {
    // Prueba ASCII
    const asciiRes = encodeTextToBytes("Hi", "ascii");
    expect(asciiRes.length).toBe(2);
    expect(asciiRes[0].char).toBe("H");
    expect(asciiRes[0].dec).toBe(72);
    expect(asciiRes[0].bin).toBe("01001000");
    
    // Carácter extendido en ASCII debe dar "?" (63)
    const extendedAscii = encodeTextToBytes("ñ", "ascii");
    expect(extendedAscii[0].char).toBe("?");
    expect(extendedAscii[0].dec).toBe(63);

    // Prueba UTF-8 con tildes y eñe
    const utf8Res = encodeTextToBytes("ñ", "utf8");
    // 'ñ' en UTF-8 ocupa 2 bytes: 0xC3 0xB1 (decimal 195 177)
    expect(utf8Res.length).toBe(2);
    expect(utf8Res[0].dec).toBe(195);
    expect(utf8Res[1].dec).toBe(177);
  });

  it('debe convertir RGB a hexadecimal correctamente', () => {
    expect(rgbToHex(255, 0, 255)).toBe("#FF00FF");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
    expect(rgbToHex(58, 127, 194)).toBe("#3A7FC2");
    // Límites superiores e inferiores
    expect(rgbToHex(300, -10, 100)).toBe("#FF0064");
  });

  it('debe calcular el tamaño de una imagen sin compresión', () => {
    expect(getImageSize(8, 8, 1)).toBe(64); // 8x8 de 1 bit = 64 bits
    expect(getImageSize(10, 10, 24)).toBe(2400); // 10x10 de 24 bits = 2400 bits
    expect(getImageSize(0, 10, 1)).toBe(0);
  });

  it('debe calcular el tamaño de un audio sin compresión', () => {
    // Frecuencia * Profundidad * Canales * Duración
    // 44100 Hz * 16 bits * 2 canales (estéreo) * 10 segundos
    expect(getAudioSize(44100, 16, 2, 10)).toBe(14112000); // 14,112,000 bits
    expect(getAudioSize(8000, 8, 1, 5)).toBe(320000); // 320,000 bits
  });

  it('debe calcular el tamaño de un video sin compresión', () => {
    // Ancho * Alto * BPP * FPS * Duración
    // 320 * 240 * 8 bits * 24 FPS * 5 segundos
    expect(getVideoSize(320, 240, 8, 24, 5)).toBe(73728000); // 73,728,000 bits
  });

  it('debe validar las dimensiones de una matriz con respecto a los bits totales', () => {
    expect(isValidMatrix(8, 4, 32)).toBe(true);
    expect(isValidMatrix(4, 8, 32)).toBe(true);
    expect(isValidMatrix(5, 5, 32)).toBe(false);
    expect(isValidMatrix(-8, 4, 32)).toBe(false);
  });

  it('debe persistir, cargar y borrar el progreso del LocalStorage', () => {
    const mockProgress = { completedModules: [0, 1] };
    persistProgress(mockProgress);
    
    const loaded = loadProgress();
    expect(loaded).toEqual(mockProgress);
    
    clearProgress();
    expect(loadProgress()).toEqual({});
  });
});
