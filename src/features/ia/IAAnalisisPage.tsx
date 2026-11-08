import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BsGraphUp, BsLightbulb, BsChatDots, BsArrowClockwise } from 'react-icons/bs';
import { useIAContext } from './useIAContext';
import { callAI } from './iaApi';

export const IAAnalisisPage = () => {
  const { user, metricas, loading, error, isElite } = useIAContext();
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const runAnalysis = async () => {
    if (!metricas || !user?.email) return;
    setAnalyzing(true);
    setAiError(null);
    try {
      const result = await callAI('analisis', { metrics: metricas, name: user.email });
      setContent(result);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (metricas && !content) runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricas]);

  if (loading) return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando…</div>;
  if (error) return <div className="text-center py-24 text-red-400">{error}</div>;
  if (!isElite) return <div className="text-center py-24 text-gray-400">Requiere Plan ELITE 500.</div>;
  if (!metricas) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <BsGraphUp className="text-6xl text-gold mx-auto mb-3" />
        <h1 className="text-3xl md:text-4xl font-black">📊 Análisis Inteligente de tu Progreso</h1>
        <p className="text-gray-400 mt-2">Basado en tus métricas reales de estudio</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { value: metricas.simulacros_total, label: 'Simulacros' },
          { value: `${metricas.promedio_puntaje}%`, label: 'Promedio' },
          { value: metricas.tiempo_total_minutos, label: 'Minutos' },
          { value: metricas.areas_mas_practicadas.length, label: 'Áreas' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-glass text-center"
          >
            <p className="text-3xl font-black text-gradient-gold">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🤖</span> Análisis de tu Progreso
          </h2>
          {content && (
            <button
              onClick={runAnalysis}
              disabled={analyzing}
              className="text-xs text-gold hover:underline inline-flex items-center gap-1 disabled:opacity-50"
            >
              <BsArrowClockwise /> Regenerar
            </button>
          )}
        </div>
        {analyzing && (
          <div className="py-12 text-center text-gold animate-pulse-glow">
            🧠 Analizando tus datos…
          </div>
        )}
        {aiError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {aiError}
          </div>
        )}
        {content && !analyzing && (
          <article className="prose-elite">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        )}
      </motion.div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/ia/estrategia" className="btn-gold inline-flex items-center gap-2">
          <BsLightbulb /> Ver Estrategia
        </Link>
        <Link to="/ia/chat" className="btn-outline-gold inline-flex items-center gap-2">
          <BsChatDots /> Chat con Mentor
        </Link>
      </div>
    </div>
  );
};