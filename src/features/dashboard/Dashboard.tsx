import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BsBook,
  BsGraphUp,
  BsTrophy,
  BsCalendarCheck,
  BsRobot,
  BsFileEarmarkPdf,
  BsClipboardCheck,
  BsArrowRight,
} from 'react-icons/bs';
import { useDashboardData } from './useDashboardData';
import { ChartsSection } from './ChartsSection';
import { VideoClassesSection } from './VideoClassesSection';

const StatCard = ({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="card-glass text-center"
  >
    <div className="text-4xl text-gold mb-2 flex justify-center">{icon}</div>
    <div className="text-3xl font-black text-gradient-gold">{value}</div>
    <p className="text-sm text-gray-400 mt-1">{label}</p>
  </motion.div>
);

export const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-glow text-gold text-lg">Cargando tu panel…</div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto mt-20 p-6 card-glass text-red-400">Error: {error}</div>
    );

  if (!data) return null;

  const isElite = data.plan === 'Plan ELITE 500';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 bg-gradient-to-br from-gold/10 via-transparent to-accent-blue/10 border border-gold/20 mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-black">
          ¡Bienvenido, <span className="text-gradient-gold">{data.nombre}</span>! 🎓
        </h1>
        <p className="text-lg text-gray-300 mt-3">
          {data.premium ? (
            <>
              Tu acceso premium en el plan{' '}
              <span className="bg-gold text-elite-dark px-2 py-0.5 rounded font-bold">
                {data.plan}
              </span>{' '}
              vence en <strong className="text-gold">{data.diasRestantes} días</strong>.
            </>
          ) : (
            'Selecciona un plan para desbloquear el material premium.'
          )}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<BsBook />} value={data.materiales.length} label="Materiales Disponibles" delay={0.1} />
        <StatCard icon={<BsGraphUp />} value={data.premium ? '100%' : '0%'} label="Acceso a Contenido" delay={0.2} />
        <StatCard icon={<BsTrophy />} value={data.simulacrosTotal} label="Simulacros Realizados" delay={0.3} />
        <StatCard icon={<BsCalendarCheck />} value={data.diasRestantes} label="Días Restantes" delay={0.4} />
      </div>

      {/* Charts */}
      {data.premium && (
        <ChartsSection line={data.chartSimulacros} distribution={data.chartDesempeño} />
      )}

      {/* IA Mentor (solo ELITE) */}
      {isElite && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-3xl p-8 mb-8 bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <div className="text-center mb-6">
            <BsRobot className="text-5xl mx-auto mb-2" />
            <h2 className="text-3xl font-black text-white">🤖 Tu Mentor IA Personal</h2>
            <p className="text-white/80 mt-1">
              Análisis inteligente y estrategias personalizadas para tu éxito en el ICFES
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <Link to="/ia/analisis" className="bg-white/95 text-elite-dark font-bold py-3 rounded-xl text-center hover:bg-white transition-colors">
              📊 Análisis de Progreso
            </Link>
            <Link to="/ia/estrategia" className="bg-white/95 text-elite-dark font-bold py-3 rounded-xl text-center hover:bg-white transition-colors">
              📅 Estrategia de Estudio
            </Link>
            <Link to="/ia/chat" className="bg-white/95 text-elite-dark font-bold py-3 rounded-xl text-center hover:bg-white transition-colors">
              💬 Chat con Mentor IA
            </Link>
          </div>
        </motion.section>
      )}

      {/* Materials */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
          <BsFileEarmarkPdf className="text-gold" /> Material de Estudio{' '}
          <span className="text-gradient-gold">ICFES</span>
        </h2>
        <p className="text-gray-400 mb-6">
          Contenido filtrado y seleccionado para maximizar tu puntaje
        </p>

        {data.premium ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.materiales.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                className="card-glass flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <BsFileEarmarkPdf className="text-3xl text-gold" />
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">📅 {m.anio}</span>
                </div>
                <h3 className="font-bold text-white mb-2 line-clamp-2">{m.titulo}</h3>
                <p className="text-sm text-gray-400 flex-grow mb-4 line-clamp-3">
                  {m.descripcion || 'Material ICFES'}
                </p>
                <a
                  href={m.pdf_url.startsWith('https://') ? m.pdf_url : `/archivo/material/${m.pdf_url}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-gold text-sm text-center"
                >
                  {m.pdf_url.startsWith('https://') ? 'Ver en Drive' : 'Descargar'}
                </a>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card-glass text-center py-12">
            <p className="text-4xl mb-4">🔒</p>
            <p className="text-lg font-bold mb-2">Material bloqueado</p>
            <p className="text-gray-400 mb-6">Necesitas una suscripción activa</p>
            <Link to="/suscripcion" className="btn-gold inline-block">
              👑 Seleccionar Plan
            </Link>
          </div>
        )}
      </motion.section>


      <VideoClassesSection />

      {/* Simulacros CTA */}
      {data.premium && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
            <BsClipboardCheck className="text-gold" /> Simulacros Disponibles
          </h2>
          <p className="text-gray-400 mb-6">Practica con exámenes basados en el ICFES real</p>
          <Link to="/simulacros" className="btn-gold inline-flex items-center gap-2">
            Ver Todos los Simulacros <BsArrowRight />
          </Link>
        </motion.section>
      )}

      {/* CTA Suscripción */}
      {!data.premium && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 card-glass text-center"
        >
          <h3 className="text-2xl font-black mb-3">
            ⚡ ¿Listo para el <span className="text-gradient-gold">Top 1%</span>?
          </h3>
          <p className="text-gray-400 mb-6">
            Acceso a todo el material ICFES, simulacros ilimitados y soporte 24/7
          </p>
          <Link to="/suscripcion" className="btn-gold inline-flex items-center gap-2">
            👑 Ver Planes
          </Link>
        </motion.section>
      )}
    </div>
  );
};