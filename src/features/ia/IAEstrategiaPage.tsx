import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BsCalendarCheck, BsGraphUp, BsChatDots, BsLightbulb, BsTrophy, BsArrowClockwise } from 'react-icons/bs';
import { useIAContext } from './useIAContext';
import { callAI } from './iaApi';

export const IAEstrategiaPage = () => {
  const { user, metricas, loading, error, isElite } = useIAContext();
  const [content, setContent] = useState('');
  const [running, setRunning] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const run = async () => {
    if (!metricas) return;
    setRunning(true);
    setAiError(null);
    try {
      const result = await callAI('estrategia', { metrics: metricas, name: user?.email });
      setContent(result);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Error');
    } finally {
      setRunning(false);
    }
  };

  useEffect(() => {
    if (metricas && !content) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricas]);

  if (loading) return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando…</div>;
  if (error) return <div className="text-center py-24 text-red-400">{error}</div>;
  if (!isElite) return <div className="text-center py-24 text-gray-400">Requiere Plan ELITE 500.</div>;
  if (!metricas) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <BsCalendarCheck className="text-6xl text-gold mx-auto mb-3" />
        <h1 className="text-3xl md:text-4xl font-black">📅 Estrategia de Estudio Personalizada</h1>
        <p className="text-gray-400 mt-2">Plan diseñado para ti según tu progreso</p>
      </motion.div>

      <div className="card-glass mb-6 bg-accent-blue/5 border-accent-blue/30">
        <h6 className="font-bold text-white mb-2">Tu perfil actual:</h6>
        <p className="text-sm text-gray-300">
          {metricas.simulacros_total} simulacros · {metricas.promedio_puntaje}% promedio ·{' '}
          {metricas.tiempo_total_minutos} min estudiados
        </p>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">🤖</span> Tu Plan de Estudio
          </h2>
          {content && (
            <button onClick={run} disabled={running} className="text-xs text-gold hover:underline inline-flex items-center gap-1 disabled:opacity-50">
              <BsArrowClockwise /> Regenerar
            </button>
          )}
        </div>
        {running && <div className="py-12 text-center text-gold animate-pulse-glow">🧠 Diseñando tu plan…</div>}
        {aiError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">{aiError}</div>
        )}
        {content && !running && (
          <article className="prose-elite">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="card-glass">
          <h6 className="font-bold flex items-center gap-2 mb-2"><BsLightbulb className="text-yellow-400" /> Consejos rápidos</h6>
          <ul className="text-sm text-gray-400 space-y-1 list-disc pl-4">
            <li>Estudia en bloques de 25–50 min</li>
            <li>Breaks de 5–10 min entre bloques</li>
            <li>Repasa material diariamente</li>
            <li>Duerme 7–8 h por noche</li>
          </ul>
        </div>
        <div className="card-glass">
          <h6 className="font-bold flex items-center gap-2 mb-2"><BsTrophy className="text-green-400" /> Motivación</h6>
          <p className="text-sm text-gray-400">
            ¡Cada día de estudio te acerca más! La consistencia es la clave del éxito en el ICFES.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link to="/ia/analisis" className="btn-outline-gold inline-flex items-center gap-2">
          <BsGraphUp /> Ver Análisis
        </Link>
        <Link to="/ia/chat" className="btn-gold inline-flex items-center gap-2">
          <BsChatDots /> Hablar con Mentor
        </Link>
      </div>
    </div>
  );
};