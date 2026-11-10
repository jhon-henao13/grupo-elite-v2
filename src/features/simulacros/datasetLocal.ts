export const datasetLocal: Record<string, {
  pregunta: string;
  opciones: string[];
  correcta: 'a' | 'b' | 'c' | 'd';
  area: string;
}[]> = {
  matematicas: [
    { pregunta: '¿Cuál es el resultado de (2x + 3)² si x = 2?', opciones: ['25', '49', '36', '64'], correcta: 'b', area: 'Matemáticas' },
    { pregunta: '¿Cuál es el área de un círculo con radio 5?', opciones: ['25π', '10π', '50π', '15π'], correcta: 'a', area: 'Matemáticas' },
    { pregunta: '¿Cuál es la solución de x² - 5x + 6 = 0?', opciones: ['x = 2 ó x = 3', 'x = 1 ó x = 6', 'x = -2 ó x = -3', 'x = 0 ó x = 5'], correcta: 'a', area: 'Matemáticas' },
    { pregunta: '¿Cuál es el valor de log₁₀(1000)?', opciones: ['1', '2', '3', '4'], correcta: 'c', area: 'Matemáticas' },
    { pregunta: '¿Cuál es la derivada de f(x) = 3x²?', opciones: ['3x', '6x', '6x²', '3'], correcta: 'b', area: 'Matemáticas' },
  ],
  ciencias: [
    { pregunta: '¿Cuál es la fórmula molecular del ácido sulfúrico?', opciones: ['H₂SO₃', 'H₂SO₄', 'HSO₄', 'H₃SO₄'], correcta: 'b', area: 'Química' },
    { pregunta: '¿Cuál es el número atómico del Carbono?', opciones: ['6', '8', '12', '4'], correcta: 'a', area: 'Química' },
    { pregunta: '¿Cuál es la velocidad de propagación de la luz?', opciones: ['300,000 km/h', '300,000 m/s', '150,000 km/s', '3,000,000 m/s'], correcta: 'b', area: 'Física' },
    { pregunta: '¿Cuál es la función principal de las mitocondrias?', opciones: ['Sintetizar proteínas', 'Producir energía (ATP)', 'Almacenar agua', 'Fotosíntesis'], correcta: 'b', area: 'Biología' },
    { pregunta: '¿Cuál es el pH de una solución neutra?', opciones: ['0', '7', '14', '1'], correcta: 'b', area: 'Química' },
  ],
  lenguaje: [
    { pregunta: '¿Cuál es el sinónimo de "perspicaz"?', opciones: ['Ingenuo', 'Agudo', 'Torpe', 'Lento'], correcta: 'b', area: 'Lenguaje' },
    { pregunta: '¿Cuál es el antónimo de "abundancia"?', opciones: ['Riqueza', 'Escasez', 'Exceso', 'Plenitud'], correcta: 'b', area: 'Lenguaje' },
    { pregunta: '¿Qué figura literaria es "sus lágrimas eran ríos"?', opciones: ['Metáfora', 'Símil', 'Hipérbole', 'Metonimia'], correcta: 'a', area: 'Literatura' },
    { pregunta: 'Completa: "Si yo _____ sido más atento, lo hubiera notado"', opciones: ['sería', 'fuera', 'hubiera', 'seré'], correcta: 'c', area: 'Gramática' },
    { pregunta: '¿Cuál es el sujeto en "La casa está en la montaña"?', opciones: ['montaña', 'casa', 'está', 'la'], correcta: 'b', area: 'Gramática' },
  ],
  sociales: [
    { pregunta: '¿En qué año se firmó la Declaración de Independencia de Colombia?', opciones: ['1808', '1810', '1819', '1821'], correcta: 'c', area: 'Historia' },
    { pregunta: '¿Cuál es la capital de Colombia?', opciones: ['Cali', 'Medellín', 'Bogotá', 'Cartagena'], correcta: 'c', area: 'Geografía' },
    { pregunta: '¿Cuántos países limitan con Colombia?', opciones: ['3', '4', '5', '6'], correcta: 'c', area: 'Geografía' },
    { pregunta: '¿Cuál fue la causa principal de la Revolución Francesa?', opciones: ['Invasión napoleónica', 'Crisis económica y social', 'Guerra de Sucesión', 'Independencia americana'], correcta: 'b', area: 'Historia' },
    { pregunta: '¿En qué continente se encuentra Colombia?', opciones: ['América del Norte', 'América Central', 'América del Sur', 'Caribe'], correcta: 'c', area: 'Geografía' },
  ],
  ingles: [
    { pregunta: 'Traduce: "She has been studying English for 5 years"', opciones: ['Ella estudió inglés por 5 años', 'Ella ha estado estudiando inglés por 5 años', 'Ella estará estudiando inglés por 5 años', 'Ella es inglesa por 5 años'], correcta: 'b', area: 'Inglés' },
    { pregunta: '¿Cuál es el Past Participle de "go"?', opciones: ['Goed', 'Going', 'Gone', 'Goes'], correcta: 'c', area: 'Inglés' },
    { pregunta: 'Complete: "If I _____ you, I would help you"', opciones: ['am', 'was', 'were', 'have been'], correcta: 'c', area: 'Inglés' },
    { pregunta: '¿Cuál es el significado de "awkward"?', opciones: ['Incómodo', 'Gracias', 'Fuerte', 'Feliz'], correcta: 'a', area: 'Inglés' },
    { pregunta: 'Elige la oración correcta:', opciones: ['She dont like pizza', 'She doesnt like pizza', 'She not like pizza', 'She do not like pizza'], correcta: 'b', area: 'Inglés' },
  ],
  razonamiento: [
    { pregunta: '¿Cuál número sigue en la serie: 2, 4, 8, 16, ___?', opciones: ['24', '30', '32', '40'], correcta: 'c', area: 'Razonamiento' },
    { pregunta: 'Si todos los gatos son animales y Miau es un gato, entonces:', opciones: ['Miau es un perro', 'Miau es un animal', 'Miau no es un animal', 'No se puede determinar'], correcta: 'b', area: 'Lógica' },
    { pregunta: '¿Qué tiene la palabra "ICFES" que no tiene la palabra "TEST"?', opciones: ['Una vocal', 'Tres letras', 'La letra F', 'Dos vocales'], correcta: 'c', area: 'Razonamiento' },
  ],
};