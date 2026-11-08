import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsClipboardCheck, BsPlayCircle, BsArrowLeft, BsExclamationTriangle } from 'react-icons/bs';
import { useAuth } from '@/features/auth/AuthContext';
import { fetchSimulacroInfo, type SimulacroInfoData } from './simulacrosApi';

export const SimulacroInfoPage = () => {
  const { simulacroId } = useParams<{ simulacroId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<SimulacroInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulacroId || !user?.email) return;
    fetchSimulacroInfo(Number(simulacroId), user.email)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [simulacroId, user?.email]);

  if (loading)
    return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando…</div>;
  if (error) return <div className="text-center py-24 text-red-400">{error}</div>;
  if (!data) return null;

  const { simulacro, estadisticas } = data;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-8"
      >
        <div className="text-center mb-6">
          <BsClipboardCheck className="text-6xl text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-white mb-2">{simulacro.titulo}</h1>
          <p className="text-gray-400">{simulacro.descripcion}</p>
        </div>

        <hr className="border-white/10 my-6" />

        <div className="grid grid-cols-2 gap-6 text-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">Preguntas</p>
            <p className="text-3xl font-black text-gradient-gold">
              {simulacro.total_preguntas_reales}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Duración estimada</p>
            <p className="text-3xl font-black text-gradient-gold">
              {simulacro.duracion_minutos} min
            </p>
          </div>
        </div>

        {simulacro.areas && (
          <div className="bg-accent-blue/10 border border-accent-blue/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-300">
              🏷 <strong>Áreas incluidas:</strong> {simulacro.areas}
            </p>
          </div>
        )}

        {estadisticas.veces_realizado > 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4">
            <h6 className="font-bold mb-2">📊 Tu desempeño</h6>
            <p className="text-sm mb-1">
              <strong>Mejor puntaje:</strong> {estadisticas.mejor_puntaje}%
            </p>
            <p className="text-sm mb-1">
              <strong>Promedio:</strong> {estadisticas.promedio?.toFixed(1)}%
            </p>
            <p className="text-sm mb-0">
              <strong>Veces realizado:</strong> {estadisticas.veces_realizado}
            </p>
          </div>
        )}

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-200 flex items-start gap-2">
            <BsExclamationTriangle className="shrink-0 mt-0.5" />
            <span>
              <strong>Recomendación:</strong> Encuentra un lugar tranquilo sin distracciones. No
              podrás pausar una vez comiences.
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate(`/simulacro/${simulacro.id}/quiz`)}
            className="btn-gold w-full inline-flex items-center justify-center gap-2"
          >
            <BsPlayCircle /> Iniciar Ahora
          </button>
          <Link
            to="/simulacros"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full border-2 border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
          >
            <BsArrowLeft /> Volver
          </Link>
        </div>
      </motion.div>
    </div>
  );
};