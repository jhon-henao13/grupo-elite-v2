import { datasetLocal } from './datasetLocal';

const CATEGORIAS_OTDB: Record<string, number> = {
  matematicas: 19,
  ciencias: 17,
  sociales: 23,
  ingles: 10,
  lenguaje: 10,
  razonamiento: 9,
};

export interface PreguntaGenerada {
  pregunta: string;
  opciones: string[];
  correcta: 'a' | 'b' | 'c' | 'd';
  area: string;
}

async function fetchOpenTrivia(area: string, cantidad: number): Promise<PreguntaGenerada[]> {
  const cat = CATEGORIAS_OTDB[area] ?? 9;

  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${cantidad}&category=${cat}&type=multiple&encode=url3986`
    );
    if (!res.ok) return [];

    const data = await res.json();

    return (data.results ?? []).map((q: any) => {
      const correcta = decodeURIComponent(q.correct_answer);
      const incorrectas = q.incorrect_answers.map((i: string) =>
        decodeURIComponent(i)
      );

      // Barajar opciones ANTES de asignar letra
      const todas = [correcta, ...incorrectas].sort(() => Math.random() - 0.5);
      const idxCorrecta = todas.indexOf(correcta);
      const letra = (['a', 'b', 'c', 'd'] as const)[idxCorrecta];

      return {
        pregunta: decodeURIComponent(q.question),
        opciones: todas,
        correcta: letra,
        area,
      };
    });
  } catch {
    return [];
  }
}

export async function obtenerPreguntas(
  area: string,
  cantidad: number
): Promise<PreguntaGenerada[]> {
  const key = area.toLowerCase();

  // 1. Dataset local
  const local = datasetLocal[key] ?? [];
  const localFormatted: PreguntaGenerada[] = local.map((p) => ({
    pregunta: p.pregunta,
    opciones: p.opciones,
    correcta: p.correcta,
    area: p.area,
  }));

  if (localFormatted.length >= cantidad) {
    return localFormatted.sort(() => Math.random() - 0.5).slice(0, cantidad);
  }

  // 2. Fallback Open Trivia para rellenar
  const faltantes = cantidad - localFormatted.length;
  const externas = await fetchOpenTrivia(key, faltantes);

  return [...localFormatted, ...externas].sort(() => Math.random() - 0.5);
}