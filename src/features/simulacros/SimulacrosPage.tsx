import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsClipboardCheck, BsPlayCircle, BsExclamationCircle } from 'react-icons/bs';
import { useAuth } from '@/features/auth/AuthContext';
import { fetchSimulacrosData, type Simulacro, type HistorialItem } from './simulacrosApi';

export const SimulacrosPage = () => {
  const { user } = useAuth();
  const [simulacros, setSimulacros] = useState<Simulacro[]>([]);
  const [historial, setHistorial] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;
    fetchSimulacrosData(user.email)
      .then((d) => {
        setSimulacros(d.simulacros);
        setHistorial(d.historial);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-glow text-gold">Cargando simulacros…</div>
      </div>
    );

  if (error)
    return <div className="max-w-2xl mx-auto mt-20 p-6 card-glass text-red-400">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-black mb-2 flex items-center gap-2">
            <BsClipboardCheck className="text-gold" /> Simulacros ICFES
          </h1>
          <p className="text-gray-400">Practica con exámenes reales y mejora tu puntaje</p>
        </div>
        <div className="card-glass text-center">
          <h5 className="font-bold mb-2">📊 Estadísticas</h5>
          <p className="text-sm mb-1">
            <strong className="text-gradient-gold">{simulacros.length}</strong> disponibles
          </p>
          <p className="text-sm">
            <strong className="text-gradient-gold">{historial.length}</strong> realizados
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-12">
        {simulacros.length === 0 ? (
          <div className="lg:col-span-2 card-glass text-center py-8">
            <p className="text-gray-400">No hay simulacros disponibles para tu plan aún.</p>
          </div>
        ) : (
          simulacros.map((sim, i) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-glass"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{sim.titulo}</h3>
                  <p className="text-sm text-gray-400">{sim.descripcion}</p>
                </div>
                <span className="bg-gradient-gold text-elite-dark text-xs font-black px-2 py-1 rounded shrink-0 ml-2">
                  Plan {sim.plan_minimo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4 text-center">
                <div>
                  <p className="text-xs text-gray-400">Preguntas</p>
                  <p className="text-2xl font-black text-gradient-gold">
                    {sim.total_preguntas_reales}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Duración</p>
                  <p className="text-2xl font-black text-gradient-gold">
                    {sim.duracion_minutos} min
                  </p>
                </div>
              </div>

              {sim.areas && (
                <p className="text-xs text-gray-400 mb-4">
                  🏷 <strong>Áreas:</strong> {sim.areas}
                </p>
              )}

              {(sim.total_preguntas_reales ?? 0) > 0 ? (
                <Link
                  to={`/simulacro/${sim.id}/info`}
                  className="btn-gold w-full inline-flex items-center justify-center gap-2"
                >
                  <BsPlayCircle /> Iniciar Simulacro
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-full border border-white/20 text-gray-500 cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  <BsExclamationCircle /> Sin preguntas aún
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>

      {historial.length > 0 && (
        <div>
          <h3 className="text-2xl font-black mb-4">📜 Mis Últimos Simulacros</h3>
          <div className="card-glass overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
                <tr>
                  <th className="text-left py-3 px-2">Simulacro</th>
                  <th className="py-3 px-2">Puntaje</th>
                  <th className="py-3 px-2">Tiempo</th>
                  <th className="py-3 px-2">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => (
                  <tr key={h.id} className="border-b border-white/5">
                    <td className="py-3 px-2 font-semibold">{h.simulacro_titulo}</td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          h.puntaje >= 80
                            ? 'bg-green-500/20 text-green-400'
                            : h.puntaje >= 60
                            ? 'bg-blue-500/20 text-blue-400'
                            : h.puntaje >= 40
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {h.puntaje}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-gray-400">{h.tiempo_minutos} min</td>
                    <td className="py-3 px-2 text-center text-gray-400 text-xs">
                      {new Date(h.fecha).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};