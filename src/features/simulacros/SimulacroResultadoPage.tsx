import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsPlayCircle, BsSpeedometer2 } from 'react-icons/bs';

interface ResultState {
  puntaje: number;
  correctas: number;
  total: number;
  tiempo: number;
  titulo: string;
}

export const SimulacroResultadoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState | null;

  useEffect(() => {
    if (!state) navigate('/simulacros', { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { puntaje, correctas, total, tiempo, titulo } = state;

  const performance =
    puntaje >= 80
      ? { icon: '🎉', label: '¡Excelente!', color: 'text-green-400' }
      : puntaje >= 60
      ? { icon: '👍', label: '¡Muy bien!', color: 'text-blue-400' }
      : puntaje >= 40
      ? { icon: '📚', label: 'Necesitas mejorar', color: 'text-yellow-400' }
      : { icon: '💪', label: 'Sigue estudiando', color: 'text-red-400' };

  const recomendacion =
    puntaje >= 80
      ? '¡Excelente desempeño! Mantén este nivel practicando más simulacros y reforzando áreas débiles.'
      : puntaje >= 60
      ? '¡Vas bien! Continúa practicando para mejorar tu puntaje. Enfócate en los temas que te cuesten más.'
      : puntaje >= 40
      ? 'Necesitas reforzar algunos conceptos. Revisa el material educativo en tu dashboard y vuelve a intentar.'
      : 'Te recomendamos repasar el material educativo disponible antes de realizar otro simulacro.';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-glass text-center p-8 mb-6"
      >
        <div className="text-6xl mb-4">{performance.icon}</div>
        <h2 className={`text-2xl font-bold mb-2 ${performance.color}`}>{performance.label}</h2>
        <h1 className="text-7xl font-black text-gradient-gold mb-4">{puntaje}%</h1>
        <p className="text-gray-400 mb-6">{titulo}</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400">Respuestas correctas</p>
            <p className="text-2xl font-black">
              <span className="text-green-400">{correctas}</span>
              <span className="text-gray-500">/{total}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Tiempo usado</p>
            <p className="text-2xl font-black text-gradient-gold">{tiempo} min</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3 mb-6">
        <Link
          to="/simulacros"
          className="btn-gold w-full inline-flex items-center justify-center gap-2"
        >
          <BsPlayCircle /> Realizar Otro Simulacro
        </Link>
        <Link
          to="/dashboard"
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border-2 border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
        >
          <BsSpeedometer2 /> Volver al Dashboard
        </Link>
      </div>

      <div className="card-glass">
        <h5 className="font-bold mb-3">💡 Recomendaciones</h5>
        <p className="text-sm text-gray-300">{recomendacion}</p>
      </div>
    </div>
  );
};