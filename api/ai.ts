export const config = { runtime: 'edge' };

interface Metrics {
  simulacros_total: number;
  promedio_puntaje: number;
  tiempo_total_minutos: number;
  areas_mas_practicadas: { titulo: string; veces_realizado: number }[];
}

interface Body {
  type: 'analisis' | 'estrategia' | 'chat';
  metrics?: Metrics;
  message?: string;
  name?: string;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { type, metrics, message, name } = (await req.json()) as Body;
    const GROQ_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_KEY) {
      return json({ error: 'GROQ_API_KEY no configurada en Vercel' }, 500);
    }

    const areasStr = (metrics?.areas_mas_practicadas ?? [])
      .map((a) => `${a.titulo} (${a.veces_realizado} veces)`)
      .join(', ') || 'ninguna aún';

    let systemPrompt = '';
    let userPrompt = '';
    let maxTokens = 500;

    if (type === 'analisis') {
      systemPrompt = 'Eres un mentor académico experto en el ICFES de Colombia. Responde en Markdown, tono motivador y profesional.';
      userPrompt = `Analiza el progreso de un estudiante:
- Simulacros realizados: ${metrics?.simulacros_total}
- Promedio: ${metrics?.promedio_puntaje}%
- Tiempo total: ${metrics?.tiempo_total_minutos} min
- Áreas practicadas: ${areasStr}

Estructura: **Fortalezas**, **Áreas de mejora**, **Recomendaciones específicas**.`;
      maxTokens = 600;
    } else if (type === 'estrategia') {
      systemPrompt = 'Eres un estratega de estudio experto en el ICFES. Usa Markdown con tablas cuando sea útil.';
      userPrompt = `Crea una estrategia de estudio personalizada:
- Simulacros: ${metrics?.simulacros_total}
- Promedio: ${metrics?.promedio_puntaje}%
- Tiempo: ${metrics?.tiempo_total_minutos} min
- Áreas: ${areasStr}

Faltan ~30 días. Incluye: **Plan semanal (tabla)**, **técnicas de estudio**, **áreas prioritarias**, **consejos de bienestar**.`;
      maxTokens = 1000;
    } else if (type === 'chat') {
      systemPrompt = `Eres un mentor IA de ICFES para ${name ?? 'un estudiante'}. Métricas: ${metrics?.simulacros_total} simulacros, ${metrics?.promedio_puntaje}% promedio. Responde en Markdown, conciso y motivador.`;
      userPrompt = message ?? '';
      maxTokens = 400;
    } else {
      return json({ error: 'type inválido' }, 400);
    }

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text();
      return json({ error: `Groq ${groqRes.status}`, detail }, 500);
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content ?? '';
    return json({ content });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : 'Error desconocido' }, 500);
  }
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}