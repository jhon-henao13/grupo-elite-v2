import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsGraphUp, BsCalendarCheck, BsChatDots, BsRobot } from 'react-icons/bs';
import { useIAContext } from './useIAContext';

const cards = [
  {
    to: '/ia/analisis',
    icon: <BsGraphUp />,
    title: 'Análisis de Progreso',
    desc: 'Métricas personalizadas y recomendaciones basadas en tu desempeño real.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    to: '/ia/estrategia',
    icon: <BsCalendarCheck />,
    title: 'Estrategia de Estudio',
    desc: 'Plan semanal personalizado adaptado al tiempo restante para el ICFES.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    to: '/ia/chat',
    icon: <BsChatDots />,
    title: 'Chat con Mentor IA',
    desc: 'Pregunta cualquier cosa y recibe respuestas contextualizadas 24/7.',
    gradient: 'from-gold to-orange-500',
  },
];

export const IAPage = () => {
  const { loading, error, isElite } = useIAContext();

  if (loading) return <Centered>Cargando tu Mentor IA…</Centered>;
  if (error) return <Centered className="text-red-400">{error}</Centered>;
  if (!isElite) return <Upgrade />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <BsRobot className="text-6xl text-gold mx-auto mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]" />
        <h1 className="text-4xl md:text-5xl font-black mb-2">
          Tu Mentor <span className="text-gradient-gold">IA Personal</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Análisis inteligente y estrategias personalizadas para tu éxito en el ICFES
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={c.to}
              className="card-glass block group hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-3xl text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                {c.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-2">{c.title}</h3>
              <p className="text-sm text-gray-400">{c.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Centered = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center justify-center min-h-[60vh] text-gold animate-pulse-glow ${className}`}>
    {children}
  </div>
);

const Upgrade = () => (
  <div className="max-w-2xl mx-auto px-4 py-24 text-center">
    <div className="card-glass">
      <p className="text-5xl mb-4">🔒</p>
      <h2 className="text-2xl font-black mb-2">Solo Plan ELITE 500</h2>
      <p className="text-gray-400 mb-6">
        El Mentor IA personal, análisis y estrategia requieren el Plan ELITE 500.
      </p>
      <Link to="/suscripcion" className="btn-gold inline-block">
        👑 Ver Planes
      </Link>
    </div>
  </div>
);